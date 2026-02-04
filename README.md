# Equipment Data Visualizer

A full-stack data visualization system designed to analyze and display equipment performance metrics (Flowrate, Pressure, Temperature). The system features a Django backend and provides two client interfaces: a modern React Web dashboard and a PyQt5 Desktop application.

## 🚀 Features
- **File Upload**: Support for CSV datasets in Web and Desktop.
- **Automated Analysis**: Pandas-powered calculation of averages and distribution.
- **Data Tables**: Integrated raw data preview (first 10 rows) in both clients.
- **PDF Reporting**: One-click generation of professional analysis reports.
- **Dual Frontends**: Web (React + Chart.js) and Desktop (PyQt5 + Matplotlib).
- **Secure Access**: Token-based authentication for all API endpoints.
- **Data Retention**: Automatic cleanup of old datasets (keeps last 5).

## 🛠️ Tech Stack
- **Backend**: Django, Django REST Framework, Pandas, SQLite.
- **Web Frontend**: React.js (Vite), Chart.js, Axios.
- **Desktop Frontend**: PyQt5, Matplotlib, Requests.

---

## ⚙️ Setup Instructions

### 1. Backend Setup
```bash
cd backend
python -m venv venv
source venv/Scripts/activate  # Or venv\Scripts\activate on CMD
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser  # Create your admin account
python manage.py runserver
```

### 2. Web Frontend Setup
```bash
cd frontend-web
npm install
npm run dev
```

### 3. Desktop Frontend Setup
```bash
cd frontend-desktop
python -m venv venv
source venv/Scripts/activate
pip install -r requirements.txt
python main.py
```

---

## 📡 API Documentation

| Endpoint | Method | Auth | Description |
| :--- | :--- | :--- | :--- |
| `/api/login/` | `POST` | No | Get Token (username/password). |
| `/api/upload/` | `POST` | Yes | Upload CSV and return summary. |
| `/api/summary/latest/` | `GET` | Yes | Get latest valid analysis. |
| `/api/history/` | `GET` | Yes | List last 5 datasets. |
| `/api/report/<id>/` | `GET` | Yes | Download Analysis Report (PDF). |

---

## 📸 Screenshots
*(Insert your screenshots here)*
- **Web Dashboard**: `[screenshot_web.png]`
- **Desktop Application**: `[screenshot_desktop.png]`

---

---

## 🛠️ Technical Notes (Developer Reference)

### Authenticated PDF Downloads
The PDF reports are protected by Token Authentication. To handle this in the web frontend:
- We use **Axios** with `responseType: 'blob'`.
- The binary data is converted into a temporary **Blob URL**.
- A hidden link is programmatically clicked to trigger the browser's download manager.
- This ensures the security token is sent with the request, which a standard `<a href="...">` tag cannot do.

### Data Security
All API endpoints (`/api/*`) are secured using Django REST Framework's `IsAuthenticated` permission class and `TokenAuthentication`. Unauthenticated requests will receive a `401 Unauthorized` response.

---


