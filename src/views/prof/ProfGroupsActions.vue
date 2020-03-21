<template>
  <v-container>
    <v-row justify="center">
      <v-card max-width="1200px" height="800">
        <!-- <v-card-title>{{ this.$route.params.id }}</v-card-title> -->
        <!-- <v-spacer></v-spacer> -->
        <v-toolbar color="deep-purple accent-3">
          <template v-slot:extension>
            <v-dialog v-model="dialog" width="500">
              <template v-slot:activator="{ on }">
                <v-fab-transition>
                  <v-btn
                    color="white"
                    fab
                    large
                    dark
                    v-on="on"
                    absolute
                    bottom
                    right
                  >
                    <v-icon color="deep-purple accent-3">mdi-plus</v-icon>
                  </v-btn>
                </v-fab-transition>
              </template>

              <v-card>
                <v-card-title class="headline grey lighten-2" primary-title
                  >Crear Grupo</v-card-title
                >
                <v-container>
                  <v-card-text>
                    <v-text-field
                      color="deep-purple accent-3"
                      label="Nombre del grupo"
                      v-model="group_name"
                    ></v-text-field>
                    <v-select
                      color="deep-purple accent-3"
                      v-model="value"
                      :items="items"
                      chips
                      label="Materias"
                      multiple
                      outlined
                    ></v-select>
                  </v-card-text>
                </v-container>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="deep-purple accent-3" text @click="createGroup"
                    >guardar</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
          <v-tabs color="white" centered>
            <v-tab>Alumnos</v-tab>
            <v-tab>Recursos</v-tab>
            <v-tab>Tareas</v-tab>
            <v-tab>Examenes</v-tab>
            <v-tab>Calificaciones</v-tab>

            <v-tab-item>
              <v-data-table
                :headers="headers"
                :items="students"
                :items-per-page="12"
                class="elevation-1"
              ></v-data-table>
            </v-tab-item>
            <v-tab-item></v-tab-item>
          </v-tabs>
        </v-toolbar>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "firebase";
import { db } from "../../db";

export default {
  data() {
    return {
      img_resources: null,
      img_title: null,
      img_url: null,
      video_resources: null,
      video_title: null,
      video_url: null,
      text_resources: null,
      text_title: null,
      text_url: null,
      classroom: null,
      students: [],
      school_name: "stj",
      student_name: null,
      student_email: null,
      student_password: null,
      student_confirm_password: null,
      student_xp: 0,
      // tokens are lvl2? yes
      student_tokens: 0,
      dialog: false,
      fab: false,
      hidden: false,
      tabs: null,
      level: "primaria"
      // headers: [
      //   {
      //     text: "",
      //     align: "start",
      //     sortable: false,
      //     value: "name"
      //   },
      //   { text: "name", value: "name" },
      //   { text: "points", value: "points" },
      //   { text: "Carbs (g)", value: "carbs" },
      //   { text: "Protein (g)", value: "protein" },
      //   { text: "Iron (%)", value: "iron" }
      // ],
      // alumnos:[
      //   {
      //     name:
      //   }
      // ]
    };
  },

  computed: {
    activeFab() {
      switch (this.tabs) {
        case "one":
          return { color: "success", icon: "share" };
        case "two":
          return { color: "red", icon: "edit" };
        case "three":
          return { color: "green", icon: "keyboard_arrow_up" };
        default:
          return {};
      }
    }
  },
  created() {
    this.classroom = this.$route.params.id;
    db.collection(this.school_name + "-" + this.classroom + "-students")
      .get()
      .then(querySnapshot => {
        const documents = querySnapshot.docs.map(doc => doc.data());
        console.log("documents", documents);
        this.students = documents;
      });
  },
  mounted() {},

  methods: {
    createStudent() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.student_email,
          this.student_password
        );
      db.collection(this.school_name + "-" + this.classroom + "-students")
        .doc(this.student_email)
        .set({
          level: this.level,
          group: this.$route.params.id,
          alias: this.student_alias,
          email: this.student_email,
          student_password: this.student_password,
          xp: this.student_xp
        })
        .then(() => {
          db.collection("usuarios")
            .doc(this.student_email)
            .set({
              alias: this.student_alias,
              tipo_usuario: "student",
              level: this.level,
              group: this.$route.params.id
            });
          console.log("exito");
          (this.student_alias = ""),
            (this.student_email = ""),
            db
              .collection(this.school_name + "-" + this.classroom + "-students")
              .get()
              .then(querySnapshot => {
                this.dialog = false;
                const documents = querySnapshot.docs.map(doc => doc.data());
                console.log("documents", documents);
                this.students = documents;
              });
        });
    }
  }
};
</script>

<style>
/* This is for documentation purposes and will not be needed in your application */
#lateral .v-btn--example {
  bottom: 0;
  position: absolute;
  margin: 0 0 16px 16px;
}
</style>
