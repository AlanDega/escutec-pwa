<template>
  <div>
    <v-row justify="center">
      <v-tabs centered color="deep-purple accent-3">
        <v-tab color="deep-purple accent-3" @click="renderFirstTab"
          >Primaria</v-tab
        >
        <v-tab @click="renderSecondTab">Secundaria</v-tab>
        <v-tab @click="renderThirdTab">Preparatoria</v-tab>

        <v-tab-item>
          <v-container>
            <v-card class="mx-auto" max-width="900">
              <v-row justify="center" class="mt-6"> </v-row>

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
    </v-row>
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
              prof: null,
              index: 0,
              hora: "00:00 a 00:00",
              lunes: "materia",
              martes: "materia",
              miercoles: "materia",
              jueves: "materia",
              viernes: "materia"
            },
            {
              prof: null,
              index: 1,
              hora: "00:00 a 00:00",
              lunes: "materia",
              martes: "materia",
              miercoles: "materia",
              jueves: "materia",
              viernes: "materia"
            },
            {
              prof: null,
              index: 2,
              hora: "00:00 a 00:00",
              lunes: "materia",
              martes: "materia",
              miercoles: "materia",
              jueves: "materia",
              viernes: "materia"
            },
            {
              prof: null,
              index: 3,
              hora: "00:00 a 00:00",
              lunes: "materia",
              martes: "materia",
              miercoles: "materia",
              jueves: "materia",
              viernes: "materia"
            },
            {
              prof: null,
              index: 4,
              hora: "00:00 a 00:00",
              lunes: "materia",
              martes: "materia",
              miercoles: "materia",
              jueves: "materia",
              viernes: "materia"
            },
            {
              prof: null,
              index: 5,
              hora: "00:00 a 00:00",
              lunes: "materia",
              martes: "materia",
              miercoles: "materia",
              jueves: "materia",
              viernes: "materia"
            },
            {
              prof: null,
              index: 6,
              hora: "00:00 a 00:00",
              lunes: "materia",
              martes: "materia",
              miercoles: "materia",
              jueves: "materia",
              viernes: "materia"
            },
            {
              prof: null,
              index: 7,
              hora: "00:00 a 00:00",
              lunes: "materia",
              martes: "materia",
              miercoles: "materia",
              jueves: "materia",
              viernes: "materia"
            }
          ],
          student_headers: [
            { text: "Alias", align: "center", sortable: false, value: "alias" },
            {
              text: "Email",
              align: "center",
              sortable: false,
              value: "email"
            },
            {
              text: "Contraseña",
              align: "center",
              sortable: false,
              value: "student_password"
            },
            {
              text: "Puntos",
              align: "center",
              sortable: false,
              value: "xp"
            },
            {
              text: "Rating",
              align: "center",
              sortable: false,
              value: "rating"
            }
          ],
          students: []
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
      this.$router.push({ name: "students-group", params: { id: group } });
    }
  }
};
</script>

<style lang="scss" scoped>
.group-text {
  color: white;
  background: #641fff;
  padding: 50px 0px;
  // background: #808081;
}
</style>
