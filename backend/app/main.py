from fastapi import FastAPI

app = FastAPI(
    title="BUGLENS API",
    description="Intelligent Bug Tracking and Triage Platform",
    version="1.0.0"
)


@app.get("/")
def root():
    return {
        "message": "Welcome to BUGLENS",
        "status": "running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }