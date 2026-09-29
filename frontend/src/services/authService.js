import api from "./api";

export async function registerUser(data) {
  const response = await api.post("/auth/register", data);
  return response.data;
}

export async function loginUser(data) {
  const response = await api.post("/auth/login", data);

  localStorage.setItem(
    "token",
    response.data.access_token
  );

  return response.data;
}

export function logoutUser() {
  localStorage.removeItem("token");
}

export function isLoggedIn() {
  return Boolean(
    localStorage.getItem("token")
  );
}