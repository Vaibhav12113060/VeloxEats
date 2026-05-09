import API from "../api/axios";

// Register User
export const registerUser = async (userData) => {
  const response = await API.post("/auth/register", userData);

  return response.data;
};

// Login User

export const loginUser = async (userData) => {
  const response = await API.post("/auth/login", userData);

  return response.data;
};

export const logoutUser = () => {
  // Remove token
  localStorage.removeItem("token");

  // Remove user data
  localStorage.removeItem("user");

  // Optional: clear everything
  // localStorage.clear();
};

// Get user profile

export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.get("/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
