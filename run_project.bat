@echo off
echo ==========================================
echo Loan Eligibility Prediction - Starter Script
echo ==========================================

:: 1. Train ML Model
echo [1/3] Training ML Model...
cd ml
python train_models.py
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] ML Training failed.
    pause
    exit /b %ERRORLEVEL%
)
cd ..

:: 2. Start Backend
echo [2/3] Starting Backend Server...
start "Backend Server" cmd /k "cd backend && pip install -r requirements.txt && python -m uvicorn main:app --reload --port 8000"

:: 3. Start Frontend
echo [3/3] Starting Frontend Development Server...
start "Frontend Server" cmd /k "cd frontend && npm install && npm run dev"

echo ==========================================
echo All services are being initialized.
echo Backend: http://localhost:8000
echo Frontend: http://localhost:5173
echo ==========================================
pause
