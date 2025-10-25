from contextlib import asynccontextmanager
import os
from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from src.core.db import init_db
from src.routers import product


# Get container hostname to identify replica
REPLICA_ID = os.getenv("HOSTNAME", "unknown")


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize database
    await init_db()
    yield
    # Shutdown: Add cleanup code here if needed


app = FastAPI(
    title="Project Template API",
    summary="API to serve Project Template.",
    openapi_url="/openapi.json",
    docs_url="/api/docs",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:80", "http://localhost"], # Adjust as needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["X-Replica-ID"],
)


@app.middleware("http")
async def add_replica_header(request, call_next):
    """Add replica ID to all responses"""
    response = await call_next(request)
    response.headers["X-Replica-ID"] = REPLICA_ID
    return response


@app.get("/health", tags=["Health"])
async def health_check():
    return {"status": "ok", "replica_id": REPLICA_ID}

# Include routers
app.include_router(product.router,prefix="/api/products", tags=["products"])

