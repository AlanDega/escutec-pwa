<template>
  <v-app>
    <v-app-bar
      v-if="this.$route.name != 'sign-up' || 'login'"
      app
      color="deep-purple accent-3"
      dark
      absolute
      clipped-left
      clipped-right
    >
      <div class="d-flex align-center">
        <h1>Escutec</h1>
      </div>

      <v-spacer></v-spacer>
      <v-btn @click="logout">logout</v-btn>
    </v-app-bar>
    <v-navigation-drawer app permanent clipped>
      <div v-if="tipo_usuario == 'prof'">
        <v-list nav>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            @click="goToComponent(item)"
          >
            <v-list-item-icon>
              <v-icon color="deep-purple accent-3">{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
      <div v-if="(tipo_usuario = 'student')">
        <v-list nav>
          <v-list-item
            v-for="item in items2"
            :key="item.title"
            link
            @click="goToComponent(item)"
          >
            <v-list-item-icon>
              <v-icon color="deep-purple accent-3">{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
    </v-navigation-drawer>
    <div
      v-if="this.$route.name === 'Classroom' && this.tipo_usuario === 'student'"
    >
      <v-navigation-drawer right app permanent clipped>
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
                  :value="5"
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
            <v-col>
              <v-row justify="center" align="center">
                <v-btn class="mt-6" dark rounded color="deep-purple accent-3">
                  crear pregunta</v-btn
                >
              </v-row>
              <v-row justify="center" align="center">
                <v-btn class="mt-6" dark rounded color="deep-purple accent-3">
                  tomar nota</v-btn
                >
              </v-row>
            </v-col>
        </v-container>
        <v-divider></v-divider>
        <v-row justify="center" align="center">
          <v-container>
            <v-row justify="center">
                <v-img  class="mt-6" contain height="120" width="120" src="./assets/boost.svg"></v-img>
            </v-row>
          </v-container>

        </v-row>
          
      </v-navigation-drawer>
    </div>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import firebase from "firebase";
import { db } from "./db";
import ClassSteps from "./components/prof/ClassSteps";
export default {
  components: {
    ClassSteps
  },
  data() {
    return {
      value: 15,
      tipo_usuario: null,
      user_email: null,
      prof: null,
      student: null,
      items: [
        { title: "Clase", icon: "mdi-google-classroom", path: "/classroom" },
        { title: "Horario", icon: "mdi-calendar-range", path: "/schedule" },
        {
          title: "Notificaciones",
          icon: "mdi-calendar-range",
          path: "/schedule"
        },
        { title: "Noticias", icon: "mdi-calendar-range", path: "/schedule" },
        { title: "Centros de atención", icon: "mdi-map-marker-radius-outline" },
        { title: "Ayuda", icon: "mdi-help-box" }
      ],
      itemsStudentRight: [
        { title: "funciono", icon: "mdi-google-classroom", path: "/classroom" },
        { title: "Horario", icon: "mdi-calendar-range", path: "/schedule" },
        {
          title: "Notificaciones",
          icon: "mdi-calendar-range",
          path: "/schedule"
        },
        { title: "Noticias", icon: "mdi-calendar-range", path: "/schedule" },
        { title: "Centros de atención", icon: "mdi-map-marker-radius-outline" },
        { title: "Ayuda", icon: "mdi-help-box" }
      ],
      items2: [
        { title: "Clase", icon: "mdi-google-classroom", path: "/classroom" },
        { title: "Horario", icon: "mdi-calendar-range", path: "/schedule" },
        {
          title: "Tareas",
          icon: "mdi-calendar-range",
          path: "/schedule"
        },
        {
          title: "Grabaciones",
          icon: "mdi-video",
          path: "/"
        },
        { title: "Examenes", icon: "mdi-calendar-range", path: "/schedule" },
        { title: "Clasificación", icon: "mdi-trophy" },
        { title: "Noticias", icon: "mdi-help-box" },
        { title: "Ayuda", icon: "mdi-help-box" }
      ],
      right: null
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
  methods: {
    goToComponent(item) {
      this.$router.push(item.path);
    },
    logout(){
      firebase.auth().signOut().then(function() {
        console.log('logged out')
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});
    }
  }
};
</script>
