<template>
  <v-row class="fill-height" justify="center" align="center">
    <v-card width="700">
      <v-toolbar color="deep-purple accent-3">
        <v-row class="fill-height" align="center" justify="space-between">
          <h2 class="ml-2" id="registrate">Registrate</h2>
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
        <v-text-field color="deep-purple accent-3" label="Nombre" v-model="name"></v-text-field>
        <v-text-field color="deep-purple accent-3" label="Email" v-model="email"></v-text-field>
        <v-text-field color="deep-purple accent-3" label="contraseña" v-model="password"></v-text-field>
        <v-text-field
          color="deep-purple accent-3"
          label="confirmar contraseña"
          v-model="confirmed_password"
        ></v-text-field>
        <v-row class="mt-8" justify="center">
          <v-btn rounded dark color="deep-purple accent-3" @click="signUp">Continuar</v-btn>
        </v-row>
        <v-row justify="center" class="mt-2">
          <v-btn text color="deep-purple accent-3" @click="$router.push('/login')">
            Ya tienes una cuenta? Inicia sesión
          </v-btn>
        </v-row>
      </v-container>
    </v-card>
  </v-row>
</template>

<script>
import { CometChat } from "@cometchat-pro/chat";
import firebase from "firebase";
import { db } from "../../db";
export default {
  data() {
    return {
      // scholar_level:null,
      // levels:['primaria','secundaria','preparatoria','universidad'],
      email: null,
      password: null,
      confirmed_password: null,
      name: null
    };
  },
  methods: {
    signUp() {
      let apiKey = "18c65689b07dd23fda1f795a8e5ef63038d2d36b";
      var uid = this.name;
      var name = this.name;

      var user = new CometChat.User(uid);

      user.setName(name);

      CometChat.createUser(user, apiKey).then(
        user => {
          console.log("user created", user);
        },
        error => {
          console.log("error", error);
        }
      );
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          db.collection("usuarios")
            .doc(this.email)
            .set({
              name: this.name,
              email: this.email,
              password: this.email
              // scholar_level: this.scholar_level
            });
          this.$router.push("/");
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