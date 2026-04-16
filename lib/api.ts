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
    throw new Error(
      data?.message || data?.Message || "Unable to create account."
    );
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
    throw new Error(data?.message || data?.Message || "Could not load user.");
  }

  return data;
}

// Get all users
export async function getAllUsers() {
  const res = await fetch(`${API_BASE}/User/GetAllUsers`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : [];

  if (!res.ok) {
    throw new Error("Could not load users.");
  }

  return data;
}

// Get all rooms
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

// Create room
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

// Get one room by id
export async function getRoomById(roomId: string, token?: string) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}/Room/GetRoomByRoomId/${roomId}`, {
    method: "GET",
    headers,
    cache: "no-store",
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw new Error(data?.message || data?.Message || "Could not load room.");
  }

  return data?.room || data;
}

// Get joined members by room id
export async function getMembersByRoomId(roomId: string) {
  const res = await fetch(`${API_BASE}/RoomMember/GetAllMembersByRoomId/${roomId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : [];

  if (!res.ok) {
    throw new Error("Could not load room members.");
  }

  return data;
}

// Invite member to room
export async function inviteMemberToRoom(roomModelId: number, memberId: number) {
  const res = await fetch(`${API_BASE}/RoomMember/InviteMemberToRoom`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      roomModelId,
      memberId,
      isAccepted: false,
    }),
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : true;

  if (!res.ok) {
    throw new Error(data?.message || data?.Message || "Could not invite member.");
  }

  return data;
}

// Get pending room invites by user
export async function getRoomInvitesByUserId(userId: number) {
  const res = await fetch(`${API_BASE}/RoomMember/GetUserInvitationByUserId/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : [];

  if (!res.ok) {
    throw new Error("Could not load room invites.");
  }

  return data;
}

// Accept room invite
export async function acceptRoomInvite(roomModelId: number, memberId: number) {
  const res = await fetch(`${API_BASE}/RoomMember/ChangeMemberStatusToAccepted`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      roomModelId,
      memberId,
      isAccepted: true,
    }),
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : true;

  if (!res.ok) {
    throw new Error("Could not accept room invite.");
  }

  return data;
}

// Get accepted friends
export async function getAcceptedFriends(userId: number) {
  const res = await fetch(`${API_BASE}/Friend/GetAllAcceptedFriends/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : [];

  if (!res.ok) {
    throw new Error("Could not load friends.");
  }

  return data;
}

// Get pending friends
export async function getPendingFriends(userId: number) {
  const res = await fetch(`${API_BASE}/Friend/GetAllPendingFriends/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : [];

  if (!res.ok) {
    throw new Error("Could not load pending friend requests.");
  }

  return data;
}

// Send friend request
export async function sendFriendRequest(requesterId: number, receiverId: number) {
  const res = await fetch(
    `${API_BASE}/Friend/SendFriendRequest/${requesterId}/${receiverId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw new Error(
      data?.message || data?.Message || "Could not send friend request."
    );
  }

  return data;
}

// Accept friend request
export async function acceptFriendRequest(
  requesterId: number,
  receiverId: number
) {
  const res = await fetch(
    `${API_BASE}/Friend/AddFriendStatusByColumnId/${requesterId}/${receiverId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw new Error("Could not accept friend request.");
  }

  return data;
}

// Save weekly availability
export async function createWeeklyAvailability(
  userId: number,
  availability: { day: number; hour: number; status: number }[]
) {
  const res = await fetch(
    `${API_BASE}/UserAvailability/CreateWeeklyAvailabilityByUserId/${userId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(availability),
    }
  );

  const text = await res.text();
  const data = text ? JSON.parse(text) : [];

  if (!res.ok) {
    throw new Error("Could not save availability.");
  }

  return data;
}

// Get weekly availability
export async function getWeeklyAvailability(userId: number) {
  const res = await fetch(
    `${API_BASE}/UserAvailability/GetUserWeeklyAvailabilityByUserId/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  const text = await res.text();
  const data = text ? JSON.parse(text) : [];

  if (!res.ok) {
    throw new Error("Could not load availability.");
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