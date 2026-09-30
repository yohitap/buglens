import { Link } from "react-router-dom";

function BugCard({ bug }) {

  return (
    <div className="bug-card">

      <div className="bug-card-header">

        <span className="bug-id">
          BUG-{bug.id}
        </span>

        <span className={`status ${bug.status}`}>
          {bug.status}
        </span>

      </div>

      <h3>{bug.title}</h3>

      <p>
        {bug.description?.substring(0, 120)}
        {bug.description?.length > 120 ? "..." : ""}
      </p>

      <div className="bug-meta">

        <span>
          Severity: {bug.severity}
        </span>

        <span>
          Priority: {bug.priority}
        </span>

      </div>

      <div className="quality">

        <span>
          Quality Score
        </span>

        <strong>
          {bug.quality_score}/100
        </strong>

      </div>

      <Link
        to={`/bugs/${bug.id}`}
        className="view-button"
      >
        View Bug
      </Link>

    </div>
  );
}

export default BugCard;