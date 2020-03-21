<template>
  <div>
    <v-tabs centered>
      <v-tab @click="renderFirstTab">Primaria</v-tab>
      <v-tab @click="renderSecondTab">Secundaria</v-tab>
      <v-tab @click="renderThirdTab">Preparatoria</v-tab>
      <v-tab-item>
        <v-container>
          <v-card class="mx-auto" max-width="900">
            <v-toolbar color="deep-purple accent-3" dark>
              <v-row justify="center" class="mt-6">
                <h1 class="dialog-3">Profesores</h1>
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
                        <v-icon color="deep-purple accent-3">mdi-plus</v-icon>
                      </v-btn>
                    </v-fab-transition>
                  </template>

                  <v-card>
                    <v-card-title class="headline grey lighten-2" primary-title
                      >Crear Profesor</v-card-title
                    >
                    <v-container>
                      <v-card-text>
                        <v-text-field
                          color="deep-purple accent-3"
                          label="Nombre completo"
                          v-model="prof_name"
                        ></v-text-field>
                        <v-text-field
                          color="deep-purple accent-3"
                          label="Email"
                          v-model="prof_email"
                        ></v-text-field>
                        <v-text-field
                          color="deep-purple accent-3"
                          label="Contraseña"
                          v-model="prof_password"
                        ></v-text-field>
                        <v-text-field
                          color="deep-purple accent-3"
                          label="Confirmar contraseña"
                          v-model="prof_confirm_password"
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
                        @click="createProfessor"
                        >guardar</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </template>
            </v-toolbar>

            <v-container>
              <v-row justify="center" align="center">
                <v-col cols="4" align="center">
                  <v-card
                    v-for="(prof, i) in professors"
                    :key="i"
                    class="display-1 mt-6"
                    @click="goToGroup(prof.prof_name)"
                  >
                    <h1 class="group-text">{{ prof.prof_name }}</h1>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-container>
      </v-tab-item>
      <v-tab-item>
        <h1>secundaria</h1>
      </v-tab-item>
      <v-tab-item>
        <h1>preparatoria</h1>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import firebase from "firebase";
import { db } from "../../db";

export default {
  data() {
    return {
      school_name: "stj",
      items: [
        "Matemáticas",
        "Inglés",
        "Francés",
        "Informática",
        "Educación Física",
        "Español",
        "Civismo",
        "Biología",
        "Dibujo",
        "economia",
        "ingenieria"
      ],
      value: null,
      dialog: null,
      prof_name: null,
      prof_email: null,
      prof_password: null,
      prof_confirmed_password: null,
      first_level: null,
      second_level: null,
      third_level: null,
      level_selected: "primaria",
      prof_name: null,
      tabs: null,
      professors: []
    };
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user.email;
        db.collection(
          this.school_name + "-" + this.level_selected + "-professors"
        )
          .get()
          .then(querySnapshot => {
            const documents = querySnapshot.docs.map(doc => doc.data());
            console.log("documents", documents);
            this.professors = documents;
          });
      }
    });
  },
  methods: {
    renderFirstTab() {
      this.first_level = true;
      this.second_level = false;
      this.third_level = false;
    },
    renderSecondTab() {
      this.first_level = false;
      this.second_level = true;
      this.third_level = false;
    },
    renderThirdTab() {
      this.first_level = false;
      this.second_level = false;
      this.third_level = true;
    },
    createProfessor() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.prof_email, this.prof_password)
        .then(() => {
          db.collection(
            this.school_name + "-" + this.level_selected + "-professors"
          )
            .doc(this.prof_name)
            .set({
              level: this.level_selected,
              prof_name: this.prof_name,
              prof_email: this.prof_email,
              prof_password: this.prof_password,
              subjects: this.value,
              headers: [
                {
                  text: "Hora",
                  align: "start",
                  sortable: false,
                  value: "hora"
                },
                { text: "Lunes", value: "lunes" },
                { text: "Martes", value: "martes" },
                { text: "Miercoles", value: "miercoles" },
                { text: "Jueves", value: "jueves" },
                { text: "Viernes", value: "viernes" }
              ],
              schedule: [
                {
                  index: 0,
                  hora: "00:00 a 00:00",
                  lunes: "grupo",
                  martes: "grupo",
                  miercoles: "grupo",
                  jueves: "grupo",
                  viernes: "grupo"
                },
                {
                  index: 1,
                  hora: "00:00 a 00:00",
                  lunes: "grupo",
                  martes: "grupo",
                  miercoles: "grupo",
                  jueves: "grupo",
                  viernes: "grupo"
                },
                {
                  index: 2,
                  hora: "00:00 a 00:00",
                  lunes: "grupo",
                  martes: "grupo",
                  miercoles: "grupo",
                  jueves: "grupo",
                  viernes: "grupo"
                },
                {
                  index: 3,
                  hora: "00:00 a 00:00",
                  lunes: "grupo",
                  martes: "grupo",
                  miercoles: "grupo",
                  jueves: "grupo",
                  viernes: "grupo"
                },
                {
                  index: 4,
                  hora: "00:00 a 00:00",
                  lunes: "grupo",
                  martes: "grupo",
                  miercoles: "grupo",
                  jueves: "grupo",
                  viernes: "grupo"
                },
                {
                  index: 5,
                  hora: "00:00 a 00:00",
                  lunes: "grupo",
                  martes: "grupo",
                  miercoles: "grupo",
                  jueves: "grupo",
                  viernes: "grupo"
                },
                {
                  index: 6,
                  hora: "00:00 a 00:00",
                  lunes: "grupo",
                  martes: "grupo",
                  miercoles: "grupo",
                  jueves: "grupo",
                  viernes: "grupo"
                },
                {
                  index: 7,
                  hora: "00:00 a 00:00",
                  lunes: "grupo",
                  martes: "grupo",
                  miercoles: "grupo",
                  jueves: "grupo",
                  viernes: "grupo"
                }
              ]
            })
            .then(() => {
              console.log("prof created");
              db.collection("usuarios")
                .doc(this.prof_email)
                .set({
                  name: this.prof_name,
                  level: this.level_selected,
                  tipo_usuario: "prof"
                })
                .then(() => {
                  db.collection(
                    this.school_name + "-" + this.level_selected + "-professors"
                  )
                    .get()
                    .then(querySnapshot => {
                      this.dialog = false;
                      const documents = querySnapshot.docs.map(doc =>
                        doc.data()
                      );
                      console.log("documents", documents);
                      this.professors = documents;
                    });
                });
            });
        });
    },
    goToGroup(prof) {
      this.$router.push({ name: "professor", params: { id: prof } });
    }
  }
};
</script>

<style lang="scss" scoped>
.group-text {
  color: #6200ff;
  padding: 50px 0px;
  // background: #323241;
}
</style>
