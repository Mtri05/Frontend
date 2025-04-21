import axios from 'axios'

const token = localStorage.getItem('token')

const BASE_URL = 'http://localhost:8080/api/user/cart'

const cartAPI = {
  addToCart: (cartId, productSizeId, quantity) => {
    return axios.post(`${BASE_URL}/add`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
        // withCredentials: true,
      },
      params: { cartId, productSizeId, quantity },
    })
  },

  updateQuantity: (cartId, productSizeId, quantity) => {
    return axios.put(`${BASE_URL}/update`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
        // withCredentials: true,
      },
      params: { cartId, productSizeId, quantity },
    })
  },

  deleteItem: (cartId, productSizeId) => {
    return axios.delete(`${BASE_URL}/delete`, {
      headers: {
        Authorization: `Bearer ${token}`,
        // withCredentials: true,
      },
      params: { cartId, productSizeId },
    })
  },

  viewCart: (cartId) => {
    return axios.get(`${BASE_URL}/view`, {
      headers: {
        Authorization: `Bearer ${token}`,
        // withCredentials: true,
      },
      params: { cartId },
    })
  },

  clearCart: (cartId) => {
    return axios.delete(`${BASE_URL}/clear`, {
      headers: {
        Authorization: `Bearer ${token}`,
        // withCredentials: true,
      },
      params: { cartId },
    })
  },
}

export default cartAPI
