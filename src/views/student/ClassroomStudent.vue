<template>
  <div>
    <v-row>
      <v-col align="center" cols="10" class="main-col">
        <v-container>
          <v-card class="TwitchPlayer">
            <iframe
              :src="prof_subject_stream"
              height="100%"
              width="100%"
              frameborder="0"
              scrolling="no"
              allowfullscreen="true"
            ></iframe>
          </v-card>
        </v-container>
        <v-tabs centered color="deep-purple accent-3">
          <v-tab @click="renderChat">chat</v-tab>
          <v-tab @click="renderResources">Recursos</v-tab>
          <v-tab @click="renderTrivia">Trivia</v-tab>
          <!-- <v-tab @click="renderEstadisticas">estadisticas</v-tab> -->

          <v-tab-item>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-card class="chat_notes_card">
                    <v-list ref="chat" id="logs">
                      <template v-for="(message, index) in messages">
                        <v-subheader
                          v-if="message"
                          :key="index"
                        >{{ message.sender + ":" + message.message }}</v-subheader>
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
                          <v-btn dark color="deep-purple accent-3" @click="submit">Enviar</v-btn>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-tab-item>
          <v-tab-item>
            <v-container>
              <v-row>
                <v-col cols="4">
                  <v-card>
                    <v-col>
                      <v-row justify="center">
                        <v-icon color="deep-purple accent-3" class="mb-4">mdi-image</v-icon>
                      </v-row>
                      <v-row justify="center">
                        <v-col>
                          <v-row justify="center">
                            <v-btn
                              v-for="(img, index) in img_resources"
                              :key="index"
                              text
                              :href="img.url"
                            >{{ img.title }}</v-btn>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-card>
                </v-col>
                <v-col cols="4">
                  <v-card>
                    <v-col>
                      <v-row justify="center">
                        <v-icon color="deep-purple accent-3" class="mb-4">mdi-play-box</v-icon>
                      </v-row>
                      <v-row justify="center">
                        <v-btn
                          v-for="(video, index) in video_resources"
                          :key="index"
                          text
                          :href="video.url"
                        >{{ video.title }}</v-btn>
                      </v-row>
                    </v-col>
                  </v-card>
                </v-col>
                <v-col cols="4">
                  <v-card>
                    <v-col>
                      <v-row justify="center">
                        <v-icon color="deep-purple accent-3" class="mb-4">mdi-text</v-icon>
                      </v-row>
                      <v-row justify="center">
                        <v-btn
                          v-for="(text, index) in text_resources"
                          :key="index"
                          text
                          :href="text.url"
                        >{{ text.title }}</v-btn>
                      </v-row>
                    </v-col>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-tab-item>
          <v-tab-item>
            <v-container>
              <v-row justify="center" class="mt-6">
                <h1>{{ question }}</h1>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn
                    :disabled="answered"
                    @click="checkAnswer1"
                    outlined
                    class="answerButton"
                    color="deep-purple accent-3"
                  >{{ answer1 }}</v-btn>
                </v-col>
                <v-col>
                  <v-btn
                    :disabled="answered"
                    @click="checkAnswer2"
                    outlined
                    class="answerButton"
                    color="deep-purple accent-3"
                  >{{ answer2 }}</v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn
                    :disabled="answered"
                    @click="checkAnswer3"
                    outlined
                    class="answerButton"
                    color="deep-purple accent-3"
                  >{{ answer3 }}</v-btn>
                </v-col>
                <v-col>
                  <v-btn
                    :disabled="answered"
                    @click="checkAnswer4"
                    outlined
                    class="answerButton"
                    color="deep-purple accent-3"
                  >{{ answer4 }}</v-btn>
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
          </v-tab-item>
        </v-tabs>
        <div v-if="resources"></div>
      </v-col>
      <!-- -------------------------------------- SideBar Right _____________------------------ -->

      <v-col class="col-side">
        <!-- <v-container fluid> -->
        <v-card class="side-bar-right">
          <v-row>
            <h2>{{ alias }}</h2>
          </v-row>
          <v-row justify="center">
            <v-img class="mt-4" contain src="../../assets/level.svg" height="80" width="80"></v-img>
          </v-row>
          <v-container>
            <v-row>
              <v-col justify="right">
                <v-text class="xpText" justify="right">
                  {{
                  xp + "/" + next_level_xp + " XP"
                  }}
                </v-text>
                <v-progress-linear rounded height="6" color="deep-purple accent-3" v-model="xp"></v-progress-linear>
              </v-col>
            </v-row>
          </v-container>

          <!-- </v-list-item> -->
          <v-divider></v-divider>

          <v-divider></v-divider>
          <v-container>
            <v-row>
              <v-img contain src="../../assets/cash.svg" height="32" width="32"></v-img>
              <v-text class="xpText">30</v-text>
            </v-row>
          </v-container>
          <v-divider></v-divider>
          <v-container>
            <v-row justify="center">
              <v-col>
                <v-row justify="center">
                  <v-list-item dark>
                    <v-list-content>
                      <v-list-title>
                        <v-icon color="deep-purple accent-3" class="mr-2">mdi-numeric-1-circle</v-icon>
                        {{ "Alumno/12000 XP" }}
                      </v-list-title>
                    </v-list-content>
                  </v-list-item>
                  <v-list-item dark>
                    <v-list-content>
                      <v-list-title>
                        <v-icon color="deep-purple accent-3" class="mr-2">mdi-numeric-2-circle</v-icon>
                        {{ "Alumno/10050 XP" }}
                      </v-list-title>
                    </v-list-content>
                  </v-list-item>
                  <v-list-item dark>
                    <v-list-content>
                      <v-list-title>
                        <v-icon color="deep-purple accent-3" class="mr-2">mdi-numeric-3-circle</v-icon>
                        {{ "Alumno/2800 XP" }}
                      </v-list-title>
                    </v-list-content>
                  </v-list-item>
                </v-row>
                <v-divider class="mt-4"></v-divider>
              </v-col>
            </v-row>
          </v-container>
          <v-container>
            <v-row justify="center">
              <v-img
                class="mb-4"
                contain
                src="../../assets/available-boost.png"
                height="100"
                width="100"
              ></v-img>
            </v-row>
          </v-container>
        </v-card>
        <!-- </v-container> -->
      </v-col>
    </v-row>
    <div class="text-center">
      <!-- <v-btn
      dark
      color="orange darken-2"
      @click="snackbar = true"
    >
      Open Snackbar
      </v-btn>-->

      <v-snackbar top color="success" :vertical="vertical" v-model="snackbar" :timeout="timeout">
        <v-row justify="center">
          <span class="notifText">{{ text }}</span>
        </v-row>
        <v-row justify="center">
          <span class="earnedText">{{ earned_xp }}</span>
        </v-row>

        <!-- <v-btn
        color=""
        text
        @click="snackbar = false"
      >
        Close
        </v-btn>-->
      </v-snackbar>
    </div>
    <div>
      <v-snackbar top color="red" :vertical="vertical" v-model="errorNotif" :timeout="timeout">
        <v-row justify="center">
          <span class="earnedText">Respuesta incorrecta</span>
        </v-row>
        <v-row justify="center">
          <span class="notifText">La respuesta correcta es:</span>
        </v-row>
        <v-row justify="center">
          <span class="notifText">{{ right_answer }}</span>
        </v-row>

        <!-- <v-btn
        color=""
        text
        @click="snackbar = false"
      >
        Close
        </v-btn>-->
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import { CometChat } from "@cometchat-pro/chat";
import { db } from "../../db";
import firebase from "firebase";
import LineChart from "../../LineChart";
import moment from "moment";

