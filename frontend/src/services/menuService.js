import api from "./api";

export const getAllMenuItems = async () => {
  try {
    const response = await api.get("/menu-items/all-items");
    return response.data;
  } catch (error) {
    console.error("Error fetching menu items:", error);
    throw error;
  }
};

export const getMenuItemById = async (id) => {
  try {
    const response = await api.get(`/menu-items/menu-item/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching menu item ${id}:`, error);
    throw error;
  }
};
