# Chemical Equipment Parameter Visualizer

A robust full-stack data visualization system designed to analyze and display critical equipment performance metrics such as **Flowrate**, **Pressure**, and **Temperature**. The system features a powerful Django backend and provides dual-client interfaces for both web and desktop users.

---

## 🚀 Key Features

-   **Seamless File Upload**: Upload CSV datasets directly through the Web or Desktop interfaces.
-   **Intelligent Analysis**: Automated pandas-powered calculations for averages, distributions, and outliers.
-   **Dynamic Data Tables**: Integrated preview of raw datasets directly within the dashboard.
-   **Professional PDF Reporting**: Generate one-click analysis reports for equipment health.
-   **Dual Client Support**:
    -   **Web**: Modern React-based dashboard with real-time Chart.js visualizations.
    -   **Desktop**: High-performance PyQt5 application with integrated Matplotlib plotting.
-   **Secure by Design**: Token-based authentication (DRF) for all API interactions.
-   **Optimized Data Management**: Automatic cleanup routines that retain only the most relevant historical data (last 5 uploads).

---

## 🛠️ Tech Stack

-   **Backend**: Python, Django, Django REST Framework, Pandas, SQLite.
-   **Web Frontend**: React.js (Vite), Chart.js, Axios, Vanilla CSS.
-   **Desktop Frontend**: PyQt5, Matplotlib, Requests.

---

## ⚙️ Setup Instructions

### 1. Backend Setup
1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Create and activate a virtual environment:
    ```bash
    python -m venv venv
    venv\Scripts\activate
    ```
3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4.  Run migrations and start the server:
    ```bash
    python manage.py migrate
    python manage.py runserver
    ```

### 2. Web Frontend Setup
1.  Navigate to the web directory:
    ```bash
    cd frontend-web
    ```
2.  Install packages and start the dev server:
    ```bash
    npm install
    npm run dev
    ```

### 3. Desktop Frontend Setup
1.  Navigate to the desktop directory:
    ```bash
    cd frontend-desktop
    ```
2.  Create and activate a virtual environment:
    ```bash
    python -m venv venv
    venv\Scripts\activate
    ```
3.  Install dependencies and run the app:
    ```bash
    pip install -r requirements.txt
    python main.py
    ```

---

## 📡 API Documentation

| Endpoint | Method | Auth | Description |
| :--- | :--- | :--- | :--- |
| `/api/login/` | `POST` | No | Authenticate and retrieve access token. |
| `/api/upload/` | `POST` | Yes | Upload CSV dataset for processing. |
| `/api/summary/latest/` | `GET` | Yes | Retrieve the latest analysis results. |
| `/api/history/` | `GET` | Yes | Get a list of the last 5 analysis records. |
| `/api/report/<id>/` | `GET` | Yes | Download a generated PDF report for a data ID. |

---

## 🏗️ Project Structure

```text
Visualizer/
├── backend/            # Django REST Framework backend
│   ├── api/            # Analysis logic and API views
│   └── core/           # Project configuration
├── frontend-web/       # React (Vite) Frontend
└── frontend-desktop/   # PyQt5 Desktop Client
```

---

## 🛠️ Technical Notes (Developer Reference)

### Authenticated PDF Downloads
The PDF reports are protected by Token Authentication. We use **Axios** with `responseType: 'blob'` to handle binary data. the resulting blob is then converted into a temporary URL to trigger a browser download, ensuring the security token is included in the request headers.

### Data Security
Security is handled at the API level using DRF's `IsAuthenticated` permission class. All requests to `/api/*` (except login) require a valid `Authorization: Token <key>` header.
