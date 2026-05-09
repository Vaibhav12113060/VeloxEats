import API from "../api/axios";

// Get All Restaurants

export const getAllRestaurants = async () => {
  try {
    const response = await API.get("/restaurants");

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createRestaurant = async (RestaurantData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.post("/restaurants/create", RestaurantData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get My Restaurant

export const getMyRestaurant = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.get("/restaurants/my-restaurant", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateRestaurant = async (id, restaurantData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.put(`/restaurants/${id}`, restaurantData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteRestaurant = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.delete(`/restaurants/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
