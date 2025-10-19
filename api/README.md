# API - Backend Documentation

A modern Python API built with FastAPI, SQLModel, and PostgreSQL. This backend provides a robust foundation for building RESTful APIs with automatic documentation, type safety, and database integration.

## 🏗️ Project Structure

```
api/
├── src/
│   ├── __init__.py
│   ├── main.py              # Application entry point, FastAPI app initialization
│   ├── core/                # Core functionality and configuration
│   │   ├── __init__.py
│   │   ├── db.py           # Database connection and session management
│   │   ├── deps.py         # Dependency injection functions
│   │   └── settings.py     # Application settings and environment variables
│   ├── models/             # SQLModel database models
│   │   ├── __init__.py
│   │   └── product.py      # Example: Product model
│   ├── routers/            # API route handlers
│   │   ├── __init__.py
│   │   └── product.py      # Example: Product endpoints
│   └── services/           # Business logic layer
│       ├── __init__.py
│       └── product.py      # Example: Product service functions
├── pyproject.toml          # Project dependencies and metadata
├── Dockerfile              # Docker configuration for production
└── README.md              # This file
```

## 🎯 Architecture Overview

The API follows a **layered architecture** pattern:

1. **Routes (`routers/`)**: Handle HTTP requests/responses, validation
2. **Services (`services/`)**: Contain business logic and orchestration
3. **Models (`models/`)**: Define database schema with SQLModel
4. **Core (`core/`)**: Configuration, database setup, dependencies

This separation ensures:
- Clean code organization
- Easy testing and maintenance
- Clear separation of concerns
- Scalability

## 🚀 Technologies Explained

### FastAPI
**Why FastAPI?**
- ⚡ **Fast**: High performance, on par with NodeJS and Go
- 📝 **Automatic Documentation**: Built-in Swagger UI and ReDoc
- 🔍 **Type Safety**: Python type hints for validation
- 🎯 **Modern Python**: Async/await support
- 🛡️ **Data Validation**: Automatic request/response validation with Pydantic

### SQLModel
**Why SQLModel?**
- 🔄 **Unified Models**: Single model for DB schema and API validation
- 🎨 **Type Hints**: Full IDE support with autocomplete
- 🔧 **SQLAlchemy Core**: Built on battle-tested SQLAlchemy
- 📚 **Pydantic Integration**: Automatic validation and serialization

### UV Package Manager
**Why UV?**
- 🚄 **Speed**: 10-100x faster than pip
- 🔒 **Reliability**: Deterministic dependency resolution
- 📦 **Modern**: Written in Rust, modern Python packaging
- 🎯 **Simplicity**: Single tool for all Python package management
- 🔄 **Compatible**: Works with existing `pyproject.toml`

UV replaces pip, pip-tools, pipenv, and poetry with a single fast tool.

## 📦 Dependencies

Defined in `pyproject.toml`:

```toml
[project]
requires-python = ">=3.12"
dependencies = [
    "fastapi[all]>=0.119.0",    # Web framework + all optional dependencies
    "psycopg[binary,pool]>=3.2.11",  # PostgreSQL adapter with connection pooling
    "sqlmodel>=0.0.27",         # Database ORM with Pydantic integration
]
```

### Key Dependencies:
- **fastapi[all]**: Includes Uvicorn (ASGI server), Pydantic, validation, etc.
- **psycopg**: Modern, fast PostgreSQL adapter (v3)
- **sqlmodel**: Type-safe ORM combining SQLAlchemy and Pydantic

## 🔧 Installation & Setup

### Prerequisites
- Python 3.12 or higher
- PostgreSQL 16+ (or use Docker)
- UV package manager

### Install UV
```bash
# macOS/Linux
curl -LsSf https://astral.sh/uv/install.sh | sh

# Windows
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"

# Using pip (if you prefer)
pip install uv
```

### Setup Project

1. **Navigate to the API directory**
   ```bash
   cd api
   ```

2. **Create virtual environment and install dependencies**
   ```bash
   uv venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   uv pip install -e .
   ```

   Or simply:
   ```bash
   uv sync
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the `api/` directory:
   ```env
   POSTGRES_SERVER=localhost
   POSTGRES_PORT=5432
   POSTGRES_USER=myuser
   POSTGRES_PASSWORD=mypassword
   POSTGRES_DB=mydatabase
   ```

4. **Start PostgreSQL** (if running locally)
   ```bash
   # Using Docker
   docker run -d \
     --name postgres-dev \
     -e POSTGRES_USER=myuser \
     -e POSTGRES_PASSWORD=mypassword \
     -e POSTGRES_DB=mydatabase \
     -p 5432:5432 \
     postgres:18-alpine
   ```

## 🏃 Running the Application

### Development Mode

```bash
# Using UV (recommended)
uv run fastapi dev src/main.py

# Or with uvicorn directly
uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:
- **API**: http://localhost:8000
- **Interactive Docs**: http://localhost:8000/api/docs
- **Alternative Docs**: http://localhost:8000/redoc
- **OpenAPI Schema**: http://localhost:8000/openapi.json

### Production Mode

```bash
uv run fastapi run src/main.py
```

Or use Docker (see Deployment section).

