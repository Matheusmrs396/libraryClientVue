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
        id: "",
        name: "",
        categoryId: "",
        publisherId: "",
        authorId: "",
        price:"",
        image:"",
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
  <div class="top">
    <h4>Livros Cadastrados</h4>
     <q-input filled type="search" placeholder="Pesquisa">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
  </div>
 <br>
  <div class="main">
    <q-card class="my-card justify" style="width: 30vw; height: 35vh; margin: 1%;" v-for="product of products" :key="product.id">
          <q-card-section horizontal>
            <q-img
              class="col-5"
              src="https://cdn.quasar.dev/img/parallax1.jpg"
            />

            <q-card-section>
            <tr> Nome: {{ product.name }}</tr>
            <tr> Preço: {{ product.price }} </tr>
            <tr>Categoria: {{ product.category.description }}</tr>
            <tr>Autor: {{ product.author.name }}</tr>
            <tr>Editora: {{ product.publisher.name }}</tr>
            </q-card-section>
          </q-card-section>

          <q-separator />

          <q-card-actions>
            <q-btn to="/carrinho" color="blue" icon="add_shopping_cart" label="Adicionar ao carrinho"></q-btn>
          </q-card-actions>
    </q-card>
  </div>
</template>

<style scoped>
.main{
  display: flex;
  flex-wrap: wrap;
}
.top{
  margin: 1%;
  display: flex;
  justify-content: space-between ;
}
</style>
