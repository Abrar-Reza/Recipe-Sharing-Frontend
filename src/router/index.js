import { createRouter, createWebHistory } from 'vue-router'
import SignUp from '../views/SignUp.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Home from '../views/Home.vue'
import PostDetail from '../views/PostDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: "Home",
      },
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        title: "Profile",
      },    
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: "Login",
      },    
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp,
      meta: {
        title: "SignUp",
      },    
    },
    {
      path: '/:recipe_slug',
      name: 'PostDetail',
      component: PostDetail   
    },
  ]
});

router.beforeEach((to, from, next) => {
  document.title = `Recipes | ${to.meta.title}`;
  next();
})

export default router
