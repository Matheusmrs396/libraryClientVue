<template>
  <div class="q-pa-md">
    <q-table
      class="my-sticky-header-table"
      title="Carrinho de Compras"
      :rows="carts"
      :columns="columns"
      row-key="name"
      flat
      bordered
    />
  </div>
</template>

<script>
import { mapState, mapStores, mapActions } from "pinia";
import { useProductStore } from "@/stores/product";
import { useCategoryStore } from "@/stores/category";
import { useAuthorStore } from "@/stores/author";
import { useCartStore } from "@/stores/cart";
import { usePublisherStore } from "@/stores/publisher";
export default {
  computed: {
    ...mapStores(useProductStore, useCartStore),
    ...mapState(useProductStore, ["products"]),
    ...mapState(useCategoryStore, ["categories"]),
    ...mapState(useAuthorStore, ["authors"]),
    ...mapState(usePublisherStore, ["publishers"]),
    ...mapState(useCartStore, ["carts"]),
  },
  methods: {
    ...mapActions(useProductStore, [
      "getAllProducts",
      "saveProduct",
      "deleteProduct",
    ]),
    ...mapActions(useCategoryStore, ["getAllCategories"]),
    ...mapActions(useAuthorStore, ["getAllAuthors"]),
    ...mapActions(usePublisherStore, ["getAllPublishers"]),
    ...mapActions(useCartStore, ["getAllCarts"]),
  },
  async mounted() {
    try {
      await this.getAllCategories();
      await this.getAllProducts();
      await this.getAllAuthors();
      await this.getAllPublishers();
      await this.getAllCarts();
    } catch (e) {
      alert(e);
    }
  },
  setup() {
    return {
      columns,
      rows: [],
    };
  },
};

const columns = [
  {
    name: "name",
    required: true,
    label: "Livro",
    align: "left",
    field: (row) => row.product.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "Categoria",
    align: "center",
    label: "Categoria",
    field: (row) => row.productId,
    sortable: true,
  },
  {
    name: "Autor",
    align: "center",
    label: "Categoria",
    field: (row) => row.product.category,
    sortable: true,
  },

];
</script>

<style>
.my-sticky-header-table {
  height: 63vh;
}
/* height or max-height is important */

.q-table__top,
.q-table__bottom,
thead tr:first-child th {
  color: aliceblue;
  background-color: black;
}
/* bg color is important for th; just specify one */

thead tr th {
  position: sticky;
  z-index: 1;
}
thead tr:first-child th {
  top: 0;
}

/* this is when the loading indicator appears */
.q-table--loading thead tr:last-child th {
  top: 48px;
}
/* height of all previous header rows */
</style>
