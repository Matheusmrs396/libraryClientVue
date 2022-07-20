<script>
import { mapState, mapStores, mapActions } from "pinia";
import { useUserStore } from "@/stores/user";
export default{
  data(){
    return{
      form:{
        email: "",
        password: ""
      }
    }
  },
  computed: {
        ...mapStores(useUserStore),
    ...mapState(useUserStore, ["users"]),
  },
  methods: {
     ...mapActions(useUserStore, ["getUser"]),

    async mounted() {
    try {
      await this.getUser();
    } catch (e) {
      alert(e);
    }
  },
  }
}

</script>

<template>
  <div class="main">
    <div class="login">
      <q-input class="input" standout v-model="form.email" type="email" prefix="Email:">
        <template v-slot:prepend>
          <q-icon name="mail" />
        </template>
      </q-input>
      <q-input class="input"  standout v-model="form.password" type="password" prefix="Senha:">
        <template v-slot:prepend>
          <q-icon name="lock" />
        </template>
      </q-input>
      <q-btn  class="btn" to="/" color="blue" icon="login" label="Login"></q-btn>
    </div>  
  </div>
</template>

<style scoped>
.login{
    width: 50%;
    background-color: #F2F2F2;
    height: 95vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
   box-shadow: 0 0 1em black;
}

.input{
    margin: 1%;
    border-radius: 5px;
    width: 50%;
}

.btn{
    border-radius: 5px;
    padding: 0;
    margin: 3%;
    width: 50%;
}
.main{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
}
</style>
