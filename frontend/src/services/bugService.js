import api from "./api";

export async function getBugs() {
  const response = await api.get("/bugs/");
  return response.data;
}

export async function getBug(id) {
  const response = await api.get(`/bugs/${id}`);
  return response.data;
}

export async function createBug(data) {
  const response = await api.post(
    "/bugs/",
    data
  );

  return response.data;
}

export async function updateBug(id, data) {
  const response = await api.put(
    `/bugs/${id}`,
    data
  );

  return response.data;
}

export async function deleteBug(id) {
  const response = await api.delete(
    `/bugs/${id}`
  );

  return response.data;
}

export async function getSimilarBugs(id) {
  const response = await api.get(
    `/bugs/${id}/similar`
  );

  return response.data;
}