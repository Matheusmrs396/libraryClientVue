import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/produtos",
      name: "product",
      component: () => import("../views/ProductView.vue"),
    },
    {
      path: "/categorias",
      name: "category",
      component: () => import("../views/CategoryView.vue"),
    },
    {
      path: "/carrinho",
      name: "shoppingCart",
      component: () => import("../views/ShoppingCartView.vue"),
    },
    {
      path: "/autores",
      name: "author",
      component: () => import("../views/AuthorView.vue"),
    },
    {
      path: "/editoras",
      name: "publisher",
      component: () => import("../views/PublisherView.vue"),
    },
    {
      path: "/cadastroLivro",
      name: "bookRegistration",
      component: () => import("../views/BookRegistrationView.vue"),
    }
  ],
});

export default router;
