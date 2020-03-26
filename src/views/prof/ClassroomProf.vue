<template>
  <div>
    <v-row>
      <div>
        <v-app-bar dense fixed color="white" flat dark absolute clipped-right>
          <v-spacer></v-spacer>
          <v-chip class="ma-2" color="black" text-color="white">
            <v-avatar left>
              <v-icon color="deep-purple accent-3">mdi-atom-variant</v-icon>
            </v-avatar>
            {{ token_balance }}
          </v-chip>

          <v-icon color="deep-purple accent-3">mdi-bell-outline</v-icon>

          <v-icon color="deep-purple accent-3" @click="logout" class="ml-2"
            >mdi-cog-outline</v-icon
          >
        </v-app-bar>
      </div>
    </v-row>
    <v-row class="mt-8">
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
                            <v-subheader v-if="message" :key="index">{{
                              message.sender + ":" + message.message
                            }}</v-subheader>
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
                              >{{ img.title }}</v-btn
                            >
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
                          >{{ video.title }}</v-btn
                        >
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
                          >{{ text.title }}</v-btn
                        >
                      </v-row>
                    </v-col>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-tab-item>
          <v-tab-item>
            <v-container v-if="!trivia_is_active">
              <v-card class="trivias_container">
                <v-row>
                  <v-col v-for="(trivia, i) in trivias" :key="i" cols="4">
                    <v-card
                      class="trivia"
                      @click.stop="renderConfirmationDialog(trivia)"
                      >{{ trivia.question }}</v-card
                    >
                    </v-col>
                    <v-dialog v-model="triviaDialog" width="700">
                      <v-card>
                        <v-card-title color="black" dark primary-title>{{
                          question
                        }}</v-card-title>

                        <v-card-text>
                          <v-list-item two-line>
                            <v-list-item-content>
                              <v-list-item-title>{{
                                answer1
                              }}</v-list-item-title>
                              <v-list-item-subtitle
                                >Respuesta 1</v-list-item-subtitle
                              >
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item two-line>
                            <v-list-item-content>
                              <v-list-item-title>{{
                                answer2
                              }}</v-list-item-title>
                              <v-list-item-subtitle
                                >Respuesta 2</v-list-item-subtitle
                              >
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item two-line>
                            <v-list-item-content>
                              <v-list-item-title>{{
                                answer3
                              }}</v-list-item-title>
                              <v-list-item-subtitle
                                >Respuesta 3</v-list-item-subtitle
                              >
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item two-line>
                            <v-list-item-content>
                              <v-list-item-title>{{
                                answer4
                              }}</v-list-item-title>
                              <v-list-item-subtitle
                                >Respuesta 4</v-list-item-subtitle
                              >
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item two-line>
                            <v-list-item-content>
                              <v-list-item-title>{{
                                right_answer
                              }}</v-list-item-title>
                              <v-list-item-subtitle
                                >Respuesta Correcta</v-list-item-subtitle
                              >
                            </v-list-item-content>
                          </v-list-item>
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="deep-purple accent-3"
                            text
                            @click="initializeTrivia"
                            >I accept</v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  
                </v-row>
              </v-card>

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
                <h1>{{ question }}</h1>
              </v-row>
              <v-row justify="center">
                <v-progress-circular
                  class="circle"
                  rounded
                  size="220"
                  width="16"
                  color="deep-purple accent-3"
                  :value="response_time"
                  absolute
                  >{{ response_time }}</v-progress-circular
                >
              </v-row>
            </v-container>

            <v-snackbar :vertical="vertical" v-model="snackbar" bottom>
              <h2 class="correct">{{ correct_answers }}</h2>
              <h2 class="incorrect">{{ incorrect_answers }}</h2>
              <v-icon color="deep-purple accent-3" @click="snackbar = false"
                >mdi-close-circle</v-icon
              >
            </v-snackbar>
          </v-tab-item>
        </v-tabs>
        <div></div>
      </v-col>
      <v-col class="col-side">
        <!-- <v-container fluid> -->
        <v-card class="side-bar-right">
          <v-container>
            <v-row justify="center" class="mt-4 mb-6">
              <h3 class="classroom-text">{{ this.classroom }}</h3>
            </v-row>

            <v-carousel
              cycle
              height="50%"
              hide-delimiter-background
              hide-delimiters
              show-arrows-on-hover
            >
              <!-- v-for="(student, i) in top9" :key="i" -->
              <v-carousel-item>
                <v-card color="transparent" height="600">
                  <v-row class="fill-height" align="center" justify="center">
                    <v-list-item dark v-for="(student, i) in top1_9" :key="i">
                      <v-icon color="deep-purple accent-3" class="mr-2"
                        >mdi-numeric-{{ i + 1 }}-circle</v-icon
                      >
                      {{ student.alias + "/" + student.xp }}
                    </v-list-item>
                  </v-row>
                </v-card>
              </v-carousel-item>
              <v-carousel-item>
                <v-card color="transparent" height="600">
                  <v-row class="fill-height" align="center" justify="center">
                    <v-list-item v-for="(student, i) in top10_18" :key="i" dark>
                      <v-icon color="deep-purple accent-3" class="mr-2"
                        >mdi-numeric-{{ i + 10 }}-circle</v-icon
                      >
                      {{ student.alias + "/" + student.xp }}
                    </v-list-item>
                  </v-row>
                </v-card>
              </v-carousel-item>
            </v-carousel>
            <!-- </v-col>
            </v-row> -->
          </v-container>
          <v-container>
            <v-row justify="center" v-if="!boost">
              <v-img
                class="mb-4"
                contain
                src="../../assets/available-boost.png"
                height="100"
                width="100"
              ></v-img>
            </v-row>
            <v-row justify="center" v-if="boost">
              <v-img
                class="mb-4"
                contain
                src="../../assets/active-boost.png"
                height="100"
                width="100"
              ></v-img>
            </v-row>
          </v-container>
        </v-card>
        <!-- </v-container> -->
      </v-col>
    </v-row>
    <!-- <div v-if="confirming_trivia">
      <v-footer absolute color="deep-purple accent-3">
        <v-row justify="center">
          <v-btn outlined dark @click="initializeTrivia">Empezar Trivia</v-btn>
        </v-row>
      </v-footer>
    </div>-->
    <!-- <div v-if="trivia_is_active">
      <v-footer absolute color="deep-purple accent-3">
        <v-row justify="center">
          <v-btn outlined dark @click="finalizeTrivia">Terminar Trivia</v-btn>
        </v-row>
      </v-footer>
    </div>-->
    <!-- <div v-if="class_is_active && !trivia_is_active">
      <v-footer absolute color="deep-purple accent-3">
        <v-row justify="center">
          <v-btn outlined dark @click="initialize_trivia"
            >Terminar Trivia</v-btn
          >
        </v-row>
      </v-footer>
    </div>-->
    <!-- <div v-if="!onclass">
      <v-footer absolute color="deep-purple accent-3">
        <v-row justify="center">
          <v-btn outlined dark @click="initializeClass">Iniciar clase</v-btn>
        </v-row>
      </v-footer>
    </div> -->
    <div v-if="onclass && checking_presence">
      <v-footer absolute color="green accent-4" height="60%">
        <v-row justify="spread-around">
          <v-col cols="4">
            <!-- <v-chip>{{countdown_timer}}</v-chip> -->
          </v-col>
          <v-col cols="4">
            <v-btn outlined color="white">comandos</v-btn>
          </v-col>
          <v-col cols="4">
            <v-avatar color="white">
              {{ remaining_boosts }}
            </v-avatar>
          </v-col>
        </v-row>
      </v-footer>
      <!-- <v-footer absolute color="green accent-4" height="60%">
        <v-row justify="center">
          <v-card flat tile width="200" color="transparent">
            <v-window v-model="onboarding" vertical>
              <v-window-item v-for="(student, i) in students" :key="i">
                <v-row
                  class="fill-height"
                  align="center"
                  justify="center"
                  tag="v-card-text"
                >
                  <p style="font-size: 18px;" class="white--text ">
                    {{ selected_student.alias }}
                  </p>
                </v-row>
              </v-window-item>
            </v-window>
          </v-card>
            <v-icon color="green">mdi-check-circle</v-icon>
        </v-row>
      </v-footer> -->
    </div>
    <div v-if="!checking_presence && onclass">
      <v-footer absolute color="green accent-4">
        <v-row justify="spread-around">
          <v-col cols="4">
            <!-- <v-chip>{{countdown_timer}}</v-chip> -->
          </v-col>
          <v-col cols="4">
            <v-btn outlined color="white">comandos</v-btn>
          </v-col>
          <v-col cols="4">
            <v-avatar>
              {{ remaining_boosts }}
            </v-avatar>
          </v-col>
        </v-row>
      </v-footer>
    </div>

    <v-snackbar v-model="tableNotif" :timeout="timeout">{{
      table_notif_text
    }}</v-snackbar>
    <v-dialog v-model="survey_time" max-width="500">
      <v-window v-model="survey">
        <v-window-item :value="1" width="300">
          <v-card>
            <v-card-title>
              <v-row justify="center">
                <h3>Califica al grupo</h3>
              </v-row>
            </v-card-title>
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-row justify="center">
                    <v-btn color="deep-purple accent-3">
                      <v-icon color="white" @click="sendSurveyLike">
                        mdi-thumb-up-outline
                      </v-icon>
                    </v-btn>
                  </v-row>
                </v-col>
                <v-col cols="6">
                  <v-row justify="center">
                    <v-btn color="deep-purple accent-3">
                      <v-icon color="white" @click="sendSurveyUnlike">
                        mdi-thumb-down-outline
                      </v-icon>
                    </v-btn>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
            <v-img> </v-img>
          </v-card>
        </v-window-item>
        <v-window-item :value="2" width="500">
          <v-card>
            <v-card-title>
              <v-row justify="center">
                <h3>Notas del grupo</h3>
              </v-row>
            </v-card-title>
            <v-container>
              <v-row justify="center">
                <v-container>
                  <v-textarea
                    outlined
                    color="deep-purple accent-3"
                    v-model="group_note"
                  >
                  </v-textarea>
                </v-container>
              </v-row>
              <v-card-actions>
                <v-btn
                  text
                  color="deep-purple accent-3"
                  @click="sendGroupNotes"
                >
                  Enviar
                </v-btn>
              </v-card-actions>
            </v-container>
            <v-img> </v-img>
          </v-card>
        </v-window-item>
      </v-window>
    </v-dialog>
  </div>
