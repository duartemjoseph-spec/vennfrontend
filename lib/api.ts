const API_BASE =
  "https://venngroupapi-emashqggf5gphwax.westus3-01.azurewebsites.net";

export async function createUser(
  username: string,
  email: string,
  password: string,
) {
  const res = await fetch(`${API_BASE}/User/CreateUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.Message || "Unable to create account.");
  }

  return data;
}

export async function loginUser(username: string, password: string) {
  const res = await fetch(`${API_BASE}/User/Login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.Message || "Login failed.");
  }

  return data;
}

// // Get user info by username
export async function getUserByUsername(username: string) {
  const res = await fetch(`${API_BASE}/User/GetUserByUsername/${username}`, {
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Could not load user info.");
  }

  return data;
}

// // Get profile by user id
export async function getProfileByUserId(userId: number, token: string) {
  const res = await fetch(`${API_BASE}/Profile/GetProfileByUserId/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Could not load profile.");
  }

  return data;
}

export function saveToken(token: string) {
  localStorage.setItem("vennToken", token);
}

export function getToken() {
  return localStorage.getItem("vennToken");
}

export function clearToken() {
  localStorage.removeItem("vennToken");
}

export function saveUsername(username: string) {
  localStorage.setItem("vennUsername", username);
}

export function getUsername() {
  return localStorage.getItem("vennUsername");
}

export function clearUsername() {
  localStorage.removeItem("vennUsername");
}

export function saveUserId(userId: number) {
  localStorage.setItem("vennUserId", userId.toString());
}

export function getUserId() {
  return localStorage.getItem("vennUserId");
}

export function clearUserId() {
  localStorage.removeItem("vennUserId");
}
