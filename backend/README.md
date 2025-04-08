# Inventory Pro Backend

The Django backend for Inventory Pro, providing a RESTful API and authentication services.

## 🚀 Quick Start

### Prerequisites

- Python 3.10 or higher
- pip (Python package installer)
- PostgreSQL

### Development Setup

1. Create and activate a virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
# Django Configuration
DEBUG=True
DJANGO_SECRET_KEY=your-secret-key-here

# Database Configuration
POSTGRES_DB=my_django_project
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_HOST=localhost
POSTGRES_PORT=5432

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

5. Run migrations:
```bash
python manage.py migrate
```

6. Create a superuser (optional):
```bash
python manage.py createsuperuser
```

7. Start the development server:
```bash
python manage.py runserver 8000
```

The API will be available at `http://localhost:8000/api`

## 📁 Project Structure

```
backend/
├── myproject/             # Django project settings
│   ├── settings.py        # Project settings
│   ├── urls.py           # URL configuration
│   └── wsgi.py           # WSGI configuration
├── myapi/                # Main Django app
│   ├── models/           # Database models
│   ├── serializers/      # DRF serializers
│   ├── views/            # API views
│   ├── urls.py          # API URL routing
│   └── tests/           # Test cases
├── manage.py            # Django management script
├── requirements.txt     # Python dependencies
└── .env.example        # Environment template
```

## 🛠️ Available Commands

- `python manage.py runserver 8000` - Start development server
- `python manage.py migrate` - Apply database migrations
- `python manage.py makemigrations` - Create new migrations
- `python manage.py test` - Run tests
- `python manage.py createsuperuser` - Create admin user
- `python manage.py collectstatic` - Collect static files

## 🔒 Authentication

The application uses:
- Google OAuth for user authentication
- Django's session-based authentication
- CSRF protection for security

## 🔗 API Endpoints

### Authentication
- `GET /api/auth/csrf/` - Get CSRF token
- `POST /api/auth/google/` - Google OAuth login
- `POST /api/auth/logout/` - Logout user

### Items
- `GET /api/items/` - List all items
- `POST /api/items/` - Create new item
- `GET /api/items/<id>/` - Get item details
- `PUT /api/items/<id>/` - Update item
- `DELETE /api/items/<id>/` - Delete item

## 🔗 API Documentation

Detailed API documentation is available in [API.md](API.md). This includes:
- Complete endpoint specifications
- Request/response examples
- Authentication details
- Testing instructions
- Error handling

For testing the API, we recommend using:
- [httpie](https://httpie.io/) - A user-friendly command-line HTTP client
- [curl](https://curl.se/) - The standard command-line tool for HTTP requests
- Browser dev tools for frontend testing

## 📝 Development Guidelines

1. **Code Style**
   - Follow PEP 8 guidelines
   - Use Django's coding style
   - Keep functions and classes focused

2. **API Design**
   - Follow RESTful principles
   - Use appropriate HTTP methods
   - Include proper error handling

3. **Testing**
   - Write unit tests for models
   - Test API endpoints
   - Use Django's test client

4. **Security**
   - Keep secrets in environment variables
   - Enable CORS appropriately
   - Use proper authentication

## 🐛 Troubleshooting

1. **Database Issues**
   - Verify PostgreSQL is running
   - Check database credentials
   - Ensure migrations are applied

2. **Environment Variables**
   - Confirm `.env` file exists
   - Verify variable names
   - Check secret key format

3. **Authentication Problems**
   - Verify Google OAuth credentials
   - Check CORS settings
   - Ensure CSRF token is set

4. **Development Server**
   - Check port availability
   - Verify virtual environment is active
   - Ensure all dependencies are installed