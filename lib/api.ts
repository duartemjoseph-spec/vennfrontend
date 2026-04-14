const API_BASE =
  "https://venngroupapi-emashqggf5gphwax.westus3-01.azurewebsites.net";

// user routes
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

export async function getUserByUsername(username: string) {
  const res = await fetch(`${API_BASE}/User/GetUserByUsername/${username}`, {
    cache: "no-store",
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw new Error(data?.message || data?.Message || "Could not load user.");
  }

  return data;
}

// room routes
export async function getAllRooms(token?: string) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}/Room/GetAllRooms`, {
    method: "GET",
    headers,
    cache: "no-store",
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : [];

  if (!res.ok) {
    throw new Error("Could not load rooms.");
  }

  return data;
}

export async function createRoom(
  roomData: {
    title: string;
    category: string;
    eventDate: string;
    isRoomActive: boolean;
    userId: number;
  },
  token?: string
) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}/Room/CreateRoom`, {
    method: "POST",
    headers,
    body: JSON.stringify(roomData),
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw new Error(data?.message || data?.Message || "Could not create room.");
  }

  return data;
}

// local storage helpers
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