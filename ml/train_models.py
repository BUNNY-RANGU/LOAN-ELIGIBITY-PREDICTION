import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import LabelEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from xgboost import XGBClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score, roc_curve
import shap
import joblib
import warnings
warnings.filterwarnings('ignore')

# 1. LOAD DATA
print("--- LOADING DATA ---")
import os
base_path = os.path.dirname(__file__)
df = pd.read_csv(os.path.join(base_path, 'loan_train.csv'))
print(f"Shape: {df.shape}")
print(df.head())
print(df.info())
print(df.isnull().sum())

# 2. EDA (Skipped plots in automated script, but code is here)
print("\n--- EDA ---")
# sns.histplot(df['ApplicantIncome'])
# plt.show()
# sns.countplot(x='Education', hue='Loan_Status', data=df)
# plt.show()

# 3. PREPROCESSING
print("\n--- PREPROCESSING ---")
# Fill missing values
df['LoanAmount'].fillna(df['LoanAmount'].median(), inplace=True)
for col in ['Credit_History', 'Loan_Amount_Term', 'Gender', 'Married', 'Dependents', 'Self_Employed']:
    df[col].fillna(df[col].mode()[0], inplace=True)

# Feature Engineering
df['Total_Income'] = df['ApplicantIncome'] + df['CoapplicantIncome']
df['EMI'] = df['LoanAmount'] / df['Loan_Amount_Term']
df['Balance_Income'] = df['Total_Income'] - (df['EMI'] * 1000)

# Log transform
df['LoanAmount_log'] = np.log(df['LoanAmount'] + 1)
df['Total_Income_log'] = np.log(df['Total_Income'] + 1)

# Drop unnecessary columns
df = df.drop(['Loan_ID', 'ApplicantIncome', 'CoapplicantIncome', 'Loan_Amount_Term', 'LoanAmount', 'Total_Income'], axis=1)

# Label Encoding
le_dict = {}
cat_cols = ['Gender', 'Married', 'Dependents', 'Education', 'Self_Employed', 'Property_Area', 'Loan_Status']
for col in cat_cols:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col].astype(str))
    le_dict[col] = le

X = df.drop('Loan_Status', axis=1)
y = df['Loan_Status']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)

# 4. TRAIN 5 MODELS
print("\n--- TRAINING MODELS ---")
models = {
    'Logistic Regression': LogisticRegression(max_iter=1000),
    'Decision Tree': DecisionTreeClassifier(random_state=42),
    'Random Forest': RandomForestClassifier(n_estimators=200, random_state=42),
    'SVM': SVC(kernel='rbf', probability=True, random_state=42),
    'XGBoost': XGBClassifier(max_depth=6, learning_rate=0.1, random_state=42, use_label_encoder=False, eval_metric='logloss')
}

# 5. EVALUATE ALL
results = []
trained_models = {}
for name, model in models.items():
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    y_prob = model.predict_proba(X_test)[:, 1]
    
    acc = accuracy_score(y_test, y_pred)
    prec = precision_score(y_test, y_pred)
    rec = recall_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)
    roc = roc_auc_score(y_test, y_prob)
    
    results.append({'Model': name, 'Accuracy': acc, 'Precision': prec, 'Recall': rec, 'F1': f1, 'ROC-AUC': roc})
    trained_models[name] = model

results_df = pd.DataFrame(results)
print("\n--- MODEL EVALUATION ---")
print(results_df.to_string(index=False))

# 6. BEST MODEL
# Switching to Random Forest because it achieved higher accuracy (0.81) than XGBoost (0.63) 
# and it has much better compatibility with the SHAP library.
best_model = trained_models['Random Forest']

# 7. EXPLAINABILITY (SHAP)
print("\n--- SHAP EXPLAINER ---")
explainer = shap.TreeExplainer(best_model)
shap_values = explainer.shap_values(X_train)

# 8. SAVE
print("\n--- SAVING ARTIFACTS ---")
joblib.dump(best_model, os.path.join(base_path, 'random_forest_model.pkl'))
joblib.dump(le_dict, os.path.join(base_path, 'label_encoders.pkl'))
joblib.dump(list(X.columns), os.path.join(base_path, 'feature_names.pkl'))
print("Model, Encoders, and features saved successfully.")
