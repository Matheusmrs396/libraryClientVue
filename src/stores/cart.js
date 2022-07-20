import { defineStore } from "pinia";
import axios from "axios";

export const useCartStore = defineStore({
  id: "cart",
  state: () => ({
    carts: [],
  }),
  actions: {
    async getAllCarts() {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/carts?expand=product"
        );
        this.carts = data;
        return Promise.resolve();
      } catch (e) {
        console.error(e);
        if (e.response.status === 404)
          return Promise.reject(e.response.statusText);
        return Promise.reject("Erro desconhecido ao consultar 'carts'");
      }
    },
    async addCart(product) {
      try {
        alert("caiu no add");
        console.log(product)
        const { data } = await axios.post("http://localhost:4000/carts", product);
        this.carts.push(data);
        return Promise.resolve("Livro adicionado ao carrinho");
      } catch (e) {
        console.error(e);
        return Promise.reject(e);
      }
    },
  },
});
