const API_URL = "/api/auth";

// ================= LOGIN =================
export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  localStorage.setItem("user", JSON.stringify(data.data));

  return data;
};

// ================= SIGNUP =================
export const signupUser = async (
  name,
  email,
  password
) => {
  const response = await fetch(`${API_URL}/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Signup failed");
  }

  return data;
};

// ================= LOGOUT =================
export const logoutUser = async () => {
  await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });

  localStorage.removeItem("user");
};

// ================= GET USER =================
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// ================= CHECK LOGIN =================
export const isAuthenticated = () => {
  return !!localStorage.getItem("user");
};

// ================= AUTH FETCH WRAPPER =================
export const authFetch = async (url, options = {}) => {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    credentials: "include",
    headers,
  });

  if (response.status === 401) {
    let body;
    try {
      body = await response.json();
    } catch {
      body = {};
    }

    await logoutUser();
    window.dispatchEvent(
      new CustomEvent("auth:token-expired", {
        detail: { code: body.code, message: body.message },
      })
    );

    throw new Error(body.message || "Session expired. Please login again.");
  }

  return response;
};
