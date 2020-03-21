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
          <td @click="log(grupo.prof)">
            {{ grupo.lunes + "-" + grupo.prof }}
          </td>
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
      prof_name: null,
      group: null
    };
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("hay user", user);
        db.collection("usuarios")
          .doc(user.email)
          .get()
          .then(snapshot => {
            const document = snapshot.data();
            this.level = document.level;
            console.log("level", this.level);
            this.group = document.group;
            console.log();
            db.collection(this.school_name + "-" + this.level + "-groups")
              .doc(this.group)
              .get()
              .then(snapshot => {
                const document = snapshot.data();
                console.log("prof-doc", document);
                this.grupos = document.schedule;
                this.headers = document.headers;
              });
          });
      }
    });
  },
  methods: {
    log(grupo) {
      console.log("grupo", grupo);
      const twitchGroup = grupo.replace(" ", "_");
      this.$router.push({
        name: "classroom-student",
        params: { id: twitchGroup }
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
