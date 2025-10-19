# Deployment Documentation

This directory contains Docker Compose configurations and deployment files for running the fullstack application in both development and production environments.

## 🏗️ Structure

```
deployment/
├── docker-compose.yml       # Production configuration
├── docker-compose.dev.yml   # Development configuration (DB only)
├── nginx.conf              # Nginx reverse proxy configuration
└── README.md              # This file
```

## 🐳 Docker Architecture

The application uses a **multi-container architecture** with Docker Compose:

```
┌─────────────────────────────────────────┐
│           Nginx (Port 80)               │
│  - Serves frontend static files         │
│  - Proxies API requests to backend      │
└─────────────┬───────────────────────────┘
              │
      ┌───────┴────────┐
      │                │
┌─────▼──────┐  ┌──────▼──────┐
│    Web     │  │     API     │
│  (React)   │  │  (FastAPI)  │
└────────────┘  └──────┬──────┘
                       │
                ┌──────▼──────┐
                │ PostgreSQL  │
                │  (Port 5432)│
                └─────────────┘
```

### Services

1. **db** (PostgreSQL): Database service
2. **api** (FastAPI): Backend API service
3. **web** (Nginx): Frontend + Reverse Proxy

## 🎯 Deployment Configurations

### Production (`docker-compose.yml`)

**Use this for:**
- Production deployments
- Testing the full stack together
- Staging environments

**What it does:**
- Builds all services from source
- Configures Nginx as reverse proxy
- Sets up database with persistent storage
- Manages inter-service networking

### Development (`docker-compose.dev.yml`)

**Use this for:**
- Local development
- Running only the database
- Testing with local frontend/backend

**What it does:**
- Runs PostgreSQL only
- Exposes database port (5432)
- Allows local API/Web to connect

## 🚀 Quick Start

### Production Deployment

```bash
# Navigate to deployment directory
cd deployment

# Start all services
docker compose up -d

# View logs
docker compose logs -f

# Stop all services
docker compose down
```

Access the application:
- **Frontend**: http://localhost
- **API Docs**: http://localhost/api/docs
- **Health Check**: http://localhost/health

### Development with Database Only

```bash
# Start PostgreSQL only
cd deployment
docker compose -f docker-compose.dev.yml up -d

# Database is now accessible at localhost:5432
```

Then run API and Web locally:
```bash
# Terminal 1 - API
cd ../api
uv run fastapi dev src/main.py

# Terminal 2 - Web
cd ../web
npm run dev
```

## ⚙️ Environment Variables

### Default Values

Both compose files use these defaults:

```env
POSTGRES_USER=myuser
POSTGRES_PASSWORD=mypassword
POSTGRES_DB=mydatabase
POSTGRES_SERVER=db
POSTGRES_PORT=5432
```

### Override with .env File

Create a `.env` file in the `deployment/` directory:

```env
# Database Configuration
POSTGRES_USER=customuser
POSTGRES_PASSWORD=strongpassword
POSTGRES_DB=myapp
POSTGRES_SERVER=db
POSTGRES_PORT=5432
```

Docker Compose automatically reads this file.

### Production Best Practices

**Never use default passwords in production!**

```bash
# Generate a strong password
openssl rand -base64 32

# Set in .env file
POSTGRES_PASSWORD=<generated-password>
```

## 🔧 Nginx Configuration

The `nginx.conf` file configures:

### 1. **Reverse Proxy**
Routes API requests to the backend:
```
/api/*       → backend (FastAPI)
/openapi.json → backend
/health      → backend
```

### 2. **Static File Serving**
Serves React frontend from `/usr/share/nginx/html`

### 3. **Client-Side Routing**
All non-API requests fall back to `index.html` for React Router/TanStack Router

### 4. **Security Headers**
- `X-Frame-Options`: Prevents clickjacking
- `X-Content-Type-Options`: Prevents MIME sniffing
- `X-XSS-Protection`: Enables XSS filter

### 5. **Rate Limiting**
- Limits API requests to 10 per second per IP
- Allows bursts up to 20 requests
- Prevents DoS attacks

### 6. **Performance**
- Gzip compression for text files
- Request buffering
- Connection pooling

## 📝 Docker Compose Files Explained

### Production Configuration

```yaml
services:
  db:
    image: postgres:18-alpine      # Lightweight PostgreSQL
    environment:                   # Database credentials
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypassword
      POSTGRES_DB: mydatabase
    volumes:
      - db_data:/var/lib/postgresql/data  # Persistent storage

  api:
    build: ../api                  # Build from API Dockerfile
    environment:                   # Connect to database
      POSTGRES_SERVER: db          # Use service name
      # ... other env vars
    depends_on:
      - db                         # Start DB first

  web:
    build: ../web                  # Build from Web Dockerfile
    ports:
      - "80:80"                    # Expose to host
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro  # Mount config
    depends_on:
      - api                        # Start API first

volumes:
  db_data:                         # Named volume for data persistence
```

### Development Configuration

```yaml
services:
  db:
    image: postgres:18-alpine
    environment:
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypassword
      POSTGRES_DB: mydatabase
    ports:
      - "5432:5432"                # Expose to host for local dev
    volumes:
      - db_data:/var/lib/postgresql/data
```

## 🛠️ Common Commands

### Building Services

```bash
# Build all services
docker compose build

# Build specific service
docker compose build api

# Build with no cache (fresh build)
docker compose build --no-cache
```

### Starting Services

```bash
# Start in foreground (see logs)
docker compose up

# Start in background (detached)
docker compose up -d

# Start specific service
docker compose up db

# Rebuild and start
docker compose up --build
```

