<template>
  <div>
    <div v-if="tipo_usuario = 'prof'">
      <ClassroomProf />
    </div>
    <div v-if="tipo_usuario = 'student'">
      <ClassroomStudent />
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import { db } from '../db'

import ClassroomProf from "../components/prof/ClassroomProf";
import ClassroomStudent from "../components/student/ClassroomStudent";

export default {
  components: {
    ClassroomProf,
    ClassroomStudent
  },
  data() {
    return {
      tipo_usuario:null

    };
  },
  created() {
    console.log("route", this.$route);
    firebase
      .auth()
      .onAuthStateChanged(user => {
        if (user) {
          console.log(user.email);
          this.user_email = user.email;
        }
      })
      .then(() => {
        db.collection("usuarios")
          .where("email", "==", this.user_email)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              console.log(doc.data());
              this.prof = doc.data().prof;
              this.tipo_usuario = doc.data().tipo_usuario;
            });
          })
          .catch(function(error) {
            console.log("Error getting documents: ", error);
          });
      });
  }
};
</script>

<style lang="scss" scoped></style>
