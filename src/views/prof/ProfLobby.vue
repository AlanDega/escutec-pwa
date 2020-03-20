<template>
  <v-container>
    <v-card>
      <table style="width:100%">
        <tr>
          <th v-for="header in headers" :key="header.id">{{ header.text }}</th>
        </tr>
        <v-divider color="primary"></v-divider>

        <tr v-for="grupo in grupos" :key="grupo.id">
          <td>{{ grupo.hora }}</td>
          <td @click="log(grupo.lunes)">{{ grupo.lunes }}</td>
          <td>{{ grupo.martes }}</td>
          <td>{{ grupo.miercoles }}</td>
          <td>{{ grupo.jueves }}</td>
          <td>{{ grupo.viernes }}</td>
        </tr>
      </table>
    </v-card>
  </v-container>
</template>

<script>
import firebase from "firebase";
import { db } from "../../db";

export default {
  data() {
    return {
      school_name: "stj",
      level: null,
      grupos: [],
      headers: [],
      subjects: [],
      prof_name: null
    };
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("user", user.email);
        db.collection("usuarios")
          .doc(user.email)
          .get()
          .then(snapshot => {
            const document = snapshot.data();
            this.level = document.level;
            this.prof_name = document.prof_name;
            console.log();
            db.collection(this.school_name + "-" + this.level + "-professors")
              .doc(document.name)
              .get()
              .then(snapshot => {
                const document = snapshot.data();
                console.log("prof-doc", document);
                this.grupos = document.schedule;
                this.headers = document.headers;
                this.subjects = document.subjects;
              });
          });
      }
    });
  },
  methods: {
    log(grupo) {
      console.log(grupo);
      this.$router.push({ name: "classroom-prof", params: { id: grupo } });
    }
  }
};
</script>

<style lang="scss" scoped></style>
