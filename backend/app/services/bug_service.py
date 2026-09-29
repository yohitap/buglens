from sqlalchemy.orm import Session

from app.models.bug import Bug
from app.services.quality_service import calculate_quality_score
from app.services.triage_service import suggest_priority


def create_bug(
    db: Session,
    bug_data,
    reporter_id: int
):

    priority = suggest_priority(
        bug_data.severity,
        bug_data.description
    )

    quality = calculate_quality_score(
        bug_data
    )

    bug = Bug(
        title=bug_data.title,
        description=bug_data.description,

        steps_to_reproduce=bug_data.steps_to_reproduce,
        expected_result=bug_data.expected_result,
        actual_result=bug_data.actual_result,
        environment=bug_data.environment,

        severity=bug_data.severity,
        priority=priority,

        project_id=bug_data.project_id,
        reporter_id=reporter_id,
        assignee_id=bug_data.assignee_id,

        quality_score=quality
    )

    db.add(bug)
    db.commit()
    db.refresh(bug)

    return bug