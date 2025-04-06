import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ForgotPasswordView from '@/views/ForgotPasswordView.vue'
import ChangePasswordView from '@/views/ChangePasswordView.vue'
import ProfileView from '@/views/ProfileView.vue'
import MyAddressView from '@/views/MyAddressView.vue'
import ManageCategoryView from '@/views/ManageCategoryView.vue'
import ManageProductView from '@/views/ManageProductView.vue'
import ManageUserView from '@/views/ManageUserView.vue'
import ManageOrderView from '@/views/ManageOrderView.vue'
import ManageDashboardView from '@/views/ManageDashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPasswordView,
    },
    {
      path: '/user/change-password',
      name: 'change-password',
      component: ChangePasswordView,
    },
    {
      path: '/user/profile',
      name: 'profile',
      component: ProfileView,
    },
    {
      path: '/user/address',
      name: 'address',
      component: MyAddressView,
    },
    {
      path: '/admin/category',
      name: 'category',
      component: ManageCategoryView,
    },
    {
      path: '/admin/product',
      name: 'product',
      component: ManageProductView,
    },
    {
      path: '/admin/user',
      name: 'user',
      component: ManageUserView,
    },
    {
      path: '/admin/order',
      name: 'order',
      component: ManageOrderView,
    },
    {
      path: '/admin',
      name: 'dashboard',
      component: ManageDashboardView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
