<template>
  <v-app class="app">
    <div>
      <v-app-bar dense fixed app color="white" flat dark absolute clipped-right>
        <div class="d-flex align-center">
          <h1>Escutec</h1>
        </div>

        <v-spacer></v-spacer>
        <v-icon color="deep-purple accent-3" @click="logout"
          >mdi-cog-outline</v-icon
        >
      </v-app-bar>
    </div>
    <div>
      <div v-if="this.$route.name != 'sign-up'">
        <div v-if="this.$route.name != 'login'">
          <v-navigation-drawer
            app
            permanent
            dark
            fixed
            color="deep-purple accent-3"
          >
            <div v-if="prof">
              <v-list nav>
                <v-list-item
                  v-for="item in items"
                  :key="item.title"
                  link
                  @click="goToComponent(item)"
                >
                  <v-list-item-icon>
                    <v-icon color>{{ item.icon }}</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </div>
            <div v-if="student">
              <v-list nav>
                <v-list-item
                  v-for="item in items2"
                  :key="item.title"
                  link
                  @click="goToComponent(item)"
                >
                  <v-list-item-icon>
                    <v-icon color>{{ item.icon }}</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </div>
            <div v-if="director">
              <v-list nav>
                <v-list-item
                  v-for="item in director_items"
                  :key="item.title"
                  link
                  @click="goToComponent(item)"
                >
                  <v-list-item-icon>
                    <v-icon color>{{ item.icon }}</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </div>
          </v-navigation-drawer>
        </div>
      </div>
    </div>

    <!-- <div
      v-if="this.$route.name === 'Classroom' && this.student"
    >
      <v-navigation-drawer right app permanent clipped fixed>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-img
                contain
                src="./assets/level.svg"
                height="80"
                width="80"
              ></v-img>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-row>
              <v-col justify="right"
                >3000 / 12000 XP

                <v-progress-linear
                  rounded
                  height="6"
                  color="deep-purple accent-3"
                  :value="xp"
                ></v-progress-linear>
              </v-col>
            </v-row>
          </v-list-item>
          <v-divider></v-divider>
          <v-row class="mt-6" justify="center">
            <v-text>Retos</v-text>
          </v-row>
          <v-list-item three-line>
            <v-list-content>
              <v-list-item-title>
                3 aciertos
              </v-list-item-title>
              <v-list-item-subtitle>
                1/3
              </v-list-item-subtitle>
            </v-list-content>
          </v-list-item>
          <v-list-item three-line>
            <v-list-content>
              <v-list-item-title>
                3 aciertos
              </v-list-item-title>
              <v-list-item-subtitle>
                1/3
              </v-list-item-subtitle>
            </v-list-content>
          </v-list-item>
          <v-list-item three-line>
            <v-list-content>
              <v-list-item-title>
                3 aciertos
              </v-list-item-title>
              <v-list-item-subtitle>
                1/3
              </v-list-item-subtitle>
            </v-list-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-container>
          <v-row>
            <v-img
              contain
              src="./assets/cash.svg"
              height="32"
              width="32"
            ></v-img>
            <v-text>30</v-text>
          </v-row>
        </v-container>
        <v-divider></v-divider>
       <v-container>
            <v-row justify="center">
            <v-col>
              <v-list>
                <v-row justify="center">
                  <v-list-item >
                    <v-list-content>
                      <v-list-title>{{  'Alumno 4/12000XP'}} </v-list-title>
                    </v-list-content>
                  </v-list-item>
                  <v-list-item >
                    <v-list-content>
                      <v-list-title>{{  'Alumno 10/10050XP'}} </v-list-title>
                    </v-list-content>
                  </v-list-item>
                  <v-list-item >
                    <v-list-content>
                      <v-list-title>{{  'Alumno 1/2800XP'}} </v-list-title>
                    </v-list-content>
                  </v-list-item>
                </v-row>
              </v-list>
            </v-col>
          </v-row>
        </v-container>        
      </v-navigation-drawer>
    </div>-->
    <!-- <div v-if="this.$route.name === 'Classroom' && this.prof"> -->
    <!-- <v-navigation-drawer right app permanent clipped fixed>
       
        <v-divider></v-divider>
        <v-container>
          <ClassSteps />
        </v-container>
        <v-divider></v-divider>
        <v-container>
            <v-row justify="center">
            <v-col>
              <v-list>
                <v-row justify="center">
                  <v-list-item >
                    <v-list-content>
                      <v-list-title>{{  'Alumno 4/12000XP'}} </v-list-title>
                    </v-list-content>
                  </v-list-item>
                  <v-list-item >
                    <v-list-content>
                      <v-list-title>{{  'Alumno 10/10050XP'}} </v-list-title>
                    </v-list-content>
                  </v-list-item>
                  <v-list-item >
                    <v-list-content>
                      <v-list-title>{{  'Alumno 1/2800XP'}} </v-list-title>
                    </v-list-content>
                  </v-list-item>
                </v-row>
              </v-list>
            </v-col>
          </v-row>
        </v-container>
        <v-divider></v-divider>
        <v-row justify="center" align="center">
          <v-container>
            <v-row justify="center">
                <v-img  class="mt-6" contain height="120" width="120" src="./assets/boost.svg"></v-img>
            </v-row>
          </v-container>

        </v-row>
          
      </v-navigation-drawer>-->
    <!-- <div v-if="director">
      <v-navigation-drawer>
      <Layout />
      </v-navigation-drawer>
    </div>-->
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import firebase from "firebase";
import { db } from "./db";

