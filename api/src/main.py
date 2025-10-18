from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routers import product


app = FastAPI(
    title="Project Template API",
    summary="API to serve Project Template.",
    openapi_url="/openapi.json",
    docs_url="/api/docs",
    # lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # Adjust as needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.get("/health", tags=["Health"])
async def health_check():
    return {"status": "ok"}

# Include routers
app.include_router(product.router)

