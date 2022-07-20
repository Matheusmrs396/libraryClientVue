import { defineStore } from "pinia";
import axios from "axios";
export const useUserStore = defineStore({
    id: "user",
    state: () => ({
      users: [],
    }),
    actions: {
      async getUser() {
        try {
          const { data } = await axios.get(
            "http://localhost:4000/user"
          );
          this.users = data;
          return Promise.resolve();
        } catch (e) {
          console.error(e);
          if (e.response.status === 404)
            return Promise.reject(e.response.statusText);
          return Promise.reject("Erro desconhecido ao consultar 'Product'");
        }
      },
    }
    })