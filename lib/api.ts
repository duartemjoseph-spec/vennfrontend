const API_BASE = "https://venngroupapi-emashqggf5gphwax.westus3-01.azurewebsites.net";

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
      password
    }),
  });

  const data = await res.json();
  console.log(await data);
  console.log(res.ok)
  if (!res.ok) {
    throw new Error(data.Message || "Login failed.");
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

export function clearUsername() {
  localStorage.removeItem("vennUsername");
}