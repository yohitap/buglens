function BugStatus({ status }) {

  return (
    <span className={`bug-status ${status}`}>
      {status}
    </span>
  );
}

export default BugStatus;