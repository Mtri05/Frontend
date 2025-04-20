import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/reviews';

export const getReviewsByProduct = (productId) => {
  return axios.get(`${BASE_URL}/product/${productId}`);
};

export const createReview = (reviewData) => {
  return axios.post(BASE_URL, reviewData);
};
