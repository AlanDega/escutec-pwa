<template>
  <div class="home">
    <v-app-bar color="white" >
      <v-img contain height="50" width="50" src="../assets/escutek-logo.svg"> </v-img>
      <v-spacer></v-spacer>
      <v-btn text color="deep-purple accent-3" class="mr-4">Ingresa</v-btn>
      <v-btn color="deep-purple accent-3" rounded dark>Registrate</v-btn>
    </v-app-bar>
    <v-row class="fill-height">
      <v-col cols="5">
        <v-row class="fill-height" align="center" justify="center">
          <h1>Digitaliza tú escuela</h1>

        </v-row>
       
      </v-col>
      <v-col cols="6">
                <v-img
          class="landing-img"
          src="https://res.cloudinary.com/dalnnaod7/image/upload/v1586716832/landing-img_kiwue0.jpg"
        ></v-img>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  created() {
    firebase.auth().onAuthStateChanged(user => {
      console.log("user", user);
    });
  }
};
</script>

<style scoped>
.landing-img {
  height: 100%;
  width: 100%;
}
</style>
