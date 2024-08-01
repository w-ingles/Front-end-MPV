import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import axios from "axios";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      beforeEnter: async (to, from, next) => {
        if (await isAuthenticated()) {
          next('/home'); // Redireciona para a página inicial se o usuário estiver autenticado
        } else {
          next();
        }
      }
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      beforeEnter: async (to, from, next) => {

        if (await isAuthenticated()) {
          next();
        } else {
          next('/login'); // Redireciona para a página de login se não estiver autenticado
        }
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

// Função para verificar o token
async function isAuthenticated() {

    const token = localStorage.getItem('access_token');

    if (!token) {
      return false;
    }

  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/check`, { token });

    console.log(response.data.valid);
    if (response.data.valid) {
      return true;
    } else {
      localStorage.removeItem('access_token');
      return false;
    }
  } catch (error) {
    console.error('Erro ao validar o token:', error);
    localStorage.removeItem('access_token');
    return false;
  }


}
export default router