import Layout from "./views/director/layout/Layout";
import ClassSteps from "./components/prof/ClassSteps";
export default {
  components: {
    ClassSteps,
    Layout
  },
  data() {
    return {
      xp: null,
      auth: null,
      tipo_usuario: null,
      user_email: null,
      prof: null,
      student: null,
      director: null,
      items: [
        {
          title: "Clase",
          icon: "mdi-google-classroom",
          path: "/prof-lobby"
        },
        {
          title: "Grupos",
          icon: "mdi-google-classroom",
          path: "/prof-groups"
        },
        // {
        //   title: "Horario",
        //   icon: "mdi-calendar-range",
        //   path: "/prof-schedule"
        // },
        // {
        //   title: "Crear Recursos",
        //   icon: "mdi-folder-multiple-image",
        //   path: "/resources"
        // },
        // {
        //   title: "Crear Trivias",
        //   icon: "mdi-gamepad-circle-left",
        //   path: "/trivias"
        // },
        // {
        //   title: "Crear Tareas",
        //   icon: "mdi-gamepad-circle-left",
        //   path: "/trivias"
        // },
        {
          title: "Clasificación",
          icon: "mdi-trophy-outline",
          path: "/schedule"
        },
        {
          title: "Estadisticas",
          icon: "mdi-chart-timeline-variant",
          path: "/schedule"
        },
        {
          title: "Noticias",
          icon: "mdi-newspaper-variant-multiple-outline",
          path: "/schedule"
        },

        // {
        //   title: "Notificaciones",
        //   icon: "mdi-calendar-range",
        //   path: "/schedule"
        // },
        // { title: "Centros de atención", icon: "mdi-map-marker-radius-outline" },
        { title: "Ayuda", icon: "mdi-help-box" }
      ],
      itemsStudentRight: [
        { title: "funciono", icon: "mdi-google-classroom", path: "/classroom" },
        { title: "Horario", icon: "mdi-calendar-range", path: "/schedule" },
        {
          title: "Noticias",
          icon: "mdi-newspaper-variant-multiple-outline",
          path: "/schedule"
        },
        // {
        //   title: "Notificaciones",
        //   icon: "mdi-calendar-range",
        //   path: "/schedule"
        // },
        { title: "Centros de atención", icon: "mdi-map-marker-radius-outline" },
        { title: "Ayuda", icon: "mdi-help-box" }
      ],
      items2: [
        {
          title: "Clase",
          icon: "mdi-google-classroom",
          path: "/student-lobby"
        },
        // {
        //   title: "Horario",
        //   icon: "mdi-calendar-range",
        //   path: "/student-schedule"
        // },
        { title: "Clasificación", icon: "mdi-trophy-outline" },

        {
          title: "Tareas",
          icon: "mdi-calendar-check-outline",
          path: "/schedule"
        },
        {
          title: "Juegos",
          icon: "mdi-gamepad-square-outline",
          path: "/schedule"
        },
        // {
        //   title: "Grabaciones",
        //   icon: "mdi-video-outline",
        //   path: "/"
        // },
        {
          title: "Examenes",
          icon: "mdi-order-bool-descending",
          path: "/schedule"
        },
        {
          title: "Calificaciones",
          icon: "mdi-dice-d10-outline",
          path: "/schedule"
        },
        // LVL 2 { title: "Estadisticas", icon: "mdi-" },
        { title: "Noticias", icon: "mdi-newspaper-variant-multiple-outline" },
        { title: "Ayuda", icon: "mdi-help-circle-outline" }
      ],
      director_items: [
        { title: "Profesores", icon: "mdi-google-class", path: "/professors" },
        { title: "Grupos", icon: "mdi-google-class", path: "/groups" }
        // {
        //   title: "Materias",
        //   icon: "mdi-google-classroom",
        //   path: "/materias"
        // }
      ],
      right: null
    };
  },
  watch: {
    // xp(){
    //   this.xp =
    // }
  },
  mounted() {
    console.log("route-name", this.$route.name);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        db.collection("usuarios")
          .doc(user.email)
          .get()
          .then(snapshot => {
            const document = snapshot.data();
            console.log("app", document);
            if (document.tipo_usuario === "prof") {
              this.prof = true;
              this.student = false;
              this.director = false;
            } else if (document.tipo_usuario === "student") {
              this.student = true;
              this.director = false;
              this.prof = false;
            } else if (document.tipo_usuario === "director") {
              this.director = true;
              this.student = false;
              this.prof = false;
            }
          });
      }
    });
    let refXp = db.collection(this.classroom + "-students");
    // .where()
    refXp.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        console.log("changeType", change.type);
        if ((change.type = "modified")) {
          let doc = change.doc;
          this.xp = doc.data().xp;
          console.log("changeDoc", doc.data());

          // this.messages.push({
          //   id: doc.id,
          //   sender: doc.data().sender,
          //   message: doc.data().message,
          //   timestamp: moment(doc.data().timestamp).format('LTS')
          // })
        }
      });
    });
  },
  computed: {
    authRoutes() {
      if (this.$route.name === "sign-up" || "login") {
        this.auth = true;
      }
      this.auth = false;
    }
  },
  methods: {
    goToComponent(item) {
      this.$router.push(item.path);
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("logged out");
          this.$router.push("/login");
          // Sign-out successful.
        })
        .catch(function(error) {
          // An error happened.
        });
    }
  }
};
</script>
<style>
.app {
  background-color: #282424;
}
</style>