## 📚 UV Package Manager Usage

### Common Commands

```bash
# Install dependencies from pyproject.toml
uv sync

# Add a new dependency
uv add package-name

# Add a development dependency
uv add --dev package-name

# Remove a dependency
uv remove package-name

# Update all dependencies
uv lock --upgrade

# Run a command in the virtual environment
uv run python script.py
uv run fastapi dev src/main.py

# Create a new virtual environment
uv venv

# Show installed packages
uv pip list

# Export dependencies to requirements.txt
uv pip freeze > requirements.txt
```

### Why Use UV Over pip?

| Feature | UV | pip |
|---------|----|----|
| Speed | 🚄 10-100x faster | 🐌 Slow |
| Lock file | ✅ `uv.lock` | ❌ Needs pip-tools |
| Resolver | ✅ Modern, deterministic | ⚠️ Can be inconsistent |
| Written in | 🦀 Rust | 🐍 Python |
| Caching | ✅ Global cache | ⚠️ Limited |

## 🔌 API Endpoints

### Health Check
```http
GET /health
```

Returns API status.

### Products (Example CRUD)

```http
GET    /api/products         # List all products
GET    /api/products/{id}    # Get a specific product
POST   /api/products         # Create a new product
PUT    /api/products/{id}    # Update a product
DELETE /api/products/{id}    # Delete a product
```

## 🏗️ Adding New Features

### 1. Create a Model (`models/`)

```python
# models/user.py
from sqlmodel import Field, SQLModel
from typing import Optional

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(unique=True, index=True)
    name: str
    is_active: bool = Field(default=True)
```

### 2. Create a Service (`services/`)

```python
# services/user.py
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from src.models.user import User

async def get_users(session: AsyncSession) -> list[User]:
    result = await session.exec(select(User))
    return result.all()

async def create_user(session: AsyncSession, user: User) -> User:
    session.add(user)
    await session.commit()
    await session.refresh(user)
    return user
```

### 3. Create a Router (`routers/`)

```python
# routers/user.py
from fastapi import APIRouter, Depends
from sqlmodel.ext.asyncio.session import AsyncSession
from src.core.deps import get_session
from src.models.user import User
from src.services import user as user_service

router = APIRouter()

@router.get("/", response_model=list[User])
async def read_users(session: AsyncSession = Depends(get_session)):
    return await user_service.get_users(session)

@router.post("/", response_model=User)
async def create_user(
    user: User,
    session: AsyncSession = Depends(get_session)
):
    return await user_service.create_user(session, user)
```

### 4. Register Router (`main.py`)

```python
from src.routers import user

app.include_router(user.router, prefix="/api/users", tags=["users"])
```

## 🗄️ Database

### Connection Management

The database connection is managed in `src/core/db.py`:
- **Async Engine**: Non-blocking database operations
- **Connection Pooling**: Efficient connection reuse
- **Session Management**: Per-request sessions via dependency injection

### Initialize Database

Database tables are created automatically on startup via the `lifespan` function in `main.py`.

### Manual Database Operations

```python
# Inside an async function
from src.core.db import get_session

async with get_session() as session:
    result = await session.exec(select(Product))
    products = result.all()
```

## 🔐 Configuration

Settings are managed in `src/core/settings.py` using Pydantic Settings:

- Reads from environment variables
- Type validation
- Computed fields (like database URLs)
- `.env` file support

```python
from src.core.settings import settings

# Access settings anywhere
db_url = settings.PGSQL_DATABASE_URI
```

## 🧪 Testing

Create a `tests/` directory and use pytest:

```bash
# Install test dependencies
uv add --dev pytest pytest-asyncio httpx

# Run tests
uv run pytest
```

Example test:
```python
from fastapi.testclient import TestClient
from src.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
```

## 🐳 Docker

The `Dockerfile` provides a production-ready container:

```bash
# Build image
docker build -t api:latest .

# Run container
docker run -p 8000:80 \
  -e POSTGRES_SERVER=host.docker.internal \
  -e POSTGRES_USER=myuser \
  -e POSTGRES_PASSWORD=mypassword \
  -e POSTGRES_DB=mydatabase \
  api:latest
```

## 📊 API Documentation

FastAPI automatically generates interactive API documentation:

- **Swagger UI**: http://localhost:8000/api/docs
  - Interactive testing
  - Request/response examples
  - Try endpoints directly
  
- **ReDoc**: http://localhost:8000/redoc
  - Clean, professional documentation
  - Better for sharing with stakeholders

## 🛠️ Common Issues

### Database Connection Errors
- Verify PostgreSQL is running
- Check environment variables in `.env`
- Ensure database exists: `createdb mydatabase`

### Import Errors
- Make sure virtual environment is activated
- Run `uv sync` to install dependencies

### Port Already in Use
- Change port: `uvicorn src.main:app --port 8001`
- Or stop the process using port 8000

## 📖 Learn More

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [SQLModel Documentation](https://sqlmodel.tiangolo.com/)
- [UV Documentation](https://docs.astral.sh/uv/)
- [Pydantic Documentation](https://docs.pydantic.dev/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

**Need help?** Check the main [project README](../README.md) or consult the FastAPI documentation.
