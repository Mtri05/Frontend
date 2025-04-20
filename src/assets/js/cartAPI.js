import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/cart';

const cartAPI = {
  addToCart: (cartId, productSizeId, quantity) => {
    return axios.post(`${BASE_URL}/user/add`, null, {
      params: { cartId, productSizeId, quantity },
      withCredentials: true,
    });
  },

  updateQuantity: (cartId, productSizeId, quantity) => {
    return axios.put(`${BASE_URL}/user/update`, null, {
      params: { cartId, productSizeId, quantity },
      withCredentials: true,
    });
  },

  deleteItem: (cartId, productSizeId) => {
    return axios.delete(`${BASE_URL}/user/delete`, {
      params: { cartId, productSizeId },
      withCredentials: true,
    });
  },

  viewCart: (cartId) => {
    return axios.get(`${BASE_URL}/user/view`, {
      params: { cartId },
      withCredentials: true,
    });
  },

  clearCart: (cartId) => {
    return axios.delete(`${BASE_URL}/user/clear`, {
      params: { cartId },
      withCredentials: true,
    });
  }
};

export default cartAPI;

