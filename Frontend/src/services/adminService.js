import API from "../api/axios";

// ================= UPDATE USER ROLE =================

export const updateUserRole = async (userId, role) => {
  try {
    const response = await API.put(`/auth/user/${userId}/role`, { role });

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
