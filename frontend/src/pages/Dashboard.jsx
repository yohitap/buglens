import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getBugs } from "../services/bugService";

function Dashboard() {

  const [bugs, setBugs] = useState([]);

  useEffect(() => {

    getBugs()
      .then(setBugs)
      .catch(console.error);

  }, []);

  const open = bugs.filter(
    bug => bug.status === "open"
  ).length;

  const critical = bugs.filter(
    bug => bug.priority === "critical"
  ).length;

  const resolved = bugs.filter(
    bug => bug.status === "resolved"
  ).length;

  return (
    <div className="page">

      <div className="dashboard-header">

        <div>
          <h1>Dashboard</h1>

          <p>
            Monitor your team's bugs and
            development quality.
          </p>
        </div>

        <Link
          to="/create-bug"
          className="primary-button"
        >
          + Report Bug
        </Link>

      </div>


      <div className="stats-grid">

        <div className="stat-card">
          <span>Total Bugs</span>
          <strong>{bugs.length}</strong>
        </div>

        <div className="stat-card">
          <span>Open Bugs</span>
          <strong>{open}</strong>
        </div>

        <div className="stat-card">
          <span>Critical</span>
          <strong>{critical}</strong>
        </div>

        <div className="stat-card">
          <span>Resolved</span>
          <strong>{resolved}</strong>
        </div>

      </div>


      <div className="dashboard-section">

        <h2>
          Recent Bugs
        </h2>

        {bugs.slice(0, 5).map((bug) => (

          <Link
            className="recent-bug"
            key={bug.id}
            to={`/bugs/${bug.id}`}
          >

            <span>
              BUG-{bug.id}
            </span>

            <strong>
              {bug.title}
            </strong>

            <span>
              {bug.priority}
            </span>

          </Link>

        ))}

      </div>

    </div>
  );
}

export default Dashboard;