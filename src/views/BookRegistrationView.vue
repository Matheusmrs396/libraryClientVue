<script>
import { mapState, mapStores, mapActions } from "pinia";
import { useProductStore } from "@/stores/product";
import { useCategoryStore } from "@/stores/category";
import { RouterLink } from "vue-router";

export default {
  components:{RouterLink},
  data() {
    return {
      currentProduct: {
        categoryId: "",
        id: "",
        name: "",
        image:"",
        price: "",
        category: {},
      },
      editing: false,
    };
  },
  computed: {
    ...mapStores(useProductStore),
    ...mapState(useProductStore, ["products"]),
    ...mapState(useCategoryStore, ["categories"]),
  },
  methods: {
    ...mapActions(useProductStore, [
      "getAllProducts",
      "saveProduct",
      "deleteProduct",
    ]),
    ...mapActions(useCategoryStore, ["getAllCategories"]),
    async save() {
      try {
        const msg = await this.saveProduct(this.currentProduct);
        alert(msg);
        this.editing = false;
        this.currentProduct = {};
      } catch (e) {
        alert("Ooops! Algo de errado!");
      }
    },
    async deleteItem(product_id) {
      try {
        await this.deleteProduct(product_id);
        alert("Item excluído com sucesso.");
      } catch (e) {
        alert(e);
      }
    },
    prepareToUpdate(product) {
      Object.assign(this.currentProduct, product);
      this.editing = true;
    },
  },
  async mounted() {
    try {
      await this.getAllCategories();
      await this.getAllProducts();
    } catch (e) {
      alert(e);
    }
  },
};
</script>
<template>
  <div class="title">
    <h4>Cadastro de Livros</h4>
  </div>
  <div class="product-form">
    <input type="text" v-model="currentProduct.name" />
    <select v-model="currentProduct.categoryId">
      <option
        v-for="category in categories"
        :value="category.id"
        :key="category.id"
      >
        {{ category.description }}
      </option>
    </select>
    <input type="text" v-model="currentProduct.price" />
    <input type="text" v-model="currentProduct.image" />
    <button @click="save">
      {{ editing ? "Salvar" : "Adicionar" }}
    </button>
  </div>
  <div class="product-list">
    <table class="table">
      <thead>
        <tr>
          <th class="text-left">
            <span> <h5>ID</h5> </span>
          </th>
          <th class="text-left">
            <span> <h5>Descrição</h5> </span>
          </th>
          <th class="text-left">
            <span> <h5>Categoria</h5> </span>
          </th>
          <th class="text-left">
            <span> <h5>Preço</h5> </span>
          </th>
          <th class="text-left">
            <span> <h5>Imagem</h5> </span>
          </th>
          <th class="text-left">
            <span> <h5>Ações</h5> </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product of products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.category.description }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.image }}</td>
          <td>
            <button @click="prepareToUpdate(product)">Update</button>
            <button @click="deleteItem(product.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.product-form input {
  width: 40%;
  height: 40px;
  border-radius: 20px;
  border: 1px solid gray;
  padding-left: 20px;
  font-size: 1.2em;
}
.product-form select {
  width: 30%;
  height: 40px;
  border-radius: 20px;
  border: 1px solid gray;
  padding-left: 20px;
  font-size: 1.2em;
  margin-left: 1%;
}
.product-form button {
  height: 35px;
  width: 20%;
  margin-left: 2%;
  background-color: rgb(63, 63, 125);
  color: whitesmoke;
  font-size: 1.2em;
  border-radius: 20px;
  border: 0;
}
.product-list,
.product-form {
  margin: 3% auto;
  width: 70%;
  display: flex;
  justify-content: space-between;
}
table {
  /* display: table; */
  border-collapse: separate;
  border-spacing: 2px;
  border-color: gray;
  width: 100%;
}
th {
  border-bottom: 2px solid #444;
  text-align: left;
}
td {
  padding: 10px;
}
thead tr {
  background-color: #444;
  color: whitesmoke;
}
tbody tr:nth-child(odd) {
  background-color: #c3c3c3;
}
</style>