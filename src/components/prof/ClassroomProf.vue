<template>
  <div>
    <v-row>
      <v-col align="center" cols="10">
        <v-container>
          <v-card class="TwitchPlayer">
            <iframe
              :src="classroom_stream"
              height="100%"
              width="100%"
              frameborder="0"
              scrolling="no"
              allowfullscreen="true"
            ></iframe>
          </v-card>
        </v-container>
        <!-- tabs ----------------------------------------------------------------__________----_------------>
        <v-tabs centered color="deep-purple accent-3">
          <v-tab @click="renderChat">Chat</v-tab>
          <v-tab @click="renderResources">Recursos</v-tab>
          <v-tab @click="renderTrivia">Trivias</v-tab>
          <!-- <v-tab @click="renderEstadisticas">estadisticas</v-tab> -->

          <v-tab-item>
            <v-container class="chat-card">
              <v-row>
                <v-col>
                  <v-card>
                    <v-col>
                      <v-row>
                        <v-list ref="chat" id="logs">
                          <template v-for="(message, index) in messages">
                            <v-subheader v-if="message" :key="index">
                              {{ message.sender + ":" + message.message }}
                            </v-subheader>
                          </template>
                        </v-list>
                      </v-row>
                      <v-divider></v-divider>
                      <v-row class="mt-6">
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
                    </v-col>
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
                        <v-icon color="deep-purple accent-3" class="mb-4"
                          >mdi-image</v-icon
                        >
                      </v-row>
                      <v-row justify="center">
                        <v-col>
                          <v-row justify="center">
                            <v-btn
                              v-for="(img, index) in img_resources"
                              :key="index"
                              text
                              :href="img.url"
                            >
                              {{ img.title }}
                            </v-btn>
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
                        <v-icon color="deep-purple accent-3" class="mb-4"
                          >mdi-play-box</v-icon
                        >
                      </v-row>
                      <v-row justify="center">
                        <v-btn
                          v-for="(video, index) in video_resources"
                          :key="index"
                          text
                          :href="video.url"
                        >
                          {{ video.title }}
                        </v-btn>
                      </v-row>
                    </v-col>
                  </v-card>
                </v-col>
                <v-col cols="4">
                  <v-card>
                    <v-col>
                      <v-row justify="center">
                        <v-icon color="deep-purple accent-3" class="mb-4"
                          >mdi-text</v-icon
                        >
                      </v-row>
                      <v-row justify="center">
                        <v-btn
                          v-for="(text, index) in text_resources"
                          :key="index"
                          text
                          :href="text.url"
                        >
                          {{ text.title }}
                        </v-btn>
                      </v-row>
                    </v-col>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-tab-item>
          <v-tab-item>
            <v-container>
              <v-row>
                <v-col>
                  <v-card>
                    <table style="width:100%">
                      <tr>
                        <th
                          v-for="header in headers"
                          :key="header.id"
                          class="headers"
                        >
                          {{ header }}
                        </th>
                      </tr>
                      <!-- <v-divider color="primary"></v-divider> -->
                      <tr
                        v-for="trivia in trivias"
                        :key="trivia.id"
                        :class="{ selected: trivia.selected }"
                        @click="renderConfirmationBar(trivia)"
                      >
                        <td class="tableText">{{ trivia.question }}</td>
                        <td class="tableText" @click="log(trivia.answer1)">
                          {{ trivia.answer1 }}
                        </td>
                        <td class="tableText">{{ trivia.answer2 }}</td>
                        <td class="tableText">{{ trivia.answer3 }}</td>
                        <td class="tableText">{{ trivia.answer4 }}</td>
                        <td class="tableText">{{ trivia.right_answer }}</td>
                      </tr>
                    </table>
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

            <v-snackbar :vertical="vertical" v-model="snackbar" bottom>
              <h2 class="correct">{{ correct_answers }}</h2>
              <h2 class="incorrect">{{ incorrect_answers }}</h2>
              <v-icon color="deep-purple accent-3" @click="snackbar = false">
                mdi-close-circle
              </v-icon>
            </v-snackbar>
          </v-tab-item>
        </v-tabs>
        <div></div>
      </v-col>
      <v-col class="col-side">
        <!-- <v-container fluid> -->
        <v-card class="side-bar-right">
          <v-container>
            <v-row justify="center">
              <v-col>
                <h1 class="sidebar-classroom">A-1</h1>
                <v-row justify="center">
                  <v-list-item dark>
                    <v-list-content>
                      <v-list-title>
                        <v-icon color="deep-purple accent-3" class="mr-2"
                          >mdi-numeric-1-circle</v-icon
                        >{{ "Alumno/12000 " }}
                      </v-list-title>
                    </v-list-content>
                  </v-list-item>
                  <v-list-item dark>
                    <v-list-content>
                      <v-list-title>
                        <v-icon color="deep-purple accent-3" class="mr-2"
                          >mdi-numeric-2-circle</v-icon
                        >{{ "Alumno/10050 " }}
                      </v-list-title>
                    </v-list-content>
                  </v-list-item>
                  <v-list-item dark>
                    <v-list-content>
                      <v-list-title>
                        <v-icon color="deep-purple accent-3" class="mr-2"
                          >mdi-numeric-3-circle</v-icon
                        >
                        {{ "Alumno/2800 " }}
                      </v-list-title>
                    </v-list-content>
                  </v-list-item>
                  <v-list-item dark>
                    <v-list-content>
                      <v-list-title>
                        <v-icon color="deep-purple accent-3" class="mr-2"
                          >mdi-numeric-4-circle</v-icon
                        >
                        {{ "Alumno/2800 " }}
                      </v-list-title>
                    </v-list-content>
                  </v-list-item>
                  <v-list-item dark>
                    <v-list-content>
                      <v-list-title>
                        <v-icon color="deep-purple accent-3" class="mr-2"
                          >mdi-numeric-5-circle</v-icon
                        >
                        {{ "Alumno/2800 " }}
                      </v-list-title>
                    </v-list-content>
                  </v-list-item>
                  <v-list-item dark>
                    <v-list-content>
                      <v-list-title>
                        <v-icon color="deep-purple accent-3" class="mr-2"
                          >mdi-numeric-6-circle</v-icon
                        >
                        {{ "Alumno/2800 " }}
                      </v-list-title>
                    </v-list-content>
                  </v-list-item>
                  <v-list-item dark>
                    <v-list-content>
                      <v-list-title>
                        <v-icon color="deep-purple accent-3" class="mr-2"
                          >mdi-numeric-7-circle</v-icon
                        >
                        {{ "Alumno/2800 " }}
                      </v-list-title>
                    </v-list-content>
                  </v-list-item>
                  <v-list-item dark>
                    <v-list-content>
                      <v-list-title>
                        <v-icon color="deep-purple accent-3" class="mr-2"
                          >mdi-numeric-8-circle</v-icon
                        >
                        {{ "Alumno/2800 " }}
                      </v-list-title>
                    </v-list-content>
                  </v-list-item>
                  <v-list-item dark>
                    <v-list-content>
                      <v-list-title>
                        <v-icon color="deep-purple accent-3" class="mr-2"
                          >mdi-numeric-9-circle</v-icon
                        >
                        {{ "Alumno/2800 " }}
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
              >
              </v-img>
            </v-row>
          </v-container>
        </v-card>
        <!-- </v-container> -->
      </v-col>
    </v-row>
    <div v-if="confirming_trivia">
      <v-footer absolute color="deep-purple accent-3">
        <v-row justify="center">
          <v-btn outlined dark @click="initializeTrivia">Empezar Trivia</v-btn>
        </v-row>
      </v-footer>
    </div>
    <div v-if="trivia_is_active">
      <v-footer absolute color="deep-purple accent-3">
        <v-row justify="center">
          <v-btn outlined dark @click="finalizeTrivia">Terminar Trivia</v-btn>
        </v-row>
      </v-footer>
    </div>
    <!-- <div v-if="class_is_active && !trivia_is_active">
      <v-footer absolute color="deep-purple accent-3">
        <v-row justify="center">
          <v-btn outlined dark @click="initialize_trivia"
            >Terminar Trivia</v-btn
          >
        </v-row>
      </v-footer>
    </div> -->
    <div v-if="!presence_checked">
      <v-footer absolute color="deep-purple accent-3">
        <v-row justify="center">
          <v-btn outlined dark @click="initializeClass">Pasar Lista</v-btn>
        </v-row>
      </v-footer>
    </div>
    <div v-if="checking_presence">
      <v-footer absolute color="deep-purple accent-3">
        <!-- <v-card-actions class="justify-space-between"> -->
        <v-row justify="center">
          <v-btn text @click="next" class="mr-12">
            <v-icon color="red">mdi-close-circle</v-icon>
          </v-btn>
          <v-card flat tile width="200" color="deep-purple accent-3">
            <v-window v-model="onboarding" vertical>
              <v-window-item
                v-for="student in students"
                :key="`card-${student}`"
              >
                <!-- <v-card flat height="100%" color="deep-purple accent-3"> -->
                <v-row
                  class="fill-height"
                  align="center"
                  justify="center"
                  tag="v-card-text"
                >
                  <p style="font-size: 18px;" class="white--text">
                    {{ student.alias }}
                  </p>
                </v-row>
                <!-- </v-card> -->
              </v-window-item>
            </v-window>
          </v-card>
          <v-btn text @click="next" class="ml-12">
            <v-icon color="green">mdi-check-circle</v-icon>
          </v-btn>
        </v-row>
      </v-footer>
    </div>
    <v-snackbar v-model="tableNotif" :timeout="timeout">
      {{ table_notif_text }}
    </v-snackbar>
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
      tableNotif: false,
      timeout: 2500,
      table_notif_text: "Solo puedes elegir una Trivia",
      confirming_trivia: null,
      checking_presence: null,
      selected_student: null,
      length: null,
      onboarding: 0,
      class_is_active: null,
      presence_checked: null,
      model: [],
      data_loading: true,
      headers: [
        "Pregunta",
        "Respuesta 1",
        "Respuesta 2",
        "Respuesta 3",
        "Respuesta 4",
        "Respuesta Correcta"
      ],
      grupos: [
        {
          hora: "¿qué es la energía?",
          lunes: "A-1",
          martes: "B-3",
          miercoles: "E-1",
          jueves: "C-2",
          viernes: "C-1"
        },
        {
          hora: "07:50 - 08:40",
          lunes: "B-1",
          martes: "B-2",
          miercoles: "B-3",
          protein: "A-2",
          viernes: "A-1"
        },
        {
          hora: "9:10 - 10:00",
          lunes: "B-2",
          martes: "C-1",
          miercoles: "A-1",
          protein: "E-2",
          viernes: "B-3"
        },
        {
          hora: "10:00 - 10:50",
          lunes: "A-3",
          martes: "A-3",
          miercoles: "B-2",
          jueves: "E-1",
          viernes: "E-2"
        },
        {
          hora: "10:50 - 11:40",
          lunes: "C-1",
          martes: "C-3",
          miercoles: "A-2",
          jueves: "C-1",
          viernes: "A-1"
        },
        {
          hora: "11:40 - 12:30",
          lunes: "A-2",
          martes: "D-1",
          miercoles: "C-2",
          jueves: "B-3",
          viernes: "A-1"
        },
        {
          hora: "12:50 - 13:40",
          lunes: "C-2",
          martes: "D-2",
          miercoles: "B-1",
          jueves: "A-2",
          viernes: "A-1"
        },
        {
          hora: "13:40 - 14:30",
          lunes: "",
          martes: "E-1",
          miercoles: "B-3",
          jueves: "A-1",
          viernes: "C-2"
        }
      ],
      img_resources: null,
      video_resources: null,
      text_resources: null,
      snackbar: null,
      trivia_results: null,
      trivias: [],
      classroom_stream: null,
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
      tabs: null
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
    // this.classroom_stream = 'https://player.twitch.tv/?channel='+ this.test +'&muted=true'
    this.classroom_stream =
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
        console.log("student-docs", documents);
        this.length = documents.length;
        this.students = documents;
      });
    db.collection(this.classroom + "-trivia")
      .doc("trivia")
      .get()
      .then(snapshot => {
        const document = snapshot.data();
        console.log("triviaDocument", document);
        if (document.trivia_is_active === true) {
          this.trivia_is_active = true;
        }
      });
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
    db.collection("Ingeniería-stjohns")
      .doc("preparatoria")
      .get()
      .then(snapshot => {
        const document = snapshot.data();
        this.checking_presence = document.checking_presence;
        this.presence_checked = document.presence_checked;
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
    renderConfirmationBar(trivia) {
      if (this.confirming_trivia === null) {
        trivia.selected = !trivia.selected;
        this.confirming_trivia = true;
        this.question = trivia.question;
        this.answer1 = trivia.answer1;
        this.answer2 = trivia.answer2;
        this.answer3 = trivia.answer3;
        this.answer4 = trivia.answer4;
        this.right_answer = trivia.right_answer;
      } else {
        this.tableNotif = true;
      }
    },
    next() {
      if (this.onboarding === this.students.length - 1) {
        db.collection("Ingeniería-stjohns")
          .doc("preparatoria")
          .set({ presence_checked: true, checking_presence: false })
          // try this with slow connection
          .then(() => {
            this.presence_checked = true;
            this.checking_presence = false;
          });
      }
      this.selected_student = this.students[this.onboarding];
      this.onboarding =
        this.onboarding + 1 === this.length ? 0 : this.onboarding + 1;
      db.collection(this.classroom + "-students")
        .doc(this.selected_student.alias)
        .update({ is_present: true })
        .then(() => {
          const increment = firebase.firestore.FieldValue.increment(20);
          const xpRef = db
            .collection(this.classroom + "-students")
            .doc(this.selected_student.alias);
          const batch = db.batch();
          batch.set(xpRef, { xp: increment }, { merge: true });
          batch.commit().then(() => {
            console.log("mision cumplida");
          });
        });
    },
    prev() {
      this.onboarding =
        this.onboarding - 1 < 0 ? this.length - 1 : this.onboarding - 1;
    },

    initializeClass() {
      db.collection("Ingeniería-stjohns")
        .doc("preparatoria")
        .set({
          checking_presence: true
        })
        .then(() => {
          db.collection("Ingeniería-stjohns")
            .doc("preparatoria")
            .get()
            .then(snapshot => {
              const document = snapshot.data();
              console.log("classroomDoc", document);
              if (document.checking_presence === true) {
                this.checking_presence = true;
              }
            });
        });
    },
    showTrivia(trivia) {
      console.log("trivia", trivia.question);
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
    finalizeTrivia() {
      // esto va despues de que se actulizo firestore
      // this.trivia_is_active = false;

      db.collection(this.classroom + "-students")
        .where("right", "==", true)
        .get()
        .then(querySnapshot => {
          const documents = querySnapshot.docs.map(doc => doc.data());
          console.log("correctos", documents.length);
          this.correct_answers = documents.length;
          this.snackbar = true;
          db.collection(this.classroom + "-students")
            .get()
            .then(querySnapshot => {
              const documents = querySnapshot.docs.map(doc => {
                db.collection(this.classroom + "-students")
                  .doc(doc.id)
                  .update({ right: null })
                  .then(() => {
                    db.collection(this.classroom + "-trivia")
                      .doc("trivia")
                      .update({ trivia_is_active: false });
                    this.trivia_is_active = false;
                  });
              });
            });

          // aqui enviar info
        });
    },
    // hacer otra coleccion para los resultados?
    initializeTrivia(trivia) {
      db.collection(this.classroom + "-trivia")
        .doc("trivia")
        .set({
          confirming_trivia: false,
          trivia_is_active: true,
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
          this.trivia_is_active = true;
          db.collection(this.classroom + "-students")
            .where("right", "==", true)
            .get()
            .then(querySnapshot => {
              const documents = querySnapshot.docs.map(doc => doc.data());
              db.collection(this.classroom + "-students")
                .get()
                .then(querySnapshot => {
                  const documents = querySnapshot.docs.map(doc => {
                    db.collection(this.classroom + "-students")
                      .doc(doc.id)
                      .update({ answered: false });
                    this.confirming_trivia = false;
                  });
                });
              // aqui enviar info
            });
          console.log("sent trivia");
        });
    },
    validatePresence(student) {
      this.student_checked = true;
      console.log("student", student.alias);
      const increment = firebase.firestore.FieldValue.increment(20);
      const xpRef = db
        .collection(this.classroom + "-students")
        .doc(student.alias);
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

    // fillmeht
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
.headers {
  border-bottom: 0.5px solid rgba(51, 54, 52, 0.397);
  padding: 10px 0px;
}
.selected {
  background: rgba(0, 255, 102, 0.49);
  color: black;
}
.chat-card {
  max-height: 32vh;
}
.sidebar-classroom {
  color: white;
  font-size: 24px;
  text-align: center;
  margin-top: -14px;
  margin-bottom: 12px;
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
.side-bar-right {
  border-left: 1px solid #e3e0e0;
  background-color: #1e1d20;
  width: 100%;
}
.tableText {
  text-align: center;
}

.correct {
  font-size: 46px;
  color: green;
}
.incorrect {
  font-size: 46px;
  color: red;
}
#logs {
  height: 32vh;
  overflow: auto;
  width: 100%;
}

.ChatCard {
  height: 32vh;
  width: 100%;
  margin-top: 20px;
}
.TwitchPlayer {
  height: 41vh;
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
