from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.comment import Comment
from app.schemas.comment import CommentCreate


router = APIRouter(
    prefix="/comments",
    tags=["Comments"]
)


@router.post("/{bug_id}")
def add_comment(
    bug_id: int,
    data: CommentCreate,
    db: Session = Depends(get_db)
):

    comment = Comment(
        content=data.content,
        bug_id=bug_id,
        user_id=1
    )

    db.add(comment)
    db.commit()
    db.refresh(comment)

    return comment


@router.get("/{bug_id}")
def get_comments(
    bug_id: int,
    db: Session = Depends(get_db)
):

    return db.query(Comment).filter(
        Comment.bug_id == bug_id
    ).all()