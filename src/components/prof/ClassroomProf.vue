<template>
  <div>
    <v-col>
      <v-container>
        <!-- tabs ----------------------------------------------------------------__________----_------------>
        <v-tabs centered grow color="deep-purple accent-3">
          <v-tab @click="renderTransmision">transmisión</v-tab>
          <v-tab @click="renderResources">Recursos</v-tab>
          <v-tab @click="renderTrivia">Trivias</v-tab>
          <!-- <v-tab @click="renderEstadisticas">estadisticas</v-tab> -->

          <v-tab-item>
            <v-container>
              <v-row>
                <v-card class="TwitchPlayer">
                  <iframe
                    :src="streamer"
                    height="100%"
                    width="100%"
                    frameborder="0"
                    scrolling="no"
                    allowfullscreen="true"
                  ></iframe>
                </v-card>
              </v-row>
              <v-row>
                <v-col>
                  <v-card class="ChatCard" flat>
                    <v-container>
                      <v-row>
                        <v-navigation-drawer permanent>
                          <v-list ref="chat2" id="logs2">
                            <!-- <v-list> -->
                            <template>
                              <v-container
                                v-for="(student, index) in students"
                                :key="index"
                              >
                                <v-row>
                                  <v-col cols="9">
                                    <v-subheader
                                      v-if="student"
                                      :key="index"
                                      @click="validatePresence(student)"
                                      >{{ student.name }}</v-subheader
                                    >
                                  </v-col>
                                  <v-col>
                                    <v-container v-if="student_checked">
                                      <v-row justify="center">
                                        <v-icon color="deep-purple accent-3"
                                          >mdi-check</v-icon
                                        >
                                      </v-row>
                                    </v-container>
                                  </v-col>
                                </v-row>
                              </v-container>
                            </template>
                          </v-list>
                        </v-navigation-drawer>
                        <v-col>
                          <v-list ref="chat" id="logs">
                            <template v-for="(message, index) in messages">
                              <v-subheader v-if="message" :key="index">
                                {{ message.sender + ":" + message.message }}
                              </v-subheader>
                            </template>
                          </v-list>
                          <v-container>
                            <v-row>
                              <v-col cols="10">
                                <v-text-field
                                  dense
                                  v-model="msg"
                                  label="Message"
                                  outlined
                                  color="deep-purple accent-3"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="2">
                                <v-btn
                                  dark
                                  color="deep-purple accent-3"
                                  @click="submit"
                                  >Enviar</v-btn
                                >
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-col>
                      </v-row>
                    </v-container>
                    <!-- <v-form @submit.prevent="submit"> -->
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-tab-item>
          <v-tab-item>
            <h2>recursos</h2>
            <a href="https://www.github.com">github</a>
          </v-tab-item>
          <v-tab-item>
            <v-container v-if="!trivia_is_active">
              <v-row>
                <v-col>
                  <v-card class="mx-auto" max-width="900">
                    <v-toolbar color="deep-purple accent-3" dark>
                      <v-toolbar-title>Trivias</v-toolbar-title>
                    </v-toolbar>
                      <div  v-for="(trivia, index) in trivias" :key="index">
                    <v-dialog v-model="dialogTrivia" width="500">
                      <template v-slot:activator="{ on }" >
                        <v-btn
                          @click="showTrivia(trivia)"
                          v-on="on"
                          dark
                          outlined
                          class="mx-auto"
                          max-width="240"
                          color="deep-purple accent-3"
                          >{{ trivia.question }}</v-btn
                        >
                      </template>
                      <v-card>
                        <v-container>
                          <v-row justify="center">
                            <v-col>
                              <h2>{{ question }}</h2>
                              <v-row>
                                <v-col cols="12">
                                  <h3>{{ answer1}}</h3>
                                  <h3>{{ answer2}}</h3>
                                  <h3>{{ answer3}}</h3>
                                  <h3>{{ answer4}}</h3>
                                  <h3>{{ right_answer}}</h3>
                                  <!-- <v-text-field
                                    label="respuesta 1"
                                  ></v-text-field>
                                  <v-text-field
                                    label="respuesta 2"
                                  ></v-text-field>
                                  <v-text-field
                                    label="respuesta 3"
                                  ></v-text-field>
                                  <v-text-field
                                    label="respuesta 4"
                                  ></v-text-field> -->
                                  <v-row justify-center align-center>
                                    <!-- <v-select
                                      outlined
                                      v-model="right_answer"
                                      label="respuestaCorrecta"
                                      :items="answers"
                                    ></v-select> -->
                                  </v-row>
                                  <v-card-actions>
                                    <v-row justify="center">
                                      <v-btn
                                        @click="sendSelectedTrivia"
                                        text
                                        color="deep-purple accent-3"
                                        >Iniciar Trivia</v-btn
                                      >
                                    </v-row>
                                  </v-card-actions>
                                </v-col>
                              </v-row>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card>
                    </v-dialog>
                      </div>
                  </v-card>
                </v-col>
              </v-row>

              <v-row>
                <v-fab-transition>
                  <v-btn
                    v-show="!hidden"
                    color="deep-purple accent-3"
                    dark
                    absolute
                    bottom
                    right
                    fab
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-fab-transition>
              </v-row>
            </v-container>
            <v-container v-if="trivia_is_active">
              <v-row>
                <!-- <div class="header"> -->
                <v-col cols="12" class="mt-12">
                  <v-row justify="center">
                    <h2>Pregunta :{{ question }}</h2>
                  </v-row>
                  <v-row justify="center" class="mt-6">
                    <h2>Respuesta Correcta : {{ right_answer }}</h2>
                  </v-row>
                </v-col>
                <!-- </div> -->
              </v-row>
              <v-row class="mt-12">
                <v-col cols="6">
                  <v-row justify="center">
                    <h1 class="correct">Correctos</h1>
                  </v-row>
                  <v-row justify="center">
                    <h2 class="correct">{{ correct_answers }}</h2>
                  </v-row>
                </v-col>
                <v-col cols="6">
                  <v-row justify="center">
                    <h1 class="incorrect">Incorrectos</h1>
                  </v-row>
                  <v-row justify="center">
                    <h2 class="incorrect">{{ incorrect_answers }}</h2>
                  </v-row>
                </v-col>
              </v-row>
              <!-- aqui podemo s agregar info de los estudiantes de quienes lo lograron etc  -->
             
              <v-row justify="center" class="mt-12">
                <!-- en finalize trivia agregar info para las estadisticas generales  -->
                <v-btn
                  rounded
                  color="deep-purple accent-3"
                  dark
                  @click="finalize_trivia"
                  >Terminar Trivia</v-btn
                >
              </v-row>
            </v-container>
            <v-container v-if="trivia_results">
               <v-row class="mt-12">
                <v-col cols="6">
                  <v-row justify="center">
                    <h2 class="correct">{{ correct_answers  }}</h2>
                  </v-row>
                </v-col>
                <v-col cols="6">
                  <v-row justify="center">
                    <h2 class="incorrect">{{ incorrect_answers }}</h2>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-tab-item>
        </v-tabs>
      </v-container>
      <div v-if="resources"></div>
    </v-col>
  </div>