### Stopping Services

```bash
# Stop services (keeps containers)
docker compose stop

# Stop and remove containers
docker compose down

# Stop, remove containers, and delete volumes
docker compose down -v
```

### Viewing Logs

```bash
# All services
docker compose logs

# Follow logs (real-time)
docker compose logs -f

# Specific service
docker compose logs api

# Last 100 lines
docker compose logs --tail=100
```

### Executing Commands

```bash
# Run command in a service
docker compose exec api bash

# Run database commands
docker compose exec db psql -U myuser -d mydatabase

```

### Health Checks

```bash
# Check service status
docker compose ps

# Check API health
curl http://localhost/health

# Check database connection
docker compose exec db pg_isready -U myuser
```

## 🔍 Troubleshooting

### Port Already in Use

**Error**: `Bind for 0.0.0.0:5432 failed: port is already allocated`

**Solutions**:
```bash
# Option 1: Stop local PostgreSQL
brew services stop postgresql  # macOS
sudo systemctl stop postgresql # Linux

# Option 2: Change port in docker-compose.yml
ports:
  - "5433:5432"  # Use 5433 on host
```

### Cannot Connect to Database

**Check 1**: Is the database running?
```bash
docker compose ps db
```

**Check 2**: Are credentials correct?
```bash
# Inside API container
docker compose exec api env | grep POSTGRES
```

**Check 3**: Is the database ready?
```bash
docker compose logs db
# Look for "database system is ready to accept connections"
```

### API Not Responding

**Check 1**: Is the API running?
```bash
docker compose logs api
```

**Check 2**: Check for errors:
```bash
docker compose logs api --tail=50
```

**Check 3**: Restart the API:
```bash
docker compose restart api
```

### Frontend Shows 404

**Check 1**: Is Nginx configured correctly?
```bash
docker compose exec web cat /etc/nginx/nginx.conf
```

**Check 2**: Are files built?
```bash
docker compose exec web ls /usr/share/nginx/html
```

**Check 3**: Rebuild the frontend:
```bash
docker compose build web
docker compose up -d web
```

### Database Data Persistence

**List volumes**:
```bash
docker volume ls | grep template-project
```

**Inspect volume**:
```bash
docker volume inspect template-project_db_data
```

**Backup database**:
```bash
docker compose exec db pg_dump -U myuser mydatabase > backup.sql
```

**Restore database**:
```bash
docker compose exec -T db psql -U myuser mydatabase < backup.sql
```

## 🚢 Production Deployment Checklist

### Before Deployment

- [ ] Set strong database password in `.env`
- [ ] Review and update CORS origins in `api/src/main.py`
- [ ] Set `NODE_ENV=production` for frontend
- [ ] Configure domain name in Nginx (if using custom domain)
- [ ] Set up SSL/TLS certificates (use Let's Encrypt)
- [ ] Configure firewall rules
- [ ] Set up backup strategy
- [ ] Enable monitoring and logging
- [ ] Review security headers
- [ ] Test rate limiting

### SSL/TLS Setup (Production)

For HTTPS, update `nginx.conf`:

```nginx
server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;

    # ... rest of configuration
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}
```

Mount certificates:
```yaml
web:
  volumes:
    - ./nginx.conf:/etc/nginx/nginx.conf:ro
    - ./ssl:/etc/nginx/ssl:ro  # Add this
```

### Environment-Specific Configuration

Create multiple environment files:

```bash
deployment/
├── .env.development
├── .env.staging
├── .env.production
```

Use with:
```bash
docker compose --env-file .env.production up -d
```

## 📊 Monitoring & Maintenance

### Health Monitoring

```bash
# Monitor all services
watch -n 5 'docker compose ps'

# Monitor resource usage
docker stats

# Check disk usage
docker system df
```

### Log Management

```bash
# Rotate logs
docker compose logs > logs-$(date +%Y%m%d).txt

# Clean old logs
docker compose down
docker compose up -d
```

### Database Maintenance

```bash
# Vacuum database
docker compose exec db vacuumdb -U myuser -d mydatabase

# Reindex database
docker compose exec db reindexdb -U myuser -d mydatabase
```

## 🎓 Learning Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Reference](https://docs.docker.com/compose/compose-file/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [PostgreSQL Docker Hub](https://hub.docker.com/_/postgres)

## 💡 Advanced Topics

### Horizontal Scaling

To run multiple API instances:

```yaml
api:
  build: ../api
  deploy:
    replicas: 3  # Run 3 instances
  # ... rest of config
```

### Using Docker Swarm

```bash
# Initialize swarm
docker swarm init

# Deploy stack
docker stack deploy -c docker-compose.yml myapp

# Scale service
docker service scale myapp_api=5
```

### CI/CD Integration

Example GitHub Actions workflow:

```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to server
        run: |
          docker compose build
          docker compose up -d
```

## 🔐 Security Best Practices

1. **Never commit `.env` files** - Add to `.gitignore`
2. **Use secrets management** - Docker secrets or external vault
3. **Regular updates** - Keep images up to date
4. **Network isolation** - Use internal networks
5. **Resource limits** - Set memory and CPU limits
6. **Read-only filesystems** - Where possible
7. **Non-root users** - Run containers as non-root
8. **Security scanning** - Use tools like Trivy

Example with resource limits:

```yaml
api:
  deploy:
    resources:
      limits:
        cpus: '0.5'
        memory: 512M
      reservations:
        cpus: '0.25'
        memory: 256M
```