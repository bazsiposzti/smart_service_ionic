import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import HomePage from "../views/HomePage.vue";
import LoginPage from "@/views/LoginPage.vue";
import { useAuthStore } from "@/stores/AuthStore";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/home",
    name: "home",
    component: HomePage,

    meta: {requiresAuth: true}
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // 1. Ha az oldal védett (requiresAuth), és nincs bejelentkezve a szerelő
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next('/login'); // Dobd ki a bejelentkező képernyőre!
  } 
  // 2. Ha a login oldalra akar menni, de MÁR be van jelentkezve
  else if (to.path === '/login' && authStore.isLoggedIn) {
    next('/home'); // Ne szívassuk, engedjük egyből a főoldalra!
  } 
  // 3. Minden más esetben engedd tovább normálisan
  else {
    next();
  }
});

export default router;
