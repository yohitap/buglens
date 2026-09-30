import { useNavigate } from "react-router-dom";

import BugForm from "../components/BugForm";
import { createBug } from "../services/bugService";

function CreateBug() {

  const navigate = useNavigate();

  async function handleSubmit(data) {

    try {

      const bug = await createBug(data);

      navigate(`/bugs/${bug.id}`);

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.detail ||
        "Failed to create bug"
      );

    }
  }

  return (
    <div className="page">

      <h1>Report a Bug</h1>

      <p>
        Provide as much information as possible.
        BugLens will calculate a quality score
        and suggest priority automatically.
      </p>

      <BugForm
        onSubmit={handleSubmit}
      />

    </div>
  );
}

export default CreateBug;