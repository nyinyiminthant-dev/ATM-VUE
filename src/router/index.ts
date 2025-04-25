import DefaultLayout from '@/layout/DefaultLayout.vue'
import ATMView from '@/modules/ATM/ATMView.vue'
import BankView from '@/modules/Bank/BankView.vue'
import HomeView from '@/modules/home/HomeView.vue'
import LoginView from '@/modules/Login/LoginView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: '',
      path: '/',
      component: DefaultLayout,
      children: [
        {
          name: 'atm',
          path: '/atm',
          component: ATMView
        },

        {
          name: 'home',
          path: '',
          component: HomeView
        },

        {
          name: 'login',
          path: '/login',
          component: LoginView
        },
        {
          name: 'bank',
          path: '/bank',
          component: BankView
        }
      ]
    }
  ],
})

export default router
