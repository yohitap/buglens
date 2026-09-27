from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    ForeignKey,
    DateTime
)
from sqlalchemy.sql import func

from app.core.database import Base


class Bug(Base):
    __tablename__ = "bugs"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(250), nullable=False)

    description = Column(Text, nullable=False)

    steps_to_reproduce = Column(Text, nullable=True)

    expected_result = Column(Text, nullable=True)

    actual_result = Column(Text, nullable=True)

    environment = Column(String(200), nullable=True)

    severity = Column(
        String(30),
        default="medium"
    )

    priority = Column(
        String(30),
        default="medium"
    )

    status = Column(
        String(30),
        default="open"
    )

    project_id = Column(
        Integer,
        ForeignKey("projects.id"),
        nullable=False
    )

    reporter_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    assignee_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=True
    )

    quality_score = Column(
        Integer,
        default=0
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )