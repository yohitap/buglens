import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getBug,
  getSimilarBugs
} from "../services/bugService";

function BugDetails() {

  const { id } = useParams();

  const [bug, setBug] = useState(null);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {

    loadBug();

  }, [id]);


  async function loadBug() {

    try {

      const bugData = await getBug(id);

      setBug(bugData);

      const similarData =
        await getSimilarBugs(id);

      setSimilar(similarData);

    } catch (error) {

      console.error(error);

    }
  }


  if (!bug) {

    return (
      <div className="page">
        Loading...
      </div>
    );

  }


  return (
    <div className="page">

      <div className="bug-detail">

        <span>
          BUG-{bug.id}
        </span>

        <h1>
          {bug.title}
        </h1>

        <p>
          {bug.description}
        </p>

        <hr />

        <h3>
          Steps to reproduce
        </h3>

        <p>
          {bug.steps_to_reproduce ||
            "Not provided"}
        </p>

        <h3>
          Expected result
        </h3>

        <p>
          {bug.expected_result ||
            "Not provided"}
        </p>

        <h3>
          Actual result
        </h3>

        <p>
          {bug.actual_result ||
            "Not provided"}
        </p>

        <div className="bug-info">

          <span>
            Severity: {bug.severity}
          </span>

          <span>
            Priority: {bug.priority}
          </span>

          <span>
            Status: {bug.status}
          </span>

          <span>
            Quality: {bug.quality_score}/100
          </span>

        </div>

      </div>


      <div className="similar-bugs">

        <h2>
          🔍 Similar Bugs
        </h2>

        {similar.length === 0 ? (

          <p>
            No similar bugs found.
          </p>

        ) : (

          similar.map((item) => (

            <div
              className="similar-item"
              key={item.bug_id}
            >

              <strong>
                BUG-{item.bug_id}
              </strong>

              <span>
                {item.title}
              </span>

              <span>
                {item.similarity}% similar
              </span>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default BugDetails;