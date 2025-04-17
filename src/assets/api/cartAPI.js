import axios from 'axios'

export async function addToCart(productSizeId, quantity = 1) {
  const params = new URLSearchParams({
    productSizeId,
    quantity
  })

  try {
    const response = await axios.post('http://localhost:8080/api/cart/add', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      withCredentials: true
    })
    return response.data
  } catch (error) {
    console.error('Error adding to cart:', error)
    throw error
  }
}

export async function getCart() {
  try {
    const response = await axios.get('http://localhost:8080/api/cart/items', {
      withCredentials: true
    })
    return response.data
  } catch (error) {
    console.error('Error fetching cart:', error)
    throw error
  }
}

export async function removeFromCart(cartDetailId) {
  try {
    const response = await axios.delete(`http://localhost:8080/api/cart/remove`, {
      params: { cartDetailId },
      withCredentials: true
    })
    return response.data
  } catch (error) {
    console.error('Error removing from cart:', error)
    throw error
  }
}

export async function updateSizeInCart(cartDetailId, newSizeId) {
  await axios.put(`http://localhost:8080/api/cart/update-size`, null, {
    params: {
      cartDetailId,
      newSizeId
    },
    withCredentials: true
  })
}

export async function updateQuantityInCart(cartDetailId, quantity) {
  return await axios.put('http://localhost:8080/api/cart/update-quantity', null, {
    params: {
      cartDetailId,
      quantity
    },
    withCredentials: true
  })
}

export async function clearCart() {
  try {
    const response = await axios.delete(`http://localhost:8080/api/cart/clear`, {
      withCredentials: true
    })
    return response.data
  } catch (error) {
    console.error('Error clearing cart:', error)
    throw error
  }
}
