# Loan Eligibility Prediction System

An AI-powered full-stack application that evaluates loan eligibility in real time using Machine Learning and provides explainable AI insights (SHAP analysis), risk factors, and downloadable PDF reports.

---

## 🚀 Features

- **Real-Time Eligibility Prediction:** Multi-factor analysis including income, credit history, loan amount, and tenure.
- **Explainable AI (SHAP):** Visual breakdown of features positively and negatively impacting loan decisions.
- **Model Comparison & Analytics:** Benchmarking across Random Forest, XGBoost, Logistic Regression, SVM, and Decision Tree models.
- **EMI & Affordability Calculator:** Built-in loan calculator to project monthly payments and interest.
- **Automated PDF Reports:** Generates an official downloadable loan eligibility certificate.
- **Modern UI/UX:** Built with React, Vite, Tailwind CSS, and Lucide icons.

---

## 🛠 Tech Stack

### **Frontend**
- **Framework:** React 18 (Vite)
- **Styling:** Tailwind CSS
- **Icons & Visuals:** Lucide React, Recharts

### **Backend**
- **Framework:** FastAPI (Python)
- **Server:** Uvicorn
- **Data & ML:** Scikit-Learn, XGBoost, SHAP, Pandas, NumPy, Joblib
- **Report Generation:** ReportLab (PDF)

---

## 📁 Project Structure

```
├── backend/
│   ├── main.py                # FastAPI server & prediction endpoints
│   └── requirements.txt       # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/        # UI components (StepForm, ShapChart, Analytics, etc.)
│   │   ├── App.jsx            # Main dashboard component
│   │   └── main.jsx           # Entry point
│   ├── package.json
│   └── vite.config.js
├── ml/
│   ├── loan_train.csv         # Training dataset
│   └── train_models.py        # Model training and export script
├── run_project.bat            # One-click startup script for Windows
└── README.md
```

---

## ⚙️ Setup & Installation

### Prerequisites
- **Python 3.9+**
- **Node.js 18+** & npm

### 1. Train the ML Model
```bash
cd ml
python train_models.py
cd ..
```

### 2. Run Backend
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```
Backend API will be available at: `http://localhost:8000` (Docs: `http://localhost:8000/docs`)

### 3. Run Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend application will be available at: `http://localhost:5173`

---

## 📜 License
This project is licensed under the MIT License.
