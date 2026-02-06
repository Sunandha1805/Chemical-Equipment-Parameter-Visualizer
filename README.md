# 🧪 Chemical Equipment Parameter Visualizer

A robust, full-stack data visualization system designed to analyze and display critical equipment performance metrics. This platform enables engineers to monitor **Flowrate**, **Pressure**, and **Temperature** through a centralized dashboard, with support for both modern web browsers and high-performance desktop clients.

---

## 🚀 Key Features

-   **Seamless File Upload**: Directly ingest CSV datasets containing thousands of sensor readings via Web or Desktop.
-   **Intelligent Analysis Engine**: 
    - Automated statistical summaries using **Pandas**.
    - Calculates global averages for all key parameters.
    - Dynamic equipment type distribution mapping.
-   **Dual Client Synchronization**:
    -   **Web Interface**: Responsive React dashboard with interactive Chart.js visualizations.
    -   **Desktop Client**: Native PyQt5 application optimized for large dataset previews and local report handling.
-   **Security & Data Integrity**:
    - **Token-Based Auth**: Secure API communication via Django REST Framework.
    - **Smart History Management**: Rolling storage routine that maintains strictly the **last 5 analysis records**, optimizing server storage.
-   **Professional Reporting**: Integrated PDF generation for one-click status reports.

---

## 📊 CSV Data Requirements

To ensure successful analysis, your uploaded `.csv` files must include the following headers:

| Header | Description | Data Type |
| :--- | :--- | :--- |
| `Type` | Equipment Category (e.g., Pump, Valve) | String |
| `Flowrate` | Current flow measurement | Numeric |
| `Pressure` | Current pressure measurement | Numeric |
| `Temperature` | Current temperature measurement | Numeric |

> [!TIP]
> Missing values in numeric columns are automatically handled by the analysis engine using mean imputation to maintain dataset integrity.

---

## 🛠️ Tech Stack

### Backend Infrastructure
- **Python 3.10+** & **Django 4.2+**
- **Django REST Framework**: API architecture and Token Authentication.
- **Pandas**: High-speed data processing and statistical analysis.
- **ReportLab**: Dynamic PDF generation engine.

### Frontend Clients
- **Web**: React (Vite), Chart.js (Visuals), Axios (API), Vanilla CSS (UI).
- **Desktop**: PyQt5 (GUI), Matplotlib (Charts), Python Requests (Backend Communication).

---

## ⚙️ Quick Start

### 1. Backend & API
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### 2. Modern Web Dashboard
```bash
cd frontend-web
npm install
npm run dev
```

### 3. Native Desktop App
```bash
cd frontend-desktop
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python main.py
```

---

## 📡 API Reference

| Endpoint | Method | Auth | Payload / Result |
| :--- | :--- | :--- | :--- |
| `/api/login/` | `POST` | No | `{username, password}` → `Token` |
| `/api/upload/` | `POST` | Yes | Multipart form with `file` |
| `/api/summary/latest/` | `GET` | Yes | Retrieves most recent analysis data |
| `/api/history/` | `GET` | Yes | List of the last 5 uploads |
| `/api/report/<id>/` | `GET` | Yes | Returns binary PDF stream |

---

## 🏗️ Project Architecture

```text
Visualizer/
├── backend/            # Django REST API & Analysis Layer
│   ├── api/            # Utils (Pandas), Views, and PDF Logic
│   └── core/           # Project Settings
├── frontend-web/       # React (Vite) Single Page Application
└── frontend-desktop/   # PyQt5 Native Desktop Client
```

---

## 🛠️ Technical Implementation Notes

### Optimized PDF Handshaking
The system uses a two-tier approach for secure PDF downloads:
1. **Web**: Requests the PDF as a `blob`, passing the Auth token in headers. The blob is then served as a local object URL to trigger the browser's native download manager.
2. **Desktop**: The Python client downloads the PDF binary stream into a persistent temporary file, then leverages `os.startfile()` to launch the system's default PDF viewer (e.g., Adobe, Edge), ensuring a seamless native experience.

### Backend Data Lifecycle
The `DataFile` model includes an overridden `save()` method. Every time a new file is uploaded, the system automatically checks for existing records. If the count exceeds 5, the oldest records and their associated physical CSV files are purged to prevent storage bloat.
