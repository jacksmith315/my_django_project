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

2. Create and configure environment variables (REQUIRED before building containers):
```bash
# Copy the example environment file
cp .env.example .env

# Open .env in your text editor and update these required values:
# - DJANGO_SECRET_KEY (generate a secure key)
# - GOOGLE_CLIENT_ID (from Google Cloud Console)
# - GOOGLE_CLIENT_SECRET (from Google Cloud Console)
# - VITE_GOOGLE_CLIENT_ID (same as GOOGLE_CLIENT_ID)
```

3. Required environment variables in `.env`:
```env
# PostgreSQL Configuration (can keep defaults for development)
POSTGRES_DB=my_django_project
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres

# Django Configuration (must change these)
DEBUG=False
DJANGO_SECRET_KEY=your-secret-key-here  # Change this!

# Google OAuth Configuration (must change these)
GOOGLE_CLIENT_ID=your-google-client-id      # Change this!
GOOGLE_CLIENT_SECRET=your-google-client-secret  # Change this!

# Frontend Configuration (must change this)
VITE_API_URL=http://localhost:8000/api
VITE_GOOGLE_CLIENT_ID=your-google-client-id  # Same as GOOGLE_CLIENT_ID above
```

### Building and Running with Docker

⚠️ Important: Make sure you've completed the environment setup above before proceeding!

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

3. Verify the environment:
```bash
# Check if all required environment variables are set
docker-compose config

# Check container logs for any environment-related issues
docker-compose logs
```

4. Access the application:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000/api
- Admin interface: http://localhost:8000/admin

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
python manage.py runserver 8000
```

### Frontend Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Start the development server:
```bash
npm run dev -- --port 5173
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

1. Never commit the `.env` file or any files containing sensitive information
2. Regularly update dependencies
3. Use strong passwords for database and admin accounts
4. Keep your Google OAuth credentials secure
5. Store sensitive information in environment variables

## 🛠 Troubleshooting

### Common Issues

1. **Environment Variables**
   - Ensure `.env` file exists and is properly configured BEFORE building containers
   - Required variables:
     - DJANGO_SECRET_KEY
     - GOOGLE_CLIENT_ID
     - GOOGLE_CLIENT_SECRET
     - VITE_GOOGLE_CLIENT_ID
   - Run `docker-compose config` to verify variables are being read
   - If changing variables, rebuild containers: `docker-compose up --build`

2. **Port conflicts**
   - Ensure ports 5173 (frontend), 8000 (backend), and 5432 (database) are not in use
   - Change ports in docker-compose.yml if needed
   - Stop any local development servers before running Docker containers

3. **Database connection issues**
   - Check PostgreSQL credentials in .env
   - Ensure postgres service is healthy
   - Verify the database host and port settings

4. **Frontend not connecting to backend**
   - Verify VITE_API_URL in .env matches your backend URL
   - Check CORS settings in backend
   - Ensure Google OAuth credentials are correctly configured

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