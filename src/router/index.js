import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import OtpFormView from '@/views/OtpFormView.vue'
import ForgotPasswordView from '@/views/ForgotPasswordView.vue'
import ChangePasswordView from '@/views/ChangePasswordView.vue'
import ProfileView from '@/views/ProfileView.vue'
import MyAddressView from '@/views/MyAddressView.vue'
import MyAddressFormView from '@/views/AddressFormView.vue'
import ManageCategoryView from '@/views/ManageCategoryView.vue'
import ManageProductView from '@/views/ManageProductView.vue'
import ManageUserView from '@/views/ManageUserView.vue'
import ManageOrderView from '@/views/ManageOrderView.vue'
import ManageOderDetailView from '@/views/ManageOderDetailView.vue'
import ProductFormView from '@/views/ProductFormView.vue'
import ManageDashboardView from '@/views/ManageDashboardView.vue'
import OrderHistoryView from '@/views/OrderHistoryView.vue'
import MyOrderDetailView from '@/views/MyOrderDetailView.vue'
import FavoriteView from '@/views/FavoriteView.vue'
import VerifyOtpView from '@/views/VerifyOtpView.vue'
import ProductView from '@/views/ProductView.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'
import ResetPasswordView from '@/views/ResetPasswordView.vue'
import ManageImage from '@/views/ManageImageView.vue'
import ManageProductSize from '@/views/manageProductSizeView.vue'
import ManageAddressView from '@/views/ManageAddressView.vue'
import ProductSizeFrom from '@/views/ProductSizeFormView.vue'
import ReviewHistoryView from '@/views/ReviewHistoryView.vue'
import EditAddressForm from '@/components/User/form/EditAddressForm.vue'
import ContactView from '@/views/ContactView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
  },
  {
    path: '/register/otp',
    name: 'OtpFormView',
    component: OtpFormView,
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: ForgotPasswordView,
  },
  {
    path: '/user/change-password',
    name: 'ChangePasswordView',
    component: ChangePasswordView,
  },
  {
    path: '/user/profile',
    name: 'ProfileView',
    component: ProfileView,
  },
  {
    path: '/user/address',
    name: 'MyAddressView',
    component: MyAddressView,
  },
  {
    path: '/user/address/form',
    name: 'MyAddressFormView',
    component: MyAddressFormView,
  },
  {
    path: '/user/address/edit/:id',
    name: 'EditAddressForm',
    component: EditAddressForm,
  },
  {
    path: '/user/order/history',
    name: 'OrderHistoryView',
    component: OrderHistoryView,
  },
  {
    path: '/user/order/details',
    name: 'MyOrderDetailView',
    component: MyOrderDetailView,
  },
  {
    path: '/user/review/history',
    name: 'ReviewHistoryView',
    component: ReviewHistoryView,
  },
  {
    path: '/user/favorite',
    name: 'FavoriteView',
    component: FavoriteView,
  },
  {
    path: '/verify-otp',
    name: 'VerifyOtpView',
    component: VerifyOtpView,
  },
  {
    path: '/product',
    name: 'ProductView',
    component: ProductView,
  },
  {
    path: '/product/detail',
    name: 'ProductDetailView',
    component: ProductDetailView,
  },
  {
    path: '/reset-password',
    name: 'ResetPasswordView',
    component: ResetPasswordView,
  },
  {
    path: '/admin/category',
    name: 'ManageCategoryView',
    component: ManageCategoryView,
  },
  {
    path: '/admin/product',
    name: 'ManageProductView',
    component: ManageProductView,
  },
  {
    path: '/admin/product/form',
    name: 'ProductFormView',
    component: ProductFormView,
  },
  {
    path: '/admin/user',
    name: 'user',
    component: ManageUserView,
  },
  {
    path: '/admin/address/list',
    name: 'address',
    component: ManageAddressView,
  },
  {
    path: '/admin/order',
    name: 'order',
    component: ManageOrderView,
  },
  {
    path: '/admin/order/detail',
    name: 'ManageOderDManageOrderViewetailView',
    component: ManageOderDetailView,
  },
  {
    path: '/admin',
    name: 'dashboard',
    component: ManageDashboardView,
  },
  {
    path: '/admin/product/images',
    name: 'manageImage',
    component: ManageImage,
  },
  {
    path: '/admin/product/sizes',
    name: 'manageProductSize',
    component: ManageProductSize,
  },
  {
    path: '/admin/product/productSizeForm',
    name: 'ProductSizeForm',
    component: ProductSizeFrom,
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/user/cart',
    name: 'cart',
    component: () => import('../views/CartView.vue'),
  },
]

// Gán meta.allowedRoles tự động cho các route có tiền tố
routes.forEach((route) => {
  if (route.path.startsWith('/admin')) {
    route.meta = { allowedRoles: [0] } // chỉ admin (role = 0)
  }
  if (route.path.startsWith('/user')) {
    route.meta = { allowedRoles: [1] } // chỉ user (role = 1)
  }
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Hàm lấy giá trị cookie theo tên
function getCookie(name) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
  return null
}

router.beforeEach((to, from, next) => {
  const allowedRoles = to.meta.allowedRoles
  const role = parseInt(getCookie('userRole'))

  // Nếu route KHÔNG yêu cầu quyền truy cập => ai cũng vào được
  if (!allowedRoles) {
    return next()
  }

  // Nếu là Admin (role = 0) => được vào tất cả các trang
  if (role === 0) {
    return next()
  }

  // Nếu là User (role = 1) => chỉ được vào các trang cho phép role = 1
  if (role === 1 && allowedRoles.includes(1)) {
    return next()
  }

  // Nếu chưa đăng nhập => chỉ cho phép vào các route KHÔNG có /admin hoặc /user
  if (isNaN(role)) {
    if (to.path.startsWith('/admin') || to.path.startsWith('/user')) {
      return next('/login')
    }
    return next()
  }

  // Mọi trường hợp không hợp lệ khác => redirect về login
  return next('/login')
})



export default router
