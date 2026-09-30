import { useEffect, useState } from "react";

import BugCard from "../components/BugCard";
import { getBugs } from "../services/bugService";

function Bugs() {

  const [bugs, setBugs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    loadBugs();

  }, []);

  async function loadBugs() {

    try {

      const data = await getBugs();

      setBugs(data);

    } catch (error) {

      console.error(error);

    }
  }

  const filteredBugs = bugs.filter((bug) =>
    bug.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="page">

      <h1>Bug Tracker</h1>

      <input
        className="search"
        placeholder="Search bugs..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <div className="bug-grid">

        {filteredBugs.map((bug) => (
          <BugCard
            key={bug.id}
            bug={bug}
          />
        ))}

      </div>

    </div>
  );
}

export default Bugs;