<script setup>
import { ref, watch } from 'vue'
import axios from 'axios'

const props = defineProps({
  show: Boolean,
  orderDetail: Object,
})

const emit = defineEmits(['close', 'submitted'])

const rating = ref(0)
const comment = ref('')

const getUserIdFromCookie = () => {
  const match = document.cookie.match(/(?:^|;\s*)userId=(\d+)/)
  return match ? parseInt(match[1]) : null
}

const userId = getUserIdFromCookie()

watch(() => props.show, (val) => {
  if (val) {
    rating.value = 0
    comment.value = ''
  }
})

const submitReview = async () => {
  if (rating.value === 0) {
    alert('Vui lòng chọn số sao.')
    return
  }

  const orderDetailId = props.orderDetail?.id
  if (!orderDetailId) {
    alert('Không tìm thấy ID đơn hàng.')
    return
  }

  try {
    await axios.post('http://localhost:8080/api/user/reviews', {
      orderDetailId,
      rating: rating.value,
      comment: comment.value,
      userId,
    })

    alert('Đánh giá đã được gửi!')
    emit('submitted', orderDetailId)
  } catch (err) {
    console.error('Lỗi khi gửi đánh giá:', err)
    alert('Lỗi khi gửi đánh giá')
  }
}
</script>

<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title">Đánh giá sản phẩm</h2>
        <button class="close-btn" @click="emit('close')">×</button>
      </div>
      <div class="modal-body">
        <h3 class="product-name">{{ orderDetail?.productName }}</h3>
        <div class="rating-stars">
          <span
            v-for="n in 5"
            :key="n"
            @click="rating = n"
            :class="n <= rating ? 'star-filled' : 'star-empty'"
          >★</span>
        </div>
        <textarea v-model="comment" rows="4" placeholder="Nhận xét..." class="comment-box"></textarea>
      </div>
      <div class="modal-footer">
        <button class="btn cancel" @click="emit('close')">Hủy</button>
        <button class="btn submit" @click="submitReview">Gửi đánh giá</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: #fff;
  width: 100%;
  max-width: 500px;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  animation: slideIn 0.3s ease;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
}

.close-btn {
  font-size: 1.5rem;
  border: none;
  background: none;
  cursor: pointer;
}

.product-name {
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 1rem;
}

.rating-stars {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1rem;
  cursor: pointer;
}

.star-filled {
  color: #ffc107;
  transition: color 0.2s;
}

.star-empty {
  color: #e0e0e0;
  transition: color 0.2s;
}

.comment-box {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 0.5rem;
  font-size: 1rem;
  resize: none;
  transition: border 0.2s;
}

.comment-box:focus {
  outline: none;
  border-color: #007bff;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.btn.cancel {
  background-color: #f1f1f1;
  color: #333;
}

.btn.cancel:hover {
  background-color: #e0e0e0;
}

.btn.submit {
  background-color: #007bff;
  color: white;
}

.btn.submit:hover {
  background-color: #0056b3;
}

@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  } to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