export default {
  components: {
    LineChart
  },

  data() {
    return {
      school_name: "stj",
      prof_subject_stream: null,
      group: null,
      text_resources: [],
      img_resources: [],
      video_resources: [],
      answered: false,
      errorNotif: false,
      earned_xp: "+ 50xp",
      vertical: true,
      snackbar: false,
      text: "Acertaste!",
      timeout: 2000,
      documents: [],
      question: null,
      answer1: null,
      answer2: null,
      answer3: null,
      answer4: null,
      right_answer: null,
      next_level_xp: 100,
      xp: 0,
      fab: false,
      hidden: false,
      messages: [],
      user: null,
      nota: null,
      classroom: "A-1",
      logs: [],
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
      transmision: true,
      estadisticas: null,
      e6: 1,
      series: [60, 40],
      chartOptions: {
        colors: ["#00FF57", "#FF000F"],
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "vertical",
            shadeIntensity: 0.05,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 0.9,
            stops: [0, 100]
          }
        },

        labels: ["Correctos", "Incorrectos"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 250
              },
              legend: {
                labels: {
                  color: "#484848"
                },
                position: "bottom"
              }
            }
          }
        ],
        legend: {
          labels: {
            color: "#484848"
          }
        }
      }
    };
  },
  // firestore: {
  //   messages: db.collection("a-1-mensajes")
  // },
  watch: {
    messages() {
      setTimeout(() => {
        this.$refs.chat.$el.scrollTop = this.$refs.chat.$el.scrollHeight;
      }, 0);
    },
    question() {
      this.answered = false;
    }
  },

  mounted() {
    // borrar en cierta cantidad de tiempo despues de obtener y guardar los resultados generales
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user.email;
        console.log("user", this.user);
        db.collection("usuarios")
          .doc(user.email)
          .get()
          .then(snapshot => {
            const document = snapshot.data();
            this.group = document.group;
            this.level = document.level;
            console.log("this.group", this.group);
            this.prof_subject_stream =
              // aquñi ya tenemos la flexibilidad e eque si le podemos agregr el campo del nombre del prof
              "https://player.twitch.tv/?channel=" +
              this.school_name +
              "_" +
              this.level +
              "_" +
              this.$route.params.id +
              "&muted=true";
          });
        //forget about classroom because it is the prof, we need group right now,
        // use the creation of director

        // db.collection(this.classroom + "-students")
        //   .doc(this.user)
        //   .get()
        //   .then(snapshot => {
        //     const document = snapshot.data();
        //     console.log("userDoc", document);
        //     if (document.answered === true) {
        //       this.answered = true;
        //     }
        //   });
      }
    });
    // db.collection(this.classroom + "-students")
    //   .get()
    //   .then(querySnapshot => {
    //     const documents = querySnapshot.docs.map(doc => doc.data());
    //     this.students = documents;
    //   });
    let ref = db.collection(this.group + "-messages").orderBy("timestamp");
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
    let refXp = db.collection(this.classroom + "-students");
    // .where()
    refXp.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        console.log("changeType", change.type);
        if ((change.type = "modified")) {
          let doc = change.doc;
          console.log("changeDoc", doc.data());
          this.xp = doc.data().xp;
        }
      });
    });
    let refTrivia = db.collection(this.classroom + "-trivia");
    // .where()
    refTrivia.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        console.log("changeType", change);
        if ((change.type = "modified")) {
          let doc = change.doc;
          console.log("changeDoc", doc.data());
          this.question = doc.data().question;
          this.answer1 = doc.data().answer1;
          this.answer2 = doc.data().answer2;
          this.answer3 = doc.data().answer3;
          this.answer4 = doc.data().answer4;
          this.right_answer = doc.data().right_answer;
          if (doc.data().trivia_is_active === false) {
            this.answered = true;
          }
          // this.correct_answers = doc.data().correct_answers;
          // this.incorrect_answers = doc.data().incorrect_answers;
        }
      });
    });
    db.collection("ingeniería-preparatoria-stjohns" + "-img-resources")
      .get()
      .then(querySnapshot => {
        const documents = querySnapshot.docs.map(doc => doc.data());
        console.log("documents", documents);
        this.img_resources = documents;
      });
    db.collection("ingeniería-preparatoria-stjohns" + "-video-resources")
      .get()
      .then(querySnapshot => {
        const documents = querySnapshot.docs.map(doc => doc.data());
        console.log("documents", documents);
        this.video_resources = documents;
      });
    db.collection("ingeniería-preparatoria-stjohns" + "-text-resources")
      .get()
      .then(querySnapshot => {
        const documents = querySnapshot.docs.map(doc => doc.data());
        console.log("documents", documents);
        this.text_resources = documents;
      });
  },
  methods: {
    checkAnswer1() {
      this.answered = true;
      if (this.answer1 === this.right_answer) {
        db.collection(this.classroom + "-students")
          .doc(this.user)
          .update({ right: true, answered: true })
          .then(() => console.log("right updated"));
        this.snackbar = true;
        const increment = firebase.firestore.FieldValue.increment(50);
        const xpRef = db
          .collection(this.classroom + "-students")
          .doc(this.user);
        const batch = db.batch();
        batch.set(xpRef, { xp: increment }, { merge: true });
        batch.commit().then(() => {
          console.log("mision xp cumplida");
        });
      } else {
        this.errorNotif = true;
        db.collection(this.classroom + "-students")
          .doc(this.user)
          .update({ right: false, answered: true })
          .then(() => console.log("wrong updated"));
      }
    },
    checkAnswer2() {
      this.answered = true;
      if (this.answer2 === this.right_answer) {
        db.collection(this.classroom + "-students")
          .doc(this.user)
          .update({ right: true, answered: true })
          .then(() => console.log("right updated"));
        this.snackbar = true;
        const increment = firebase.firestore.FieldValue.increment(50);
        const xpRef = db
          .collection(this.classroom + "-students")
          .doc(this.user);
        const batch = db.batch();
        batch.set(xpRef, { xp: increment }, { merge: true });
        batch.commit().then(() => {
          console.log("mision cumplida1");
        });
      } else {
        this.errorNotif = true;
        db.collection(this.classroom + "-students")
          .doc(this.user)
          .update({ right: false, answered: true })
          .then(() => console.log("wrong updated"));
      }
    },
    checkAnswer3() {
      this.answered = true;
      if (this.answer3 === this.right_answer) {
        db.collection(this.classroom + "-students")
          .doc(this.user)
          .update({ right: true, answered: true })
          .then(() => console.log("right updated"));
        this.snackbar = true;
        const increment = firebase.firestore.FieldValue.increment(50);
        const xpRef = db
          .collection(this.classroom + "-students")
          .doc(this.user);
        const batch = db.batch();
        batch.set(xpRef, { xp: increment }, { merge: true });
        batch.commit().then(() => {
          console.log("mision cumplida1");
        });
      } else {
        this.errorNotif = true;
        db.collection(this.classroom + "-students")
          .doc(this.user)
          .update({ right: false, answered: true })
          .then(() => console.log("wrong updated"));
      }
    },
    checkAnswer4() {
      //mejora el timing en la secuencia
      this.answered = true;
      if (this.answer4 === this.right_answer) {
        db.collection(this.classroom + "-students")
          .doc(this.user)
          .update({ right: true, answered: true })
          .then(() => console.log("right updated,"));
        this.snackbar = true;
        const increment = firebase.firestore.FieldValue.increment(50);
        const xpRef = db
          .collection(this.classroom + "-students")
          .doc(this.user);
        const batch = db.batch();
        batch.set(xpRef, { xp: increment }, { merge: true });
        batch.commit().then(() => {
          console.log("mision cumplida1");
        });
      } else {
        this.errorNotif = true;
        db.collection(this.classroom + "-students")
          .doc(this.user)
          .update({ right: false, answered: true })
          .then(() => console.log("wrong updated"));
      }
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
          // db.collection(this.classroom + "-messages")
          //   .get()
          //   .then(querySnapshot => {
          //     const documents = querySnapshot.docs.map(doc => doc.data());
          //     console.log("message-documents", documents);
          //     this.messages = documents;
          //   });
        });
    },
    fillData() {
      (this.datacollection = {
        labels: ["lunes", "martes", "miercoles", "jueves", "viernes"],
        datasets: [
          {
            label: "Aciertos",
            backgroundColor: "#03FC2B",
            data: [32, 12, 21, 45, 54]
          }
        ]
      }),
        (this.datacollection2 = {
          labels: ["lunes", "martes", "miercoles", "jueves", "viernes"],
          datasets: [
            {
              label: "fallas",
              backgroundColor: "#FF000F",
              data: [4, 12, 7, 45, 23]
            }
          ]
        }),
        (this.datacollection3 = {
          labels: ["Feliz", "Contento", "Aburrido", "Enojado", "Triste"],
          datasets: [
            {
              label: "Estado Emocional",
              backgroundColor: "#6100FF",
              data: [0, 9, 12, 7, 11, 8]
            }
          ]
        });
    },
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      });
    },
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
      db.collection(this.classroom + "-trivia")
        .doc("trivia")
        .get()
        .then(snapshot => {
          const document = snapshot.data();
          console.log("document", document);
          this.question = document.question;
          this.answer1 = document.answer1;
          this.answer2 = document.answer2;
          this.answer3 = document.answer3;
          this.answer4 = document.answer4;
          this.right_answer = document.right_answer;
        });
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
    renderChat() {
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
.main-col {
  margin-right: -15px;
}
.col-side {
  padding-top: 0px;
  padding-right: 14px;
  padding-left: 0px;
  padding-bottom: 0px;
  margin-top: 12px;
}
.answerButton {
  margin-top: 30px;
  font-size: 18px;
  width: 320px;
  height: 120px;
}
.notifText {
  color: white;
  font-size: 22px;
}
.earnedText {
  color: white;
  font-size: 28px;
}
.xpText {
  color: white;
}
.side-bar-right {
  border-left: 1px solid #e3e0e0;
  background-color: #1e1d20;
  width: 100%;
}
.v-btn--example {
}
.chat_notes_card {
  width: 100%;
}
#logs {
  height: 180px;
  overflow: auto;
}
#logs2 {
  height: 180px;
  overflow: auto;
}

.TwitchPlayer {
  height: 41vh;
  width: 100%;
}
.dashboard {
  margin-top: 20px;
  height: 40vh;
}
.whiteboard {
  height: 40vh;
}
// .divFrame {
//   height: 100%;
// }
.daContain {
  height: 80vh;
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
</style>
