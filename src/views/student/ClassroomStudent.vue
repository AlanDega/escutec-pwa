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
                        <v-subheader v-if="message" :key="index">
                          {{
                          message.sender + ":" + message.message
                          }}
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
            <v-container v-if="trivia_is_active">
              <v-row justify="center" class="question">
                <h2>{{ question }}</h2>
              </v-row>
              <v-row>
                <v-col>
                  <v-card @click="checkAnswer1" class="answerButton">
                    <v-container>
                      <v-row>
                        <v-col cols="3">
                          <v-container>
                            <v-row justify="center">
                              <v-icon color="deep-purple accent-3" large>mdi-alpha-a-circle</v-icon>
                            </v-row>
                          </v-container>
                        </v-col>
                        <v-col>
                          {{
                          answer1
                          }}
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card>
                </v-col>
                <v-col>
                  <v-card @click="checkAnswer2" class="answerButton">
                    <v-container>
                      <v-row>
                        <v-col cols="3">
                          <v-container>
                            <v-row justify="center">
                              <v-icon color="deep-purple accent-3" large>mdi-alpha-b-circle</v-icon>
                            </v-row>
                          </v-container>
                        </v-col>
                        <v-col>
                          {{
                          answer2
                          }}
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-card @click="checkAnswer3" class="answerButton">
                    <v-container>
                      <v-row>
                        <v-col cols="3">
                          <v-container>
                            <v-row justify="center">
                              <v-icon color="deep-purple accent-3" large>mdi-alpha-c-circle</v-icon>
                            </v-row>
                          </v-container>
                        </v-col>
                        <v-col>
                          {{
                          answer3
                          }}
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card>
                </v-col>
                <v-col>
                  <v-card @click="checkAnswer4" outlined class="answerButton">
                    <v-container>
                      <v-row>
                        <v-col cols="3">
                          <v-container>
                            <v-row justify="center">
                              <v-icon color="deep-purple accent-3" large>mdi-alpha-d-circle</v-icon>
                            </v-row>
                          </v-container>
                        </v-col>
                        <v-col>
                          {{
                          answer4
                          }}
                        </v-col>
                      </v-row>
                    </v-container>
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
            <v-container v-if="!trivia_is_active">
              <div v-if="!trivia_loading_state">
                <v-row justify="center">
                  <v-card class="trivia-button" @click="initializeStudentTrivia">
                    <v-row class="mt-6" justify="center">
                      <v-icon color="deep-purple accent-3" large>mdi-gamepad-circle-right</v-icon>
                    </v-row>
                    <v-row justify="center" class="mt-6">
                      <v-btn
                        outlined
                        color="deep-purple accent-3"
                        @click="initializeStudentTrivia"
                      >Iniciar Trivia</v-btn>
                    </v-row>
                  </v-card>
                </v-row>
              </div>
              <div v-if="trivia_loading_state">
                <v-row justify="center">
                  <v-card
                    class="trivia-button"
                    @click="initializeStudentTrivia"
                    loading="deep-purple accent-3"
                  >
                    <v-row class="mt-6" justify="center">
                      <v-icon color="deep-purple accent-3" large>mdi-gamepad-circle-right</v-icon>
                    </v-row>
                  </v-card>
                </v-row>
              </div>
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
            <div v-if="svg_level1">
              <v-img class="mt-4" contain src="../../assets/level.svg" height="80" width="80"></v-img>
            </div>
            <div v-if="svg_level2">
              <v-img class="mt-4" contain src="../../assets/level2.svg" height="80" width="80"></v-img>
            </div>
            <div v-if="svg_level3">
              <v-img class="mt-4" contain src="../../assets/level3.svg" height="80" width="80"></v-img>
            </div>
          </v-row>
          <v-container>
            <v-row>
              <v-col justify="right" v-if="svg_level1">
                <p class="xpText" justify="right">{{ xp + "/" + next_level_xp + " XP" }}</p>
                <v-progress-linear rounded height="6" color="deep-purple accent-3" v-model="xp"></v-progress-linear>
              </v-col>

              <v-col justify="right" v-if="svg_level2">
                <p class="xpText" justify="right">{{ xp + "/" + next_level2_xp + " XP" }}</p>
                <v-progress-linear rounded height="6" color="deep-purple accent-3" v-model="xp"></v-progress-linear>
              </v-col>

              <v-col justify="right" v-if="svg_level3">
                <p class="xpText" justify="right">{{ xp + "/" + next_level3_xp + " XP" }}</p>
                <v-progress-linear rounded height="6" color="deep-purple accent-3" v-model="xp"></v-progress-linear>
              </v-col>
            </v-row>
          </v-container>

          <!-- </v-list-item> -->
          <v-divider></v-divider>

          <v-divider></v-divider>
          <v-container>
            <!-- <v-row>
              <v-img contain src="../../assets/cash.svg" height="32" width="32"></v-img>
              <p class="xpText">30</p>
            </v-row>-->
          </v-container>
          <v-divider></v-divider>
          <v-container>
            <v-row justify="center">
              <v-col>
                <v-row justify="center">
                  <v-list-item dark>
                    <v-icon color="deep-purple accent-3" class="mr-2">mdi-numeric-1-circle</v-icon>
                    {{ "Alumno/12000 XP" }}
                  </v-list-item>
                  <v-list-item dark>
                    <v-icon color="deep-purple accent-3" class="mr-2">mdi-numeric-2-circle</v-icon>
                    {{ "Alumno/10050 XP" }}
                  </v-list-item>
                  <v-list-item dark>
                    <v-icon color="deep-purple accent-3" class="mr-2">mdi-numeric-3-circle</v-icon>
                    {{ "Alumno/2800 XP" }}
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
            <v-row justify="center">
              <div v-if="trivia_is_active">
                <v-progress-circular
                  rounded
                  size="90"
                  width="9"
                  color="deep-purple accent-3"
                  v-model="response_time"
                  absolute
                >{{ response_time }}</v-progress-circular>
              </div>
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
      lvl_2_result: null,
      lvl_3_result: null,
      svg_level: null,
      svg_level1: null,
      svg_level2: null,
      svg_level3: null,
      trivia_loading_state: null,
      response_time: 100,
      alias: null,
      prof_email: null,
      school_name: "stj",
      prof_subject_stream: null,
      group: null,
      text_resources: [],
      img_resources: [],
      video_resources: [],
      trivia_is_active: false,
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
      next_level2_xp: 300,
      next_level3_xp: 900,
      xp: 0,
      fab: false,
      hidden: false,
      messages: [],
      user: null,
      nota: null,
      classroom: null,
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
      // this.trivia_is_active = true;
    },
    xp() {
      console.log("works");
      if (this.xp <= 99) {
        this.svg_level1 = true;
        this.svg_level2 = false;
        this.svg_level3 = false;
      } else if (this.xp <= 299) {
        this.svg_level1 = false;
        this.svg_level2 = true;
        this.svg_level3 = false;
      } else if (this.xp <= 899) {
        this.svg_level3 = true;
        this.svg_level2 = false;
        this.svg_level1 = false;
      }
    }
    // svg_level1(){
    //   console.log('listener1works')
    //   if(this.xp <= 99){
    //     this.svg_level1 = true
    //   }
    // },
    // svg_level2(){
    //   if(this.xp <= 199){
    //     this.svg_level2 = true
    //   }
    // },
    // svg_level3(){
    //   if(this.xp <= 299){
    //     this.svg_level3 = true
    //   }
    // },
    // trivia_is_active(){
    //   if(this.trivia_is_active === true ){
    //     const countdown = setInterval(() => {
    //      if (this.response_time > 0) {
    //       //  this.response_time = 100
    //       const time = this.response_time;
    //       this.response_time = time - 10;
    //     } else {
    //       clearInterval(countdown)
    //       console.log('watch activo')
    //       this.trivia_is_active = false
    //       // this.response_time = 100;
    //     }
    //   }, 1000);
    //   }
    // }
  },

  mounted() {
    // borrar en cierta cantidad de tiempo despues de obtener y guardar los resultados generales
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user.email;
        console.log("user", this.user);
        db.collection("usuarios")
          .doc(this.user)
          .get()
          .then(snapshot => {
            const document = snapshot.data();
            this.classroom = document.group;
            this.level = document.level;
            console.log("this.classroom", this.classroom);
            this.prof_subject_stream =
              // aquñi ya tenemos la flexibilidad e eque si le podemos agregr el campo del nombre del prof
              "https://player.twitch.tv/?channel=" +
              this.school_name +
              "_" +
              this.$route.params.id +
              "&muted=true";
            //aqui puedo hacetrlo mas eficiente si lo buscamos por el name
            //obejtivo hackear el objeto que contiene el estado de la trivia
            const name = this.$route.params.id;
            const replacedName = name.replace("_", " ");
            console.log("replaced", replacedName);
            db.collection(this.school_name + "-" + this.classroom + "-students")
              .doc(this.user)
              .get()
              .then(snapshot => {
                const document = snapshot.data();
                this.xp = document.xp;
                this.percentageLevel2();
                this.percentageLevel3();
                if (this.xp <= 99) {
                  this.svg_level1 = true;
                  this.svg_level2 = false;
                  this.svg_level3 = false;
                } else if (this.xp <= 299) {
                  this.svg_level1 = false;
                  this.svg_level2 = true;
                  this.svg_level3 = false;
                } else if (this.xp <= 899) {
                  this.svg_level3 = true;
                  this.svg_level2 = false;
                  this.svg_level1 = false;
                }
                if (document.answered === true) {
                  console.log("si es true");
                  // o pasar exntender a watch?
                  // this.trivia_is_active = false
                  // posiblemente si fall a lo demaas tenga que ir aquí
                } else {
                  console.log("es flase");
                }
              });
            db.collection(this.school_name + "-" + this.level + "-professors")
              .doc(replacedName)
              .get()
              .then(snapshot => {
                const document = snapshot.data();
                this.prof_email = document.prof_email;
                db.collection(this.prof_email)
                  .doc("?")
                  .get()
                  .then(snapshot => {
                    const document = snapshot.data();
                    console.log("trivia is active?", document.trivia_is_active);
                    if ((document.trivia_is_active = true)) {
                      // porque esto es lo que causa todo?
                      // this.trivia_is_active = true
                    } else {
                      console.log("activado");
                      this.trivia_is_active = false;
                    }
                    //          let refXp = db.collection(
                    //   this.school_name + "-" + this.classroom + "-students"
                    // );
                    // .where()
                    // refXp.onSnapshot(snapshot => {
                    //   snapshot.docChanges().forEach(change => {
                    //     console.log("changeType", change.type);
                    //     if ((change.type = "modified")) {
                    //       let doc = change.doc;
                    //       console.log("changeDocXP", doc.data());
                    //       this.xp = doc.data().xp;
                    //     }
                    //   });
                    // });
                    //                 let refTrivia = db.collection(this.prof_email)
                    //                 refTrivia.onSnapshot(snapshot => {
                    //                   snapshot.docChanges().forEach(change => {
                    //                     console.log("TriviachangeType", change);
                    //                     if ((change.type = "modified")) {
                    // //                        const countdown = setInterval(() => {
                    // //    if (this.response_time > 0) {
                    // //     //  this.response_time = 100
                    // //     const time = this.response_time;
                    // //     this.response_time = time - 10;
                    // //   } else {
                    // //     clearInterval(countdown)
                    // //     console.log('watch activo')
                    // //     this.trivia_is_active = false
                    // //     // this.response_time = 100;
                    // //   }
                    // // }, 1000);
                    //                       let doc = change.doc;
                    //                       console.log("changeDoc", doc.data().trivia_is_active);
                    //                       // this.trivia_is_active = doc.data().trivia_is_active;
                    //                       this.question = doc.data().question;
                    //                       this.answer1 = doc.data().answer1;
                    //                       this.answer2 = doc.data().answer2;
                    //                       this.answer3 = doc.data().answer3;
                    //                       this.answer4 = doc.data().answer4;
                    //                       this.right_answer = doc.data().right_answer;

                    //                       // this.correct_answers = doc.data().correct_answers;
                    //                       // this.incorrect_answers = doc.data().incorrect_answers;
                    //                     }
                    //                   });
                    //                 });
                    //   if (document.trivia_is_active === true) {
                    //   // this.trivia_is_active = true
                    //   this.answered = false;
                    // } else {
                    //   this.trivia_is_active = false;
                    // }
                    // donde coloar ca en asyn los listeners?
                  });
              });

            let ref = db
              .collection(this.classroom + "-messages")
              .orderBy("timestamp");
            ref.onSnapshot(snapshot => {
              snapshot.docChanges().forEach(change => {
                if ((change.type = "added")) {
                  console.log("nuevo mensaje");
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
          });
        //forget about classroom because it is the prof, we need group right now,
        // use the creation of director
      }
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
    // para elt timpo de sde el login empieoz timer de rleoj timepo actual
    //retos sumar acietos en cierto contendeor anazalizar primero coual es el sutantebale y eficiente
    //lvl2 prof rating a alumnos
    //carousel
    // ver si para el realtime usamos vuefire bindings o llamadas cada x cantidad de tiempo cada cuelta del carousel ?

    percentageLevel2() {
      let lvl_2_result = (this.next_level2_xp * this.xp) / 1000;
      this.lvl_2_result = lvl_2_result;
      console.log("result", result);
    },
    percentageLevel3() {
      let lvl_3_result = (this.next_level3_xp * this.xp) / 1000;
      this.lvl_3_result = lvl_3_result;
      console.log("result", result);
    },
    initializeStudentTrivia() {
      //db trvia is active luego if
      // si no tiene que se con el contenido di titne o no tiene
      db.collection(this.prof_email)
        .doc("?")
        .get()
        .then(snapshot => {
          const document = snapshot.data();
          console.log("init-doc", document);
          if (document.trivia_is_active === true) {
            console.log("si esta activa");
            this.trivia_is_active = document.trivia_is_active;
            this.question = document.question;
            this.answer1 = document.answer1;
            this.answer2 = document.answer2;
            this.answer3 = document.answer3;
            this.answer4 = document.answer4;
            this.right_answer = document.right_answer;
            const countdown2 = setInterval(() => {
              if (this.response_time > 0) {
                const time = this.response_time;
                this.response_time = time - 5;
              } else {
                clearInterval(countdown2);
                this.trivia_loading_state = true;
                this.response_time = 100;

                db.collection(this.prof_email)
                  .doc("?")
                  .get()
                  .then(snapshot => {
                    const document = snapshot.data();
                    if (document.trivia_is_active === false) {
                      this.trivia_loading_state = false;
                      this.trivia_is_active = false;
                    }
                  });
              }
            }, 1000);
          } else {
            console.log("no hay ninguna trivia activa");
          }
        });
    },
    checkAnswer1() {
      this.trivia_is_active = false;
      if (this.answer1 === this.right_answer) {
        db.collection(this.school_name + "-" + this.classroom + "-students")
          .doc(this.user)
          .update({ right: true, answered: true })
          .then(() => console.log("right updated"));
        this.snackbar = true;
        const increment = firebase.firestore.FieldValue.increment(50);
        const xpRef = db
          .collection(this.school_name + "-" + this.classroom + "-students")
          .doc(this.user);
        const batch = db.batch();
        batch.set(xpRef, { xp: increment }, { merge: true });
        batch.commit().then(() => {
          db.collection(this.school_name + "-" + this.classroom + "-students")
            .doc(this.user)
            .get()
            .then(snapshot => {
              const document = snapshot.data();
              this.xp = document.xp;
              this.percentageLevel2();
              this.percentageLevel3();
            });

          console.log("mision xp cumplida");
        });
      } else {
        this.errorNotif = true;
        db.collection(this.school_name + "-" + this.classroom + "-students")
          .doc(this.user)
          .update({ right: false, answered: true })
          .then(() => console.log("wrong updated"));
      }
    },
    checkAnswer2() {
      this.trivia_is_active = false;
      if (this.answer2 === this.right_answer) {
        db.collection(this.school_name + "-" + this.classroom + "-students")
          .doc(this.user)
          .update({ right: true, answered: true })
          .then(() => console.log("right updated"));
        this.snackbar = true;
        const increment = firebase.firestore.FieldValue.increment(50);
        const xpRef = db
          .collection(this.school_name + "-" + this.classroom + "-students")
          .doc(this.user);
        const batch = db.batch();
        batch.set(xpRef, { xp: increment }, { merge: true });
        batch.commit().then(() => {
          console.log("mision xp cumplida");
        });
      } else {
        this.errorNotif = true;
        db.collection(this.school_name + "-" + this.classroom + "-students")
          .doc(this.user)
          .update({ right: false, answered: true })
          .then(() => console.log("wrong updated"));
      }
    },
    checkAnswer3() {
      this.trivia_is_active = false;
      if (this.answer3 === this.right_answer) {
        db.collection(this.school_name + "-" + this.classroom + "-students")
          .doc(this.user)
          .update({ right: true, answered: true })
          .then(() => console.log("right updated"));
        this.snackbar = true;
        const increment = firebase.firestore.FieldValue.increment(50);
        const xpRef = db
          .collection(this.school_name + "-" + this.classroom + "-students")
          .doc(this.user);
        const batch = db.batch();
        batch.set(xpRef, { xp: increment }, { merge: true });
        batch.commit().then(() => {
          console.log("mision xp cumplida");
        });
      } else {
        this.errorNotif = true;
        db.collection(this.school_name + "-" + this.classroom + "-students")
          .doc(this.user)
          .update({ right: false, answered: true })
          .then(() => console.log("wrong updated"));
      }
    },
    checkAnswer4() {
      //mejora el timing en la secuencia
      this.trivia_is_active = false;
      if (this.answer4 === this.right_answer) {
        db.collection(this.school_name + "-" + this.classroom + "-students")
          .doc(this.user)
          .update({ right: true, answered: true })
          .then(() => console.log("right updated"));
        this.snackbar = true;
        const increment = firebase.firestore.FieldValue.increment(50);
        const xpRef = db
          .collection(this.school_name + "-" + this.classroom + "-students")
          .doc(this.user);
        const batch = db.batch();
        batch.set(xpRef, { xp: increment }, { merge: true });
        batch.commit().then(() => {
          console.log("mision xp cumplida");
        });
      } else {
        this.errorNotif = true;
        db.collection(this.school_name + "-" + this.classroom + "-students")
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
          if (this.msg === "presente") {
            setTimeout(() => {
              db.collection(
                this.school_name + "-" + this.classroom + "-students"
              )
                .doc(this.user)
                .get()
                .then(snapshot => {
                  const document = snapshot.data();
                  this.xp = document.xp;
                  this.percentageLevel2();
                  this.percentageLevel3();
                  this.msg = "";
                });
            }, 3000);
          }
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
      // db.collection(this.school_name + "-" + this.classroom + "-students")
      //   .doc(this.user)
      //   .get()
      //   .then(snapshot => {
      //     const document = snapshot.data();
      //     console.log("answered?", document.answered);
      //     if (document.answered) {
      //       this.trivia_is_active = false;
      //     } else if (!document.answered) {
      //       console.log("funcione");
      //       db.collection(this.prof_email)
      //         .doc("?")
      //         .get()
      //         .then(snapshot => {
      //           const document = snapshot.data();
      //           console.log("trivia!?", document.trivia_is_active);
      //           if ((document.trivia_is_active = true)) {
      //             this.trivia_is_active = true;
      //             this.question = document.question;
      //             this.answer1 = document.answer1;
      //             this.answer2 = document.answer2;
      //             this.answer3 = document.answer3;
      //             this.answer4 = document.answer4;
      //             this.right_answer = document.right_answer;
      //             setInterval(() => {
      //               if (this.response_time > 0) {
      //                 const time = this.response_time;
      //                 this.response_time = time - 10;
      //               } else {
      //                 db.collection(this.prof_email)
      //                   .doc("?")
      //                   .get()
      //                   .then(snapshot => {
      //                     const document = snapshot.data();
      //                     this.trivia_is_active = document.trivia_is_active;
      //                     this.response_time = 100;
      //                   });
      //               }
      //             }, 1000);
      //           }
      //         });
      //     }
      //   });

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
.trivia-button {
  background-color: #1e1d20;
  margin-top: 50px;
  font-size: 18px;
  width: 320px;
  height: 160px;
  color: white;
}
.question {
  height: 40px;
}
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
  background-color: #1e1d20;
  margin-top: 0px;
  font-size: 18px;
  width: 320px;
  height: 90px;
  color: white;
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
