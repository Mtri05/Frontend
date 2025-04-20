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

// Đảm bảo getUserIdFromCookie được khai báo trước khi sử dụng
const getUserIdFromCookie = () => {
  const match = document.cookie.match(/(?:^|;\s*)userId=(\d+)/)
  return match ? parseInt(match[1]) : null
}

const userId = getUserIdFromCookie() // Lấy userId từ cookie

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

  console.log('Thông tin đánh giá:', {
    orderDetailId: orderDetailId,
    rating: rating.value,
    comment: comment.value,
    userId: userId,
  })

  try {
    await axios.post('http://localhost:8080/api/reviews', {
      orderDetailId: orderDetailId,
      rating: rating.value,
      comment: comment.value,
      userId: userId,
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
        <h5 class="modal-title">Đánh giá sản phẩm</h5>
        <button @click="emit('close')">×</button>
      </div>
      <div class="modal-body">
        <h6>{{ orderDetail?.productName }}</h6>
        <div class="rating-stars">
          <span
            v-for="n in 5"
            :key="n"
            @click="rating = n"
            :class="n <= rating ? 'star-filled' : 'star-empty'"
          >★</span>
        </div>
        <textarea v-model="comment" rows="4" placeholder="Nhận xét..."></textarea>
      </div>
      <div class="modal-footer">
        <button @click="emit('close')">Hủy</button>
        <button @click="submitReview">Gửi đánh giá</button>
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
  background-color: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  width: 90%;
  max-width: 600px;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  animation: slideIn 0.3s ease;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-body {
  margin-top: 1rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
}

.rating-stars {
  text-align: center;
  font-size: 2rem;
  margin: 1rem 0;
  cursor: pointer;
}

.star-filled {
  color: #f7c700;
}

.star-empty {
  color: #ccc;
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
