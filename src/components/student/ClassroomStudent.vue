<template>
  <div class="div1">
    <v-col align="center">
      <!-- tabs ----------------------------------------------------------------__________----_------------>

      <v-tabs centered color="deep-purple accent-3">
        <v-tab @click="renderTransmision">
          transmisión
        </v-tab>
        <v-tab @click="renderResources">
          Recursos
        </v-tab>
        <v-tab @click="renderTrivia">
          Trivia
        </v-tab>
        <v-tab @click="renderEstadisticas">
          estadisticas
        </v-tab>

        <v-tab-item>
          <v-container>
            <v-row>
              <v-card class="TwitchPlayer">
                <iframe
                  src="https://player.twitch.tv/?channel=grapho&muted=true"
                  height="100%"
                  width="100%"
                  frameborder="0"
                  scrolling="no"
                  allowfullscreen="true"
                >
                </iframe>
              </v-card>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-card>
                        <v-list ref="chat" id="logs">
                          <template v-for="(message, index) in messages">
                            <v-subheader v-if="message" :key="index">
                              {{
                              message.sender + ':' + message.message
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
              <v-col cols="6">
                <v-card class="ChatCard">
                  <v-list ref="chat" id="logs2">
                    <template v-for="(item, index) in logs2">
                      <v-subheader v-if="item" :key="index">{{
                        item
                      }}</v-subheader>
                    </template>
                  </v-list>
                  <v-card-actions>
                    <!-- <v-form @submit.prevent="submit"> -->
                    <v-container>
                      <v-row>
                        <v-col cols="10">
                          <v-text-field
                            dense
                            v-model="nota"
                            label="Nota"
                            outlined
                            color="deep-purple accent-3"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="2">
                          <v-btn
                            dark
                            color="deep-purple accent-3"
                            @click="submitNota"
                          >
                            Guardar
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
        <v-tab-item>
          <h2>recursos</h2>
          <a href="https://www.github.com"> github</a>
        </v-tab-item>
        <v-tab-item>
          <v-container>
            <v-row>
              <v-col>
                <v-dialog v-model="dialogTrivia" width="500">
                  <template v-slot:activator="{ on }">
                    <v-btn
                      v-on="on"
                      dark
                      outlined
                      class="mx-auto"
                      max-width="240"
                      color="deep-purple accent-3"
                    >
                      ¿Qué es la energía?
                    </v-btn>
                  </template>
                  <v-card>
                    <v-container>
                      <v-row justify="center">
                        <v-col>
                          <h2>¿Qué es la energía?</h2>
                          <v-row>
                            <v-col cols="12">
                              <v-text-field
                                label="respuesta 1"
                                placeholder="ya tu sabe"
                              ></v-text-field>
                              <v-text-field
                                label="respuesta 2"
                                placeholder="esa mera"
                              ></v-text-field>
                              <v-text-field
                                label="respuesta 3"
                                placeholder="esta es"
                              ></v-text-field>
                              <v-text-field
                                label="respuesta 4"
                                placeholder="es la vida"
                              ></v-text-field>
                              <v-row justify-center align-center>
                                <v-select
                                  outlined
                                  label="respuestaCorrecta"
                                  :items="respuestas"
                                >
                                </v-select>
                              </v-row>
                              <v-card-actions>
                                <v-row justify="center">
                                  <v-btn
                                    @click="renderSelectedTrivia"
                                    text
                                    color="deep-purple accent-3"
                                  >
                                    Asignar
                                  </v-btn>
                                </v-row>
                              </v-card-actions>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card>
                </v-dialog>
              </v-col>
              <v-col>
                <v-btn
                  outlined
                  dark
                  class="mx-auto"
                  max-width="240"
                  color="deep-purple accent-3"
                >
                  ¿Quién es el presidente?
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn
                  dark
                  outlined
                  class="mx-auto"
                  max-width="240"
                  color="deep-purple accent-3"
                >
                  ¿Qué es una economía?
                </v-btn>
              </v-col>
              <v-col>
                <v-btn
                  dark
                  outlined
                  class="mx-auto"
                  max-width="240"
                  color="deep-purple accent-3"
                >
                  ¿Qué es el dinero?
                </v-btn>
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

        <v-tab-item>
          <v-container>
            <v-row>
              <v-btn
                @click="renderTopIntellectualStats"
                dark
                v-on="on"
                class="mx-auto"
                max-width="240"
                color="deep-purple accent-3"
                outlined
              >
                Estado Intelectual
              </v-btn>
              <v-btn
                @click="renderTopEmotionalStats"
                dark
                v-on="on"
                class="mx-auto"
                max-width="240"
                color="deep-purple accent-3"
                outlined
              >
                Estado Emocional
              </v-btn>
            </v-row>
          </v-container>
        </v-tab-item>
      </v-tabs>
      <div v-if="resources"></div>
    </v-col>
  </div>
</template>

<script>
import { CometChat } from '@cometchat-pro/chat'
import { db } from "../../db";
import firebase from "firebase";
import LineChart from "../../LineChart";
import Vue from "vue";
import VueApexCharts from "vue-apexcharts";
Vue.component("apexchart", VueApexCharts);

export default {
  components: {
    LineChart
  },

  data() {
    return {
      messages:[],
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
      respuestas: ["ya tu sabe", "esa mera", "esta es", "es la vida"],
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
    firebase.auth().onAuthStateChanged(user => {
      this.user = user.email;
      console.log("user", this.user);
    });
    setInterval(() => {
      db.collection(this.classroom + "-messages")
        .get()
        .then(querySnapshot => {
          const documents = querySnapshot.docs.map(doc => doc.data());
          console.log("message-documents", documents);
          this.messages = documents;
    }
        ), 1500}
    )
   
  },
  mounted() {
    this.fillData();
  },
  methods: {
   
    submit() {
      db.collection(this.classroom + "-messages")
        .add({
          sender: this.user,
          message: this.msg
        })
        .then(() => {  
              this.msg = ''

          db.collection(this.classroom + "-messages")
            .get()
            .then(querySnapshot => {
              const documents = querySnapshot.docs.map(doc => doc.data());
              console.log("message-documents", documents);
              this.messages = documents;
            });
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
}
;
</script>

<style lang="scss" scoped>
#logs {
  height:   180px;
  overflow: auto;
}
#logs2 {
  height: 180px;
  overflow: auto;
}
.ChatCard {
  height: 30vh;
  width: 100%;
  margin-top: 20px;
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
