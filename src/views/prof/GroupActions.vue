<template>
  <v-card id="lateral">
    <v-card-title>{{ this.$route.params.id }}</v-card-title>
    <!-- <v-spacer></v-spacer> -->
    <v-tabs color="deep-purple accent-3" centered>
      <v-tab>Alumnos</v-tab>
      <v-tab>Recursos</v-tab>
      <v-tab>Tareas</v-tab>
      <v-tab>Examenes</v-tab>
      <v-tab>Calificaciones</v-tab>

      <v-tab-item>
        <v-card height="70vh" flat>
          <v-row justify="center">
            <v-col>
              <v-list>
                <v-row justify="center">
                  <v-list-item
                    v-for="(student, index) in students"
                    :key="index"
                  >
                    <v-list-content>
                      <v-list-title>{{ student.alias }}</v-list-title>
                    </v-list-content>
                  </v-list-item>
                </v-row>
              </v-list>
            </v-col>
          </v-row>
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on }">
              <v-fab-transition>
                <v-btn
                  key="mdi-"
                  color="deep-purple accent-3"
                  fab
                  large
                  dark
                  v-on="on"
                  bottom
                  left
                  class="v-btn--example"
                >
                  <v-icon>{{ activeFab.icon }}</v-icon>
                </v-btn>
              </v-fab-transition>
            </template>

            <v-card>
              <v-card-title class="headline grey lighten-2" primary-title
                >Crear Alumno</v-card-title
              >
              <v-container>
                <v-card-text>
                  <v-text-field
                    color="deep-purple accent-3"
                    label="Alias"
                    v-model="student_alias"
                  ></v-text-field>
                  <v-text-field
                    color="deep-purple accent-3"
                    label="email"
                    v-model="student_email"
                  ></v-text-field>
                </v-card-text>
              </v-container>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="deep-purple accent-3" text @click="createStudent"
                  >guardar</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card>
      </v-tab-item>
      <v-tab-item> </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
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
      student_name: null,
      student_email: null,
      student_xp: 0,
      // tokens are lvl2
      student_tokens: 0,
      dialog: false,
      fab: false,
      hidden: false,
      tabs: null
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
    db.collection(this.classroom + "-students")
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
      db.collection(this.classroom + "-students")
        .doc(this.student_alias)
        .set({
          alias: this.student_alias,
          email: this.student_email,
          xp: this.student_xp
        })
        .then(() => {
          console.log("exito");
          this.student_alias = '',
          this.student_email = '',
          db.collection(this.classroom + "-students")
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
