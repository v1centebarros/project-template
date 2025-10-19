# Fullstack Project Template

A modern, production-ready fullstack application template designed for educational purposes. This template demonstrates best practices for building scalable web applications with a clear separation between frontend, backend, and deployment concerns.

## 🏗️ Project Structure

```
project-template/
├── api/              # Backend API (FastAPI + Python)
├── web/              # Frontend application (React + TypeScript)
├── deployment/       # Docker Compose configurations and deployment files
└── README.md        # This file
```

## 🚀 Tech Stack

### Backend (API)
- **FastAPI**: Modern, fast web framework for building APIs
- **SQLModel**: SQL databases in Python with type safety
- **PostgreSQL**: Robust, open-source relational database
- **UV**: Fast Python package manager
- **Psycopg 3**: Modern PostgreSQL adapter for Python

### Frontend (Web)
- **React 19**: Latest version with modern hooks and features
- **TypeScript**: Type-safe JavaScript
- **Vite**: Next-generation frontend tooling
- **TanStack Router**: Type-safe routing solution
- **TanStack Query**: Powerful data synchronization
- **TanStack Table**: Headless table library
- **Tailwind CSS v4**: Utility-first CSS framework
- **Radix UI**: Unstyled, accessible components
- **Zod**: TypeScript-first schema validation

### Deployment
- **Docker**: Containerization platform
- **Docker Compose**: Multi-container orchestration
- **Nginx**: Reverse proxy and static file server

## 📋 Prerequisites

- **Docker** and **Docker Compose** (for containerized deployment)
- **Python 3.12+** (for local API development)
- **Node.js 18+** and **npm** (for local frontend development)
- **UV** (for Python package management)

## 🎯 Quick Start

### Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project-template
   ```

2. **Start all services**
   ```bash
   cd deployment
   docker compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost
   - API Documentation: http://localhost/api/docs
   - Health Check: http://localhost/health

### Local Development

For detailed instructions on running each component locally, see:
- [API Documentation](./api/README.md)
- [Web Documentation](./web/README.md)
- [Deployment Documentation](./deployment/README.md)

## 📁 Detailed Component Documentation

### [API (Backend)](./api/README.md)
Learn about the FastAPI backend structure, UV package manager usage, database models, and how to extend the API with new endpoints.

### [Web (Frontend)](./web/README.md)
Understand the React frontend architecture, component organization, routing strategy, and how to add new features.

### [Deployment](./deployment/README.md)
Explore Docker Compose configurations, Nginx setup, environment variables, and deployment strategies.

## 🌟 Features

- ✅ Type-safe frontend and backend
- ✅ Hot module replacement (HMR) for fast development
- ✅ Automatic API documentation with Swagger UI
- ✅ CORS configuration
- ✅ Environment-based configuration
- ✅ Production-ready Docker setup
- ✅ Nginx reverse proxy with security headers
- ✅ Rate limiting and request buffering

## 📚 Learning Resources

### Backend
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [SQLModel Documentation](https://sqlmodel.tiangolo.com/)
- [Pydantic Documentation](https://docs.pydantic.dev/)
- [UV Documentation](https://docs.astral.sh/uv/)

### Frontend
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TanStack Router](https://tanstack.com/router)
- [TanStack Query](https://tanstack.com/query)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite Guide](https://vite.dev/guide/)

### DevOps
- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Reference](https://docs.docker.com/compose/)
- [Nginx Documentation](https://nginx.org/en/docs/)

**Happy coding! 🚀**
