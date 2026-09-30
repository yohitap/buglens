import { useEffect, useState } from "react";

import {
  getProjects
} from "../services/projectService";

function Projects() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {

    getProjects()
      .then(setProjects)
      .catch(console.error);

  }, []);

  return (
    <div className="page">

      <h1>Projects</h1>

      <div className="project-grid">

        {projects.map((project) => (

          <div
            className="project-card"
            key={project.id}
          >

            <h2>
              {project.name}
            </h2>

            <p>
              {project.description}
            </p>

            <span>
              {project.status}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Projects;