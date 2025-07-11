import axios from "axios";

const API_URL = "https://elevatehub-backend.onrender.com/v1/payment";

const paymentApi = {
  createOrder: async ({ amount, currency, name, description }) => {
    try {
      const response = await axios.post(`${API_URL}/create-order`, {
        amount,
        currency,
        name,
        description,
      });
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw new Error("Failed to create order");
    }
  },

  verifyPayment: async (paymentData) => {
    try {
      const response = await axios.post(`${API_URL}/verify-payment`, paymentData);
      return response.data;
    } catch (error) {
      console.error("Error verifying payment:", error);
      return null;
    }
  },
};

export default paymentApi;
