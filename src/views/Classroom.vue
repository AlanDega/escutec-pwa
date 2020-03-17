<template>
  <div>
    <div v-if="tipo_usuario === 'prof'">
      <ClassroomProf />
    </div>
    <div v-if="tipo_usuario === 'student'">
      <ClassroomStudent />
    </div>
  
  </div>
</template>

<script>
import firebase from "firebase";
import { db } from "../db";

import ClassroomProf from "../components/prof/ClassroomProf";
import ClassroomStudent from "../components/student/ClassroomStudent";

export default {
  components: {
    ClassroomProf,
    ClassroomStudent
  },
  data() {
    return {
      tipo_usuario: null,
      user_email: ""
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        db.collection("usuarios")
          .doc(user.email)
          .get()
          .then(snapshot => {
            const document = snapshot.data();
            this.tipo_usuario = document.tipo_usuario;
            console.log(document);
            // do something with document
          });
      }
    });
  },
  mounted() {}
};
</script>

<style lang="scss" scoped></style>
