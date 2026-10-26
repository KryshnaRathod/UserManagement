import { authFetch } from "./authApi";
import { API_BASE_URL } from "./config";

const API_URL = `${API_BASE_URL}/api/students`;

// ================= CREATE STUDENT =================
export const createStudent = async (student) => {
  const response = await authFetch(API_URL, {
    method: "POST",
    body: JSON.stringify(student),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to add student"
    );
  }

  return result;
};


// ================= UPDATE STUDENT =================
export const updateStudent = async (id, student) => {
  const response = await authFetch(`${API_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(student),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to update student"
    );
  }

  return result;
};


// ================= DELETE STUDENT =================
export const deleteStudent = async (id) => {
  const response = await authFetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to delete student"
    );
  }

  return result;
};


// ================= GET STUDENTS =================
export const getStudents = async ({
  page = 1,
  limit = 10,
  gender = "",
} = {}) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (gender) {
    params.append("gender", gender);
  }

  const response = await authFetch(`${API_URL}?${params.toString()}`, {
    method: "GET",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to fetch students"
    );
  }

  return result;
};


// ================= SEARCH STUDENTS =================
export const searchStudents = async ({
  search = "",
  page = 1,
  limit = 10,
  gender = "",
} = {}) => {
  const params = new URLSearchParams({
    q: search,
    page: page.toString(),
    limit: limit.toString(),
  });

  if (gender) {
    params.append("gender", gender);
  }

  const response = await authFetch(
    `${API_URL}/search?${params.toString()}`,
    {
      method: "GET",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to search students"
    );
  }

  return result;
};


// ================= FIRST NAME SUGGESTIONS =================
export const getFirstNames = async (q = "") => {
  const params = new URLSearchParams({ q });

  const response = await authFetch(
    `${API_URL}/first-names?${params.toString()}`,
    {
      method: "GET",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to load suggestions"
    );
  }

  return result;
};