</template>

<script>
import { CometChat } from "@cometchat-pro/chat";
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
      token_balance: 0,
      remaining_boosts: 3,
      // countdown_timer:
      onclass: null,
      survey: 1,
      group_note: null,
      survey_time: false,
      top1_9: [
        { alias: "alumno1", xp: 150 },
        { alias: "alumno1", xp: 150 },
        { alias: "alumno1", xp: 150 },
        { alias: "alumno1", xp: 150 },
        { alias: "alumno1", xp: 150 },
        { alias: "alumno1", xp: 150 },
        { alias: "alumno1", xp: 150 },
        { alias: "alumno1", xp: 150 },
        { alias: "alumno1", xp: 150 }
      ],
      top10_18: [
        { alias: "alumno2", xp: 150 },
        { alias: "alumno2", xp: 150 },
        { alias: "alumno2", xp: 150 },
        { alias: "alumno2", xp: 150 },
        { alias: "alumno2", xp: 150 },
        { alias: "alumno2", xp: 150 },
        { alias: "alumno2", xp: 150 },
        { alias: "alumno2", xp: 150 },
        { alias: "alumno2", xp: 150 }
      ],
      top19_27: [
        "alumno1/15200xp",
        "alumno1/15200xp",
        "alumno1/15200xp",
        "alumno1/15200xp",
        "alumno1/15200xp",
        "alumno1/15200xp",
        "alumno1/15200xp",
        "alumno1/15200xp",
        "alumno1/15200xp"
      ],
      triviaDialog: false,
      boost: false,
      subject: null,
      tableNotif: false,
      timeout: 2500,
      table_notif_text: "Solo puedes elegir una Trivia",
      confirming_trivia: null,
      checking_presence: null,
      selected_student: null,
      group_quantity: null,
      onboarding: 0,
      class_is_active: null,
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
      response_time: 100,
      vertical: true,
      img_resources: null,
      video_resources: null,
      text_resources: null,
      snackbar: null,
      trivia_results: null,
      trivias: [],
      classroom: this.$route.params.id,
      classroom_stream: null,
      correct_percentage: null,
      incorrect_percentage: null,
      correct_answers: null,
      incorrect_answers: null,
      trivia_is_active: null,
      student_checked: null,
      students: [],
      prof_email: null,
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
      school_name: "stj",
      prof_name: null,
      level: null,
      user: null,
      pre_prof_name: null
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
  async mounted() {
    // this.prof = this.$route.params.id;
    // this.transmision =
    await firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("user", user.email);
        this.user = user.email;
        this.prof_email = user.email;
        db.collection("usuarios")
          .doc(user.email)
          .get()
          .then(snapshot => {
            const document = snapshot.data();
            console.log("prof-doc", document);
            this.level = document.level;
            this.subject = document.subject;
            this.pre_prof_name = document.name;
            this.prof_name = this.pre_prof_name.replace(" ", "_");
            this.classroom_stream =
              "https://player.twitch.tv/?channel=" +
              this.school_name +
              "_" +
              this.prof_name +
              "&muted=true";
              // db.collection(this.school_name + "-" + this.$route.params.id + "-students")
            db.collection(
              this.school_name + "-" + this.$route.params.id + "-students"
            )
              // .orderBy("xp", "desc")
              // .limit(9)
              .get()
              .then(querySnapshot => {
                const documents = querySnapshot.docs.map(doc => doc.data());
                console.log("student-docs", documents);
                this.group_quantity = documents.length;
                this.students = documents;
                 this.selected_student = this.students[this.onboarding];
     
                db.collection(this.prof_email)
                  .doc("?")
                  .get()
                  .then(snapshot => {
                    const document = snapshot.data();
                    console.log("trivia-profDocument", document);
                    //aqui puede ser l rewvez primero el check de si esta a actica la clase y luego la trivia
                    if (document.trivia_is_active === true) {
                      this.trivia_is_active = true;
                    } else {
                      this.trivia_is_active = false;
                      db.collection(
                        this.school_name + "-" + this.level + "-professors"
                      )
                        .doc(this.pre_prof_name)
                        .get()
                        .then(snapshot => {
                          const document = snapshot.data();
                          console.log("si llego");
                          if (document.onclass === true && document.checking_presence === true) {
                            console.log("si llego");
                            this.onclass = true
                            this.checking_presence = true
                          } 
                          else if(document.onclass === true && document.checking_presence === false) {
                            this.onclass = true
                            this.checking_presence = true
                          }
                        });
                    }
                  });
              });
          });

        this.getTrivias();
        let ref = db
          .collection(this.$route.params.id + "-messages")
          .orderBy("timestamp");
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
              console.log(
                "doc-msg",
                doc.data().message,
                "doc.time",
                moment(doc.data().timestamp).format("LTS")
              );
              console.log(
                "time",
                Date.Now >= moment(Date.now() - 3000).format("LTS")
              );
            }
          });
        });
        // let refTrivia = db.collection(this.prof_email);
        // // .where()
        // refTrivia.onSnapshot(snapshot => {
        //   snapshot.docChanges().forEach(change => {
        //     console.log("changeType", change);
        //     if ((change.type = "modified")) {
        //       let doc = change.doc;
        //       console.log("changeDoc", doc.data());
        //       this.trivia_is_active = doc.data().trivia_is_active;
        //       this.right_answer = doc.data().right_answer;
        //       this.correct_answers = doc.data().correct_answers;
        //       this.incorrect_answers = doc.data().incorrect_answers;
        //     }
        //   });
        // });
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
    boostSender(){
      db.collection(this.classroom + "-messages")
        .add({
          sender: this.user,
          message: this.msg,
          timestamp: Date.now()
        })
        .catch(err => console.log("error", err))
        .then(() => {
          if (this.msg === "impulso") {
            this.boost = true;
            setTimeout(() => {
              this.boost = false;
            }, 3000);
          }
          // este add en inicializar clase
          // por eso el loading

          this.msg = "";
        });
    },
    activateSurveys() {
      this.survey_time = true;
    },
    sendSurveyLike() {
      const increment = firebase.firestore.FieldValue.increment(1);
      const surveyLikesRef = db
        .collection(this.classroom + "-stats")
        .doc("likes");
      const batch = db.batch();
      batch.set(surveyLikesRef, { like: increment }, { merge: true });
      batch.commit().then(() => {
        console.log("mision likes cumplida");
        this.survey++;
      });
    },
    sendSurveyUnlike() {
      const increment = firebase.firestore.FieldValue.increment(1);
      const surveyUnlikesRef = db
        .collection(this.classroom + "-stats")
        .doc("unlikes");
      const batch = db.batch();
      batch.set(surveyUnlikesRef, { unlike: increment }, { merge: true });
      batch.commit().then(() => {
        console.log("mision likes cumplida");
        this.survey++;
      });
    },
    sendGroupNotes() {
      db.collection(this.classroom)
        .doc("notes")
        .set({
          note: this.group_note
        })
        .then(() => {
          this.survey_time = false;
        });
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
    },
    renderConfirmationDialog(trivia) {
      // if (this.confirming_trivia === null) {
      // trivia.selected = !trivia.selected;

      // this.confirming_trivia = true;
      this.triviaDialog = true;
      this.question = trivia.question;
      this.answer1 = trivia.answer1;
      this.answer2 = trivia.answer2;
      this.answer3 = trivia.answer3;
      this.answer4 = trivia.answer4;
      this.right_answer = trivia.right_answer;
      // } else {
      //   this.tableNotif = true;
      // }
    },
    validatePresence() {
        
      db.collection(this.school_name + "-" + this.classroom + "-students")
        .doc(this.selected_student.email)
        .update({ is_present: true })
        .then(() => {

          const increment = firebase.firestore.FieldValue.increment(10);
          const xpRef = db
            .collection(this.school_name + "-" + this.classroom + "-students")
            .doc(this.selected_student.email);
          const batch = db.batch();
          batch.set(xpRef, { xp: increment }, { merge: true });
          batch.commit().then(() => {
             this.onboarding =
        this.onboarding + 1 === this.group_quantity ? 0 : this.onboarding + 1;
            console.log("mision cumplida")
             if (this.onboarding === this.students.length - 1) {
        db.collection(this.school_name + "-" + this.level + "-professors")
          .doc(this.pre_prof_name)
          .update({ checking_presence: false })
          // try this with slow connection
          .then(() => {
            db.collection(
              this.school_name + "-" + this.classroom + "-students"
            );
                        this.checking_presence = false;
          });
      } else {
        console.log('no es el ultimo')
      }
          });
        });
     
      // esto era next no habia validate 
   
    },
    // prev() {
    //   this.onboarding =
    //     this.onboarding - 1 < 0 ? this.length - 1 : this.onboarding - 1;
    // },

    initializeClass() {
      db.collection(this.classroom + "-messages")
        .add({
          sender: this.user,
          message: this.msg,
          timestamp: Date.now()
        })
        .catch(err => console.log("error", err))
        .then(() => {
          if (this.msg === "iniciar clase") {
db.collection(this.school_name + "-" + this.level + "-professors")
        .doc(this.pre_prof_name)
        .update({
          onclass: true,
          checking_presence: true
        })
        .then(() => {
         // enviamos y traemos estado de db
          db.collection(this.school_name + "-" + this.level + "-professors")
            .doc(this.pre_prof_name)
            .get()
            .then(snapshot => {
              const document = snapshot.data();
              console.log("profDoc", document);
              if (
                document.checking_presence === true &&
                document.onclass === true
              ) {
                this.checking_presence = true;
                this.onclass = true;
              } else if (
                document.checking_presence === false &&
                document.onclass === false
              ) {
                this.checking_presence = false;
                this.onclass = false;
              }
            });
        });
          }
          this.msg = "";
        }); 
    },
    finalizeClass() {
        db.collection(this.classroom + "-messages")
        .add({
          sender: this.user,
          message: this.msg,
          timestamp: Date.now()
        })
        .catch(err => console.log("error", err))
        .then(() => { 
          if (this.msg === 'terminar clase') {
             db.collection(this.school_name + "-" + this.level + "-professors")
        .doc(this.pre_prof_name)
        // cheking presence ya se finzalizo cyando termino el pas de lista
        .update({  onclass: false })
        .then(() => {
          db.collection(this.school_name + "-" + this.level + "-professors")
            .doc(this.pre_prof_name)
            .get()
            .then(snapshot => {
              const document = snapshot.data();
              console.log("profDoc", document);
              if (document.onclass === false) {
                // aqui checamos el estado en la db y luego lo coordinamos con el front
                this.onclass = false
                this.activateSurveys();
              }
            });
        });
          }      
        })
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
      this.trivia_is_active = false;
      this.snackbar = true;

      db.collection(this.school_name + "-" + this.classroom + "-students")
        .where("right", "==", true)
        .get()
        .then(querySnapshot => {
          const documents = querySnapshot.docs.map(doc => doc.data());
          console.log("correctos", documents.length);
          this.correct_answers = documents.length;
          // this.incorrect_answers = this.correct_answers - this.length;
          db.collection(this.school_name + "-" + this.classroom + "-students")
            .where("right", "==", false)
            .get()
            .then(querySnapshot => {
              const documents = querySnapshot.docs.map(doc => doc.data());
              console.log("incorrectos", documents.length);
              this.incorrect_answers = documents.length;
              db.collection(this.prof_email)
                .doc("?")
                .update({ trivia_is_active: false });
              const increment = firebase.firestore.FieldValue.increment(
                this.correct_answers
              );
              const statsRef = db
                .collection("trivia-stats")
                .doc(this.classroom);
              const batch = db.batch();
              batch.set(statsRef, { aciertos: increment }, { merge: true });
              batch.commit().then(() => {
                //  this.pre_prof_name = document.name;
                // this.prof_name = this.pre_prof_name.replace(" ", "_");
                //   let replacedAnswers = this.incorrect_answers.replace("-", "")
                // console.log('replaced',replacedAnswers)

                const increment2 = firebase.firestore.FieldValue.increment(
                  this.incorrect_answers
                );
                const statsRef2 = db
                  .collection("trivia-stats")
                  .doc(this.classroom);
                const batch2 = db.batch();
                batch2.set(statsRef2, { fallas: increment2 }, { merge: true });
                batch2.commit().then(() => {
                  console.log("mision stats cumplida");
                });
              });
              //   this.pre_prof_name = document.name;
              // this.prof_name = this.pre_prof_name.replace(" ", "_");

              // this.trivia_is_active = false;
              db.collection(
                this.school_name + "-" + this.classroom + "-students"
              )
                .get()
                .then(querySnapshot => {
                  const documents = querySnapshot.docs.map(doc => {
                    db.collection(
                      this.school_name + "-" + this.classroom + "-students"
                    )
                      .doc(doc.id)
                      //wrong too
                      .update({ right: null, answered: true })
                      .then(() => {});
                  });
                });

              // aqui enviar info
            });
        });
    },
    // hacer otra coleccion para los resultados?
    initializeTrivia(trivia) {
      this.triviaDialog = false;
      const countdown = setInterval(() => {
        if (this.response_time > 0) {
          const time = this.response_time;
          this.response_time = time - 10;
        } else {
          this.finalizeTrivia();
          db.collection(this.prof_email)
            .doc("?")
            .update({ trivia_is_active: false });

          clearInterval(countdown);
          this.response_time = 100;
        }
      }, 1000);
      db.collection(this.prof_email)
        .doc("?")
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
        });
      this.trivia_is_active = true;

      // db.collection(this.school_name + "-" + this.level + "-students")
      //   // .where("right", "==", true)
      //   .get()
      //   .then(querySnapshot => {
      //     const documents = querySnapshot.docs.map(doc => doc.data());
      db.collection(this.school_name + "-" + this.classroom + "-students")
        .get()
        .then(querySnapshot => {
          const documents = querySnapshot.docs.map(doc => {
            db.collection(this.school_name + "-" + this.classroom + "-students")
              .doc(doc.id)
              .update({ answered: false });
            console.log("trivia initialized");
          });
        });
      // aqui enviar info
    },
    // validatePresence(student) {
    //   this.student_checked = true;
    //   console.log("student", student.alias);
    //   const increment = firebase.firestore.FieldValue.increment(20);
    //   const xpRef = db
    //     .collection(this.classroom + "-students")
    //     .doc(student.alias);
    //   const batch = db.batch();
    //   batch.set(xpRef, { xp: increment }, { merge: true });
    //   batch.commit().then(() => {
    //     console.log("mision cumplida");
    //   });
    // },
    submit() {
      db.collection(this.classroom + "-messages")
        .add({
          sender: this.user,
          message: this.msg,
          timestamp: Date.now()
        })
        .catch(err => console.log("error", err))
      if (this.msg === "iniciar clase") {
        console.log('llego antes de init')
        this.initializeClass();
      } else if (this.msg === "terminar clase") {
        this.finalizeClass();
      } else if (this.msg === "impulso"){
        this.boostSender()
      }
        else if (this.msg === this.selected_student.alias) {
        this.validatePresence();
      } else {
        console.log("no funcionó");
      }

      
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
      db.collection(this.prof_email);

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
.classroom-text {
  color: white;
}
.finalize-class-btn {
  margin: 20px 0px;
}
.trivias_container {
  overflow: auto;
  height: 35vh;
  width: 100%;
}
.trivia {
  height: 80px;
  width: 240px;
  color: white;
  background-color: #1e1d20;
  font-size: 20px;
}
.circle {
  font-size: 38px;
  font-style: bold;
}
.line {
  min-width: 150px;
  max-width: 150px;
}
.headers {
  border-bottom: 0.5px solid rgba(51, 54, 52, 0.397);
  padding: 10px 0px;
}
.selected {
  background: rgba(0, 255, 102, 0.49);
  color: black;
}
.chat-card {
  max-height: 28vh;
}
.sidebar-classroom {
  color: white;
  font-size: 24px;
  text-align: center;
  margin-top: 0px;
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
  margin-top: 5%;
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
  height: 20vh;
  overflow: auto;
  width: 100%;
}

.ChatCard {
  height: 20vh;
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

<!-- <v-card>
                    <table style="width:100%">
                      <tr>
                        <th v-for="header in headers" :key="header.id" class="headers">{{ header }}</th>
                      </tr>
                      <tr
                        v-for="trivia in trivias"
                        :key="trivia.id"
                        :class="{ selected: trivia.selected }"
                        @click="renderConfirmationBar(trivia)"
                      >
                        <td class="tableText">{{ trivia.question }}</td>
                        <td class="tableText" @click="log(trivia.answer1)">{{ trivia.answer1 }}</td>
                        <td class="tableText">{{ trivia.answer2 }}</td>
                        <td class="tableText">{{ trivia.answer3 }}</td>
                        <td class="tableText">{{ trivia.answer4 }}</td>
                        <td class="tableText">{{ trivia.right_answer }}</td>
                      </tr>
                    </table>
                  </v-card> -->
