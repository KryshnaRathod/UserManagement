import { authFetch } from "./authApi";

const API_URL = "/api/students";

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
    search,
    page: page.toString(),
    limit: limit.toString(),
  });

  if (gender) {
    params.append("gender", gender);
  }

  const response = await authFetch(
    `${API_URL}?${params.toString()}`,
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
