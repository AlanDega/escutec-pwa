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
                <h1 class="dialog-3">Grupos</h1>
              </v-row>
              <template v-slot:extension>
                <v-dialog v-model="dialog" width="500">
                  <template v-slot:activator="{ on }">
                    <v-fab-transition>
                      <v-btn color="white" fab large dark v-on="on" absolute bottom right>
                        <v-icon color="deep-purple accent-3">mdi-plus</v-icon>
                      </v-btn>
                    </v-fab-transition>
                  </template>

                  <v-card>
                    <v-card-title class="headline grey lighten-2" primary-title>Crear Grupo</v-card-title>
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
                      <v-btn color="deep-purple accent-3" text @click="createGroup">guardar</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </template>
            </v-toolbar>

            <v-container>
              <v-row justify="center" align="center">
                <v-col cols="4" align="center">
                  <v-card
                    v-for="(group, i) in groups"
                    :key="i"
                    class="display-1 mt-6"
                    @click="goToGroup(group.group_name)"
                  >
                    <h1 class="group-text">{{ group.group_name }}</h1>
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
      school_name: "stj",
      first_level: null,
      second_level: null,
      third_level: null,
      level_selected: "primaria",
      group_name: null,
      tabs: null,
      groups: []
    };
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user.email;
        db.collection(this.school_name + "-" + this.level_selected + "-groups")
          .get()
          .then(querySnapshot => {
            const documents = querySnapshot.docs.map(doc => doc.data());
            console.log("documents", documents);
            this.groups = documents;
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
    createGroup() {
      db.collection(this.school_name + "-" + this.level_selected + "-groups")
        .doc(this.group_name)
        .set({
          level: this.level_selected,
          group_name: this.group_name,
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
              lunes: "materia",
              martes: "materia",
              miercoles: "materia",
              jueves: "materia",
              viernes: "materia"
            },
            {
              index: 1,
              hora: "00:00 a 00:00",
              lunes: "materia",
              martes: "materia",
              miercoles: "materia",
              jueves: "materia",
              viernes: "materia"
            },
            {
              index: 2,
              hora: "00:00 a 00:00",
              lunes: "materia",
              martes: "materia",
              miercoles: "materia",
              jueves: "materia",
              viernes: "materia"
            },
            {
              index: 3,
              hora: "00:00 a 00:00",
              lunes: "materia",
              martes: "materia",
              miercoles: "materia",
              jueves: "materia",
              viernes: "materia"
            },
            {
              index: 4,
              hora: "00:00 a 00:00",
              lunes: "materia",
              martes: "materia",
              miercoles: "materia",
              jueves: "materia",
              viernes: "materia"
            },
            {
              index: 5,
              hora: "00:00 a 00:00",
              lunes: "materia",
              martes: "materia",
              miercoles: "materia",
              jueves: "materia",
              viernes: "materia"
            },
            {
              index: 6,
              hora: "00:00 a 00:00",
              lunes: "materia",
              martes: "materia",
              miercoles: "materia",
              jueves: "materia",
              viernes: "materia"
            },
            {
              index: 7,
              hora: "00:00 a 00:00",
              lunes: "materia",
              martes: "materia",
              miercoles: "materia",
              jueves: "materia",
              viernes: "materia"
            }
          ]
        })
        .then(() => {
          console.log("group created");
          db.collection(
            this.school_name + "-" + this.level_selected + "-groups"
          )
            .get()
            .then(querySnapshot => {
              this.dialog = false;
              const documents = querySnapshot.docs.map(doc => doc.data());
              console.log("documents", documents);
              this.groups = documents;
            });
        });
    },
    goToGroup(group) {
      this.$router.push({ name: "group", params: { id: group } });
    }
  }
};
</script>

<style lang="scss" scoped>
.group-text {
  color: #3300ff;
  padding: 50px 0px;
  background: #323241;
}
</style>
