from pydantic import BaseModel


class BugCreate(BaseModel):
    title: str
    description: str

    steps_to_reproduce: str | None = None
    expected_result: str | None = None
    actual_result: str | None = None
    environment: str | None = None

    severity: str = "medium"
    priority: str = "medium"

    project_id: int
    assignee_id: int | None = None


class BugUpdate(BaseModel):
    title: str | None = None
    description: str | None = None

    severity: str | None = None
    priority: str | None = None
    status: str | None = None

    assignee_id: int | None = None


class BugResponse(BaseModel):
    id: int
    title: str
    description: str

    steps_to_reproduce: str | None
    expected_result: str | None
    actual_result: str | None
    environment: str | None

    severity: str
    priority: str
    status: str

    project_id: int
    reporter_id: int
    assignee_id: int | None

    quality_score: int

    class Config:
        from_attributes = True