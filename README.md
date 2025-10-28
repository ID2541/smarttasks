# 📋 SmartTasks

A modern, full-stack **Kanban-style task management application** built with React and Django REST Framework.

## 🎯 Overview

**SmartTasks** is a work-in-progress productivity platform designed to help teams organize, track, and manage tasks efficiently through an intuitive Kanban board interface. The application combines a responsive React frontend with a robust Django REST API backend, connected to a MySQL database.

---

## 🚧 Project Status

> **Current state (October 2025)**  
> - ✅ Frontend structure created  
> - ✅ API connection through Axios  
> - ✅ AuthContext implemented  
> - ⚠️ Login and token verification **under debugging**  
> - 🚧 JWT authentication flow (backend integration) in progress  
> - 🚧 Task creation & full Kanban logic under testing

---

## ✨ Features

### Current Features
- 🔐 **User Authentication System**
  - Login and Registration pages
  - Global authentication context (`AuthContext`)
  - JWT token-based authentication (in progress)

- 📊 **Kanban Board**
  - Project management interface
  - Column-based task organization
  - Real-time API data fetching

- 🔌 **RESTful API**
  - Django REST Framework backend
  - Project, column, and task endpoints
  - MySQL database integration

- 🐳 **Docker Setup**
  - Docker Compose configuration
  - MySQL container
  - phpMyAdmin for database management

### Planned Features
- ✏️ Drag-and-drop task management
- 👥 Team collaboration features
- 🏷️ Task labels and categories
- 📅 Due dates and reminders
- 📈 Progress tracking and analytics
- 🔔 Real-time notifications

---

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **Axios** - HTTP client for API requests
- **React Context API** - State management
- **React Router** - Navigation

### Backend
- **Django** - Python web framework
- **Django REST Framework** - RESTful API development
- **MySQL** - Relational database
- **JWT** - Authentication tokens

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **phpMyAdmin** - Database administration

---

## 📁 Project Structure

```
smarttasks/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── context/         # AuthContext and global state
│   │   ├── pages/           # Login, Register, Kanban pages
│   │   ├── services/        # API service layer (Axios)
│   │   └── App.js           # Main application component
│   ├── public/
│   └── package.json
│
├── backend/                  # Django REST API
│   ├── api/                 # API endpoints
│   ├── smarttasks/          # Django project settings
│   ├── manage.py
│   └── requirements.txt
│
├── docker-compose.yml       # Docker orchestration
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **Docker** and **Docker Compose**
- **npm** or **yarn**

### Installation

#### 1. Clone the repository
```bash
git clone https://github.com/ID2541/smarttasks.git
cd smarttasks
```

#### 2. Set up the Backend

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Start development server
python manage.py runserver
```

The API will be available at `http://localhost:8000/api/`

#### 3. Set up the Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

The frontend will be available at `http://localhost:3000`

#### 4. Set up Docker (MySQL + phpMyAdmin)

```bash
# From project root
docker-compose up -d
```

- **MySQL** will be available at `localhost:3306`
- **phpMyAdmin** will be available at `http://localhost:8080`

---

## 🔧 Configuration

### Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```env
SECRET_KEY=your-secret-key-here
DEBUG=True
DATABASE_NAME=smarttasks
DATABASE_USER=root
DATABASE_PASSWORD=your-password
DATABASE_HOST=localhost
DATABASE_PORT=3306
```

### Frontend Environment Variables

Create a `.env` file in the `frontend/` directory:

```env
REACT_APP_API_URL=http://localhost:8000/api
```

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `POST /api/auth/logout/` - User logout
- `GET /api/auth/user/` - Get current user

### Projects
- `GET /api/projects/` - List all projects
- `POST /api/projects/` - Create new project
- `GET /api/projects/:id/` - Get project details
- `PUT /api/projects/:id/` - Update project
- `DELETE /api/projects/:id/` - Delete project

### Columns
- `GET /api/columns/` - List all columns
- `POST /api/columns/` - Create new column
- `PUT /api/columns/:id/` - Update column
- `DELETE /api/columns/:id/` - Delete column

### Tasks
- `GET /api/tasks/` - List all tasks
- `POST /api/tasks/` - Create new task
- `GET /api/tasks/:id/` - Get task details
- `PUT /api/tasks/:id/` - Update task
- `DELETE /api/tasks/:id/` - Delete task

---

## 🧪 Testing

### Backend Tests
```bash
cd backend
python manage.py test
```

### Frontend Tests
```bash
cd frontend
npm test
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 Development Notes

### Known Issues
- JWT token refresh mechanism needs implementation
- Login flow requires debugging for proper token storage
- Task drag-and-drop functionality is in development
- CORS settings may need adjustment for production

### Roadmap
- [ ] Complete JWT authentication flow
- [ ] Implement task drag-and-drop
- [ ] Add task filtering and search
- [ ] Implement user profile management
- [ ] Add email notifications
- [ ] Create mobile-responsive design improvements
- [ ] Deploy to production environment

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**ID2541**

- GitHub: [@ID2541](https://github.com/ID2541)

---

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- Powered by [Django REST Framework](https://www.django-rest-framework.org/)
- Inspired by modern Kanban tools like Trello and Notion

---

## 📞 Support

If you encounter any issues or have questions, please:
- Open an issue on GitHub
- Check existing issues for solutions
- Review the documentation

---

**⭐ If you find this project useful, please consider giving it a star!**