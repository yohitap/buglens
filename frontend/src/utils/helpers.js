export function getStatusClass(status) {
  return status
    ?.toLowerCase()
    .replace(/\s+/g, "-");
}


export function getPriorityClass(priority) {
  return priority
    ?.toLowerCase()
    .replace(/\s+/g, "-");
}


export function formatDate(date) {
  if (!date) return "";

  return new Date(date).toLocaleDateString();
}