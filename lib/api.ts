const API_BASE =
  "https://venngroupapi-emashqggf5gphwax.westus3-01.azurewebsites.net";

// Create account
export async function createUser(
  username: string,
  email: string,
  password: string
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

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw new Error(data?.message || data?.Message || "Unable to create account.");
  }

  return data;
}

// Login
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

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw new Error(data?.message || data?.Message || "Login failed.");
  }

  return data;
}

// Get user by username
export async function getUserByUsername(username: string) {
  const res = await fetch(`${API_BASE}/User/GetUserByUsername/${username}`, {
    cache: "no-store",
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw new Error(data?.message || data?.Message || "Could not load user info.");
  }

  return data;
}

// Get profile by user id
export async function getProfileByUserId(userId: number, token: string) {
  const res = await fetch(`${API_BASE}/Profile/GetProfileByUserId/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error(text || "Could not load profile.");
  }

  if (!text) {
    return null;
  }

  return JSON.parse(text);
}

// Save token
export function saveToken(token: string) {
  localStorage.setItem("vennToken", token);
}

// Get token
export function getToken() {
  return localStorage.getItem("vennToken");
}

// Clear token
export function clearToken() {
  localStorage.removeItem("vennToken");
}

// Save username
export function saveUsername(username: string) {
  localStorage.setItem("vennUsername", username);
}

// Get username
export function getUsername() {
  return localStorage.getItem("vennUsername");
}

// Clear username
export function clearUsername() {
  localStorage.removeItem("vennUsername");
}

// Save user id
export function saveUserId(userId: number) {
  localStorage.setItem("vennUserId", userId.toString());
}

// Get user id
export function getUserId() {
  return localStorage.getItem("vennUserId");
}

// Clear user id
export function clearUserId() {
  localStorage.removeItem("vennUserId");
}