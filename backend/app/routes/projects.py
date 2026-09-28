from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.project import Project
from app.schemas.project import ProjectCreate


router = APIRouter(
    prefix="/projects",
    tags=["Projects"]
)


@router.post("/")
def create_project(
    data: ProjectCreate,
    db: Session = Depends(get_db)
):

    project = Project(
        name=data.name,
        description=data.description,
        owner_id=1
    )

    db.add(project)
    db.commit()
    db.refresh(project)

    return project


@router.get("/")
def get_projects(
    db: Session = Depends(get_db)
):

    return db.query(Project).all()


@router.get("/{project_id}")
def get_project(
    project_id: int,
    db: Session = Depends(get_db)
):

    project = db.query(Project).filter(
        Project.id == project_id
    ).first()

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    return project