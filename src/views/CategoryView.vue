<script>
import ListCategory from "../components/category/ListCategory.vue";
import FormCategory from "../components/category/FormCategory.vue";

export default {
  components: { ListCategory, FormCategory },
  data() {
    return {
      currentCategory: {
        id: "",
        description: "",
      },
    };
  },

  methods: {
    prepareToUpdate(category) {
      Object.assign(this.currentCategory, category);
    },
  },
};
</script>
<template>
<div class="title">
  <h4>Cadastro de Categorias</h4>
</div> 
  <FormCategory :currentCategory="currentCategory" />
  <ListCategory @edit="prepareToUpdate" />
</template>

<style scoped></style>
