<script>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
     <q-toolbar inset>
          <q-breadcrumbs active-color="white" style="font-size: 16px">
            <q-breadcrumbs-el label="Home" to="/" icon="home" />
            <q-breadcrumbs-el label="Livros" to="/produtos" icon="menu_book" />
            <q-breadcrumbs-el label="Carrinho de compras" to="/carrinho" icon="shopping_cart" />
          </q-breadcrumbs>
      </q-toolbar>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style>
@import "@/assets/base.css";

#app {
  height: 100vh;
}

header {
  width: 100vw;
  height: 10%;
  background-color: black;
  color: whitesmoke;
  font-size: 1em;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

main {
  height: 80%;
  padding: 0;
}
.title{
  display: flex;
  justify-content: center;
  margin: 1%;
}

</style>