</template>

<script>
import firebase from "firebase";
import { db } from "../../db";
import LineChart from "../../LineChart";
import moment from "moment";

export default {
  components: {
    LineChart
  },

  data() {
    return {
      trivias: [],
      streamer: null,
      correct_percentage: null,
      incorrect_percentage: null,
      correct_answers: null,
      incorrect_answers: null,
      trivia_is_active: null,
      student_checked: null,
      students: [],
      classroom: "A-1",
      messages: [],
      logs2: [],
      msg: null,
      messageInput: null,
      call_timer: 0,
      inactive_call: true,
      active_call: null,
      selected_intel_state: null,
      selected_emotional_state: null,
      datacollection: null,
      images: true,
      videos: null,
      texts: null,
      bottomNav: "images",
      trivia_choice: null,
      dialogTrivia: null,
      dialog: null,
      question: null,
      answer1: null,
      answer2: null,
      answer3: null,
      answer4: null,
      right_answer: null,
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      hidden: true,
      selected_trivia: null,
      selected_image: null,
      selected_video: null,
      selected_link: null,
      selected_stats: null,
      resources: true,
      tareas: null,
      trivia: null,
      transmision: null,
      // estadisticas: null,
      e6: 1,
      tabs: null,
    };
  },

  watch: {
    logs() {
      setTimeout(() => {
        this.$refs.chat.$el.scrollTop = this.$refs.chat.$el.scrollHeight;
      }, 0);
    },
    logs2() {
      setTimeout(() => {
        this.$refs.chat2.$el.scrollTop = this.$refs.chat2.$el.scrollHeight;
      }, 0);
    }
  },
  created() {
    // this.streamer = 'https://player.twitch.tv/?channel='+ this.test +'&muted=true'
    this.streamer =
      "https://player.twitch.tv/?channel=" + "grapho" + "&muted=true";
  },
  async mounted() {
    // this.transmision =
    await firebase.auth().onAuthStateChanged(user => {
      console.log("user", user.email);
      this.user = user.email;
    });
    this.getTrivias();
    db.collection(this.classroom + "-students")
      .get()
      .then(querySnapshot => {
        const documents = querySnapshot.docs.map(doc => doc.data());
        this.students = documents;
      });
    // db.collection(this.classroom + "-trivia")
    //   .doc("¿qué es la energía?")
    //   .get()
    //   .then(snapshot => {
    //     const document = snapshot.data();
    //     this.correct_answers = document.correct_answers;
    //     this.incorrect_answers = document.incorrect_answers;
    //     console.log("triviaDocument", document);
    //   });
    let ref = db.collection(this.classroom + "-messages").orderBy("timestamp");
    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if ((change.type = "added")) {
          let doc = change.doc;
          this.messages.push({
            id: doc.id,
            sender: doc.data().sender,
            message: doc.data().message,
            timestamp: moment(doc.data().timestamp).format("LTS")
          });
        }
      });
    });
    let refTrivia = db.collection(this.classroom + "-trivia");
    // .where()
    refTrivia.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        console.log("changeType", change.type);
        if ((change.type = "modified")) {
          let doc = change.doc;
          console.log("changeDoc", doc.data());
          this.right_answer = doc.data().right_answer;
          this.correct_answers = doc.data().correct_answers;
          this.incorrect_answers = doc.data().incorrect_answers;
        }
      });
    });
  },
  methods: {
    showTrivia(trivia){
      console.log('trivia',trivia)
      this.question = trivia.question
      this.answer1 = trivia.answer1
      this.answer2 = trivia.answer2
      this.answer3 = trivia.answer3
      this.answer4 = trivia.answer4
      this.right_answer = trivia.right_answer
    },
    getTrivias() {
      db.collection(this.user)
        .get()
        .then(querySnapshot => {
          const documents = querySnapshot.docs.map(doc => doc.data());
          this.trivias = documents;
          console.log("trivias", documents);
        });
    },
    finalize_trivia() {
      this.trivia_is_active = false;
      db.collection(this.classroom + "-students")
        .where("right", "==", true)
        .get()
        .then(querySnapshot => {
          const documents = querySnapshot.docs.map(doc => doc.data())
          console.log('correctos',documents.length)
          db.collection(this.classroom +'-students')
          .get()
          .then(querySnapshot => {
            const documents = querySnapshot.docs.map(doc => {
              db.collection(this.classroom + '-students')
              .doc(doc.id)
                .update({right: null})
            })
            
          })
      // aqui enviar info
    })
    },
    // hacer otra coleccion para los resultados?
    sendSelectedTrivia() {
      db.collection(this.classroom + "-trivia")
        .doc('trivia')
        .set({
          question: this.question,
          answer1: this.answer1,
          answer2: this.answer2,
          answer3: this.answer3,
          answer4: this.answer4,
          right_answer: this.right_answer,
          correct_answers: 0,
          incorrect_answers: 0
        })
        .then(() => {
          this.dialogTrivia = false;
          this.trivia_is_active = true;
          console.log("sent trivia");
        });
    },
    validatePresence(student) {
      this.student_checked = true;
      console.log("student", student.name);
      const increment = firebase.firestore.FieldValue.increment(20);
      const xpRef = db
        .collection(this.classroom + "-students")
        .doc(student.name);
      const batch = db.batch();
      batch.set(xpRef, { xp: increment }, { merge: true });
      batch.commit().then(() => {
        console.log("mision cumplida");
      });
    },
    submit() {
      db.collection(this.classroom + "-messages")
        .add({
          sender: this.user,
          message: this.msg,
          timestamp: Date.now()
        })
        .catch(err => console.log("error", err))
        .then(() => {
          this.msg = "";
        });
    },

    // fillData() {
    //   (this.datacollection = {
    //     labels: ["lunes", "martes", "miercoles", "jueves", "viernes"],
    //     datasets: [
    //       {
    //         label: "Aciertos",
    //         backgroundColor: "#03FC2B",
    //         data: [32, 12, 21, 45, 54]
    //       }
    //     ]
    //   }),
    //     (this.datacollection2 = {
    //       labels: ["lunes", "martes", "miercoles", "jueves", "viernes"],
    //       datasets: [
    //         {
    //           label: "fallas",
    //           backgroundColor: "#FF000F",
    //           data: [4, 12, 7, 45, 23]
    //         }
    //       ]
    //     }),
    //     (this.datacollection3 = {
    //       labels: ["Feliz", "Contento", "Aburrido", "Enojado", "Triste"],
    //       datasets: [
    //         {
    //           label: "Estado Emocional",
    //           backgroundColor: "#6100FF",
    //           data: [0, 9, 12, 7, 11, 8]
    //         }
    //       ]
    //     });
    // },
    // createChart(chartId, chartData) {
    //   const ctx = document.getElementById(chartId);
    //   const myChart = new Chart(ctx, {
    //     type: chartData.type,
    //     data: chartData.data,
    //     options: chartData.options
    //   });
    // },
    renderImagesType() {
      (this.images = true), (this.videos = false), (this.links = false);
    },
    renderVideosType() {
      (this.images = false), (this.videos = true), (this.links = false);
    },
    renderLinksType() {
      (this.images = false), (this.videos = false), (this.links = true);
    },
    renderTopIntellectualStats() {
      this.selected_trivia = false;
      this.selected_homework = false;
      this.selected_image = false;
      this.selected_video = false;
      this.selected_link = false;
      this.resources = false;
      this.tareas = false;
      this.trivia = false;
      this.transmision = false;
      this.estadisticas = false;
      this.selected_intel_state = true;
      this.selected_emotional_state = false;
    },
    renderTopEmotionalStats() {
      this.selected_trivia = false;
      this.selected_homework = false;
      this.selected_image = false;
      this.selected_video = false;
      this.selected_link = false;
      this.resources = false;
      this.tareas = false;
      this.trivia = false;
      this.transmision = false;
      this.estadisticas = false;
      this.selected_intel_state = false;
      this.selected_emotional_state = true;
    },
    renderSelectedHomework() {
      this.selected_homework = true;
      this.tareas = false;
      this.dialog = false;
    },
    renderSelectedTrivia() {
      this.dialogTrivia = false;
      this.selected_trivia = true;
      this.selected_image = false;
      this.selected_video = false;
      this.selected_link = false;
      this.trivia = false;
      this.selected_homework = false;
      this.tareas = false;
    },
    viewImage() {
      this.selected_image = true;
      this.selected_video = false;
      this.selected_link = false;
      this.resources = true;
      this.tareas = false;
      this.trivia = false;
      this.transmision = false;
      this.estadisticas = false;
    },
    viewVideo() {
      this.selected_image = false;
      this.selected_video = true;
      this.selected_link = false;
      this.resources = true;
      this.tareas = false;
      this.trivia = false;
      this.transmision = false;
      this.estadisticas = false;
    },
    viewLink() {
      this.selected_image = false;
      this.selected_video = false;
      this.selected_link = true;
      this.resources = false;
      this.tareas = false;
      this.trivia = false;
      this.transmision = false;
      this.estadisticas = false;
    },
    renderResources() {
      this.selected_homework = false;
      this.selected_image = false;
      this.selected_video = false;
      this.selected_link = false;
      this.resources = true;
      this.tareas = false;
      this.trivia = false;
      this.transmision = false;
      this.estadisticas = false;
    },
    renderTareas() {
      this.selected_homework = false;
      this.selected_image = false;
      this.selected_video = false;
      this.selected_link = false;
      this.resources = false;
      this.tareas = true;
      this.trivia = false;
      this.transmision = false;
      this.estadisticas = false;
      setTimeout(() => (this.hidden = false), 300);
    },
    renderTrivia() {
      db.collection(this.classroom + "-trivia");

      this.selected_homework = false;
      this.selected_image = false;
      this.selected_video = false;
      this.selected_link = false;
      this.resources = false;
      this.tareas = false;
      this.trivia = true;
      this.transmision = false;
      this.estadisticas = false;
    },
    renderTransmision() {
      this.selected_trivia = false;
      this.selected_homework = false;
      this.selected_image = false;
      this.selected_video = false;
      this.selected_link = false;
      this.resources = false;
      this.tareas = false;
      this.trivia = false;
      this.transmision = true;
      this.estadisticas = false;
    },
    renderEstadisticas() {
      this.selected_homework = false;
      this.selected_video = false;
      this.selected_link = false;
      this.selected_image = false;
      this.resources = false;
      this.tareas = false;
      this.trivia = false;
      this.transmision = false;
      this.estadisticas = true;
    },
    streamTrivia() {
      this.selected_homework = false;
      this.selected_trivia = true;
      this.selected_image = false;
      this.selected_video = false;
      this.selected_link = false;
      this.resources = false;
      this.tareas = false;
      this.trivia = false;
      this.transmision = false;
      this.estadisticas = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  height: 20vh;
}
.correct {
  color: green;
}
.incorrect {
  color: red;
}
#logs {
  height: 180px;
  overflow: auto;
}
#logs2 {
  height: 180px;
  overflow: auto;
}
.ChatCard {
  height: 35vh;
  width: 100%;
  margin-top: 20px;
}
.TwitchPlayer {
  height: 35vh;
  width: 100%;
}

.daContain {
  height: 80vh;
}
// .daStepper {
//   max-height: 95%;
// }
.media_card {
  height: 100%;
}
// .media_card2 {
//   height: 100%;
//   margin-top: 20px;
// }
.preguntas {
  margin-top: 20px;
}
.small {
  width: 100%;
  height: 100%;
}
.chart_style {
  width: 300px;
}
.active_call_style {
  color: #03fc2b;
}
.div1 {
}
</style>
