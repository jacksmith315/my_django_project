# My Django Project

A full-stack web application with Django backend and React frontend.

## Project Structure

- `backend/` - Django REST API
  - `myapi/` - Main API application
  - `myproject/` - Django project settings
  - `manage.py` - Django management script
  - `requirements.txt` - Python dependencies

- `frontend/` - React TypeScript application
  - Built with Vite
  - Uses Tailwind CSS for styling
  - Includes Google OAuth integration

## Setup

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

### Frontend (.env)
```
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Backend (.env)
```
DEBUG=True
SECRET_KEY=your_django_secret_key
```