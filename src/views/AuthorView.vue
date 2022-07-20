<script>
import ListAuthor from "../components/author/ListAuthor.vue";
import FormAuthor from "../components/author/FormAuthor.vue";

export default {
  components: { ListAuthor, FormAuthor },
  data() {
    return {
      currentAuthor: {
        id: "",
        name: "",
      },
    };
  },

  methods: {
    prepareToUpdate(author) {
      Object.assign(this.currentAuthor, author);
    },
  },
};
</script>
<template>
  <div class="title">
    <h4>Cadastro de Autores</h4>
  </div>
  <FormAuthor :currentAuthor="currentAuthor" />
  <ListAuthor @edit="prepareToUpdate" />
</template>

<style scoped></style>
