<template>
  <div>
    <v-tabs color="deep-purple accent-3" centered>
      <v-tab>Alumnos</v-tab>
      <v-tab>Recursos</v-tab>
      <v-tab>Trivias</v-tab>
      <v-tab>Tareas</v-tab>
      <v-tab>Retos</v-tab>
      <v-tab>Examenes</v-tab>
      <v-tab>Calificaciones</v-tab>

      <v-tab-item>
        <v-row justify="center">
          <v-card width="900">
            <v-data-table
              :headers="student_headers"
              :items="students"
              :items-per-page="12"
              class="elevation-1"
            ></v-data-table>
          </v-card>
        </v-row>
      </v-tab-item>
      <v-tab-item>
        <v-row justify="center">
          <v-card width="900">
            <v-toolbar color="white" flat height="10">
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
                      <v-btn
                        color="deep-purple accent-3"
                        text
                        @click="createGroup"
                        >guardar</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </template>
            </v-toolbar>
          </v-card>
        </v-row>
      </v-tab-item>
      <v-tab-item>
        <v-row justify="center">
          <v-card width="900">
            <v-toolbar color="white" flat>
              <v-row justify="center" class="mt-6">
                <v-icon height="100" width="100"
                  >mdi-gamepad-circle-left</v-icon
                >
              </v-row>
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
                        <v-icon color="deep-purple accent-3"> mdi-plus </v-icon>
                      </v-btn>
                    </v-fab-transition>
                  </template>

                  <v-card>
                    <v-card-title class="headline grey lighten-2" primary-title
                      >Crear Trivia</v-card-title
                    >
                    <v-container>
                      <v-card-text>
                        <v-text-field
                          label="pregunta"
                          v-model="question"
                        ></v-text-field>
                        <v-text-field
                          label="respuesta1"
                          v-model="answer1"
                        ></v-text-field>
                        <v-text-field
                          label="respuesta2"
                          v-model="answer2"
                        ></v-text-field>
                        <v-text-field
                          label="respuesta3"
                          v-model="answer3"
                        ></v-text-field>
                        <v-text-field
                          label="respuesta4"
                          v-model="answer4"
                        ></v-text-field>
                        <v-text-field
                          label="respuesta correcta"
                          v-model="right_answer"
                        ></v-text-field>
                      </v-card-text>
                    </v-container>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="deep-purple accent-3"
                        text
                        @click="createTrivia"
                        >guardar</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </template>
            </v-toolbar>
            <v-row justify="center">
              <v-col>
                <v-row justify="center">
                  <v-card
                    v-for="(trivia, index) in trivias"
                    :key="index"
                    color="deep-purple accent-3"
                    dark
                  >
                    {{ trivia.question }}
                  </v-card>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-row>
      </v-tab-item>
    </v-tabs>
    <v-row justify="center"> </v-row>
  </div>
</template>

<script>
import firebase from "firebase";
import { db } from "../../db";

export default {
  data() {
    return {
      trivias: [],
      user: null,
      question: null,
      answer1: null,
      answer2: null,
      answer3: null,
      answer4: null,
      right_answer: null,
      // tokens are lvl2
      student_tokens: 0,
      dialog: false,
      fab: false,
      hidden: false,
      tabs: null,
      student_headers: [],
      students: [],
      img_resources: null,
      img_title: null,
      img_url: null,
      video_resources: null,
      video_title: null,
      video_url: null,
      text_resources: null,
      text_title: null,
      text_url: null,
      classroom: this.$route.params.id,
      school_name: "stj",
      student_name: null,
      student_email: null,
      student_password: null,
      student_confirm_password: null,
      student_xp: 0,
      // tokens are lvl2? yes
      level: "primaria"
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
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user.email;
        db.collection(user.email)
          .get()
          .then(querySnapshot => {
            const documents = querySnapshot.docs.map(doc => doc.data());
            console.log("documentsTrivia", documents);
            this.trivias = documents;
          });
      }
    });
    db.collection(this.school_name + "-" + this.level + "-groups")
      .doc(this.classroom)
      .get()
      .then(snapshot => {
        const document = snapshot.data();
        this.student_headers = document.student_headers;
        db.collection(this.school_name + "-" + this.classroom + "-students")
          .get()
          .then(querySnapshot => {
            const documents = querySnapshot.docs.map(doc => {
              this.students.push(doc.data());
            });
            console.log("student-docs", documents);
          });
      });
  },

  methods: {
    createTrivia() {
      db.collection(this.user)
        .doc(this.question)
        .set({
          question: this.question,
          answer1: this.answer1,
          answer2: this.answer2,
          answer3: this.answer3,
          answer4: this.answer4,
          right_answer: this.right_answer,
          selected: null
        })
        .then(() => {
          console.log("exitoTrivia");
          db.collection(this.user)
            .get()
            .then(querySnapshot => {
              this.dialog = false;
              const documents = querySnapshot.docs.map(doc => doc.data());
              console.log("documents", documents);
              this.trivias = documents;
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
