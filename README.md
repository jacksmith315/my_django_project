# Inventory Pro

A modern inventory management system built with Django and React.

## 🚀 Quick Start with Docker

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Setting Up the Environment

1. Clone the repository:
```bash
git clone https://github.com/jacksmith315/my_django_project.git
cd my_django_project
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Update the `.env` file with your configuration:
```env
# Django settings
DEBUG=False
DJANGO_SECRET_KEY=your-secure-secret-key

# Database settings
POSTGRES_DB=my_django_project
POSTGRES_USER=your_username
POSTGRES_PASSWORD=your_secure_password

# Google OAuth settings
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Building and Running with Docker

1. Build the containers:
```bash
docker-compose build
```

2. Start the services:
```bash
docker-compose up
```

Or run in detached mode:
```bash
docker-compose up -d
```

3. Access the application:
- Frontend: http://localhost
- Backend API: http://localhost/api
- Admin interface: http://localhost/admin

### Managing the Application

#### View logs
```bash
# All services
docker-compose logs

# Specific service
docker-compose logs backend
docker-compose logs frontend
docker-compose logs postgres
```

#### Execute commands
```bash
# Create a superuser
docker-compose exec backend python manage.py createsuperuser

# Make migrations
docker-compose exec backend python manage.py makemigrations

# Apply migrations
docker-compose exec backend python manage.py migrate

# Open PostgreSQL shell
docker-compose exec postgres psql -U postgres -d my_django_project
```

#### Stop the services
```bash
# Stop while preserving containers
docker-compose stop

# Stop and remove containers
docker-compose down

# Stop and remove containers, volumes, and images
docker-compose down -v --rmi all
```

## 🔧 Development Setup (without Docker)

If you prefer to run the application without Docker, follow these steps:

### Backend Setup

1. Create a virtual environment:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Run migrations:
```bash
python manage.py migrate
```

5. Start the development server:
```bash
python manage.py runserver
```

### Frontend Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start the development server:
```bash
npm run dev
```

## 📁 Project Structure

```
my_django_project/
├── backend/                 # Django backend
│   ├── Dockerfile          # Backend container configuration
│   ├── myproject/          # Django project settings
│   ├── myapi/             # Django REST API
│   └── requirements.txt    # Python dependencies
├── frontend/               # React frontend
│   ├── Dockerfile         # Frontend container configuration
│   ├── nginx.conf         # Nginx configuration
│   ├── src/               # React source code
│   └── package.json       # Node.js dependencies
├── docker-compose.yml     # Docker services configuration
├── .env.example           # Environment variables template
└── README.md             # Project documentation
```

## 🔒 Security Notes

1. Never commit the `.env` file
2. Regularly update dependencies
3. Use strong passwords for database and admin accounts
4. Keep your Google OAuth credentials secure

## 🛠 Troubleshooting

### Common Issues

1. **Port conflicts**
   - Ensure ports 80, 5432, and 8000 are not in use
   - Change ports in docker-compose.yml if needed

2. **Database connection issues**
   - Check PostgreSQL credentials in .env
   - Ensure postgres service is healthy

3. **Frontend not connecting to backend**
   - Verify VITE_API_URL in .env
   - Check nginx configuration

### Getting Help

If you encounter issues:
1. Check the logs using `docker-compose logs`
2. Verify your environment variables
3. Ensure all required services are running

## 📝 License

[MIT License](LICENSE)

## 👥 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request