import api from "./api";

export const createOrder = async (orderData) => {
  try {
    const response = await api.post("/orders/order", orderData);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const getOrdersByPhone = async (phone) => {
  try {
    const response = await api.get(`/orders/history/${phone}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order history:", error);
    throw error;
  }
};

export const getOrderById = async (id) => {
  try {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching order ${id}:`, error);
    throw error;
  }
};
