import { useState } from "react";

function BugForm({ onSubmit }) {

  const [form, setForm] = useState({
    title: "",
    description: "",
    steps_to_reproduce: "",
    expected_result: "",
    actual_result: "",
    environment: "",
    severity: "medium",
    priority: "medium",
    project_id: 1
  });

  function handleChange(event) {

    setForm({
      ...form,
      [event.target.name]: event.target.value
    });

  }

  function handleSubmit(event) {

    event.preventDefault();

    onSubmit({
      ...form,
      project_id: Number(form.project_id)
    });
  }

  return (
    <form
      className="bug-form"
      onSubmit={handleSubmit}
    >

      <input
        name="title"
        placeholder="Bug title"
        value={form.title}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Describe the bug..."
        value={form.description}
        onChange={handleChange}
        required
      />

      <textarea
        name="steps_to_reproduce"
        placeholder="Steps to reproduce"
        value={form.steps_to_reproduce}
        onChange={handleChange}
      />

      <textarea
        name="expected_result"
        placeholder="Expected result"
        value={form.expected_result}
        onChange={handleChange}
      />

      <textarea
        name="actual_result"
        placeholder="Actual result"
        value={form.actual_result}
        onChange={handleChange}
      />

      <input
        name="environment"
        placeholder="Environment e.g. Chrome / macOS"
        value={form.environment}
        onChange={handleChange}
      />

      <select
        name="severity"
        value={form.severity}
        onChange={handleChange}
      >
        <option value="low">
          Low
        </option>

        <option value="medium">
          Medium
        </option>

        <option value="high">
          High
        </option>

        <option value="critical">
          Critical
        </option>

      </select>

      <button type="submit">
        Create Bug
      </button>

    </form>
  );
}

export default BugForm;