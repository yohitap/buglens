from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.bug import Bug
from app.schemas.bug import BugCreate, BugUpdate
from app.services.bug_service import create_bug
from app.services.similarity_service import find_similar_bugs


router = APIRouter(
    prefix="/bugs",
    tags=["Bugs"]
)


@router.post("/")
def create_new_bug(
    data: BugCreate,
    db: Session = Depends(get_db)
):

    bug = create_bug(
        db,
        data,
        reporter_id=1
    )

    return bug


@router.get("/")
def get_bugs(
    db: Session = Depends(get_db)
):

    return db.query(Bug).order_by(
        Bug.created_at.desc()
    ).all()


@router.get("/{bug_id}")
def get_bug(
    bug_id: int,
    db: Session = Depends(get_db)
):

    bug = db.query(Bug).filter(
        Bug.id == bug_id
    ).first()

    if not bug:
        raise HTTPException(
            status_code=404,
            detail="Bug not found"
        )

    return bug


@router.put("/{bug_id}")
def update_bug(
    bug_id: int,
    data: BugUpdate,
    db: Session = Depends(get_db)
):

    bug = db.query(Bug).filter(
        Bug.id == bug_id
    ).first()

    if not bug:
        raise HTTPException(
            status_code=404,
            detail="Bug not found"
        )

    update_data = data.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(bug, key, value)

    db.commit()
    db.refresh(bug)

    return bug


@router.delete("/{bug_id}")
def delete_bug(
    bug_id: int,
    db: Session = Depends(get_db)
):

    bug = db.query(Bug).filter(
        Bug.id == bug_id
    ).first()

    if not bug:
        raise HTTPException(
            status_code=404,
            detail="Bug not found"
        )

    db.delete(bug)
    db.commit()

    return {
        "message": "Bug deleted successfully"
    }


@router.get("/{bug_id}/similar")
def similar_bugs(
    bug_id: int,
    db: Session = Depends(get_db)
):

    bug = db.query(Bug).filter(
        Bug.id == bug_id
    ).first()

    if not bug:
        raise HTTPException(
            status_code=404,
            detail="Bug not found"
        )

    bugs = db.query(Bug).filter(
        Bug.id != bug_id
    ).all()

    return find_similar_bugs(
        bug,
        bugs
    )