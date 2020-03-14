<template>
  <v-container>
    <h2>Registrate</h2>
    <v-text-field label="Nombre" v-model="name"></v-text-field>
    <v-text-field label="Email" v-model="email"></v-text-field>
    <v-text-field label="contraseña" v-model="password"></v-text-field>

    <v-btn rounded dark color="deep-purple accent-3" @click="signUp">Continuar</v-btn>
  </v-container>
</template>

<script>
import { CometChat } from '@cometchat-pro/chat'
import firebase from "firebase";
import { db } from "../../db";
export default {
  data() {
    return {
      email: null,
      password: null,
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
              email: this.email,
              password: this.email
            });
          this.$router.push("/");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>