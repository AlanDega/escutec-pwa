<template>
  <v-row class="fill-height" justify="center" align="center">
    <v-card width="700">
      <v-toolbar color="deep-purple accent-3">
        <v-row class="fill-height" align="center" justify="space-between">
          <h2 class="ml-2" id="registrate">Ingresa</h2>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-img class="ml-12" contain height="50" width="50" src="../../assets/escutek-logo.svg"></v-img>
        </v-row>
      </v-toolbar>
      <v-container class="pl-12 pr-12">
        <!-- <v-text-field color="deep-purple accent-3" label="Nombre" v-model="name"></v-text-field> -->
        <v-text-field color="deep-purple accent-3" label="Email" v-model="email"></v-text-field>
        <v-text-field color="deep-purple accent-3" label="contraseña" v-model="password"></v-text-field>
  
        <v-row class="mt-8" justify="center">
          <v-btn rounded dark color="deep-purple accent-3" @click="login">Continuar</v-btn>
        </v-row>
        <v-row justify="center" class="mt-2">
          <v-btn text color="deep-purple accent-3" @click="$router.push('/sign-up')">
          No tienes una cuenta? registrate
          </v-btn>
        </v-row>
      </v-container>
    </v-card>
  </v-row>
</template>

<script>
import { db } from "../../db";
import firebase from "firebase";
export default {
  data() {
    return {
      name: null,
      email: null,
      password: null
    };
  },
  methods: {
    login() {

      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .catch(function(error) {
          console.log(error);
        })
        .then(() => {
          console.log("exito");
          this.$router.push("/classroom");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
#registrate {
  color: white;
}
</style>
