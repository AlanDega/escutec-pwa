<template>
  <div class="div1">
    <v-container class="daContain">
      <v-row>
        <v-col align="center">
          <v-card class="whiteboard">
            <div v-if="recursos">
              Elige un recurso
            </div>
            <div v-if="selected_image">
              <v-img
                contain
                width="100%"
                max-height="300px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              >
              </v-img>
            </div>
            <div v-if="selected_video" class="divFrame">
              <iframe
                id="ytplayer"
                type="text/html"
                width="100%"
                height="100%"
                src="http://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http://example.com"
                frameborder="0"
              />
            </div>
            <div v-if="selected_link"></div>
            <div v-if="selected_homework">
              <v-container>
                <v-row justify="center" align="center">
                  <v-text>Tareas asignadas al salón A-1</v-text>
                </v-row>
                <v-row>
                  <v-col>
                    <v-card
                      dark
                      class="mx-auto"
                      max-width="240"
                      color="deep-purple accent-3"
                    >
                      <v-system-bar
                        color="deep-purple accent-2"
                        height="5px"
                        dark
                      >
                      </v-system-bar>

                      <v-card-title>
                        <v-row justify="center">
                          <v-text>Tarea 1</v-text>
                        </v-row>
                      </v-card-title>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </div>
            <div></div>
            <div v-if="selected_trivia">
              <v-container>
                <v-row>
                  <v-col>
                    <v-text> ¿Qué es la energía? </v-text>
                    <v-row>
                      <v-col cols="6">
                        <v-text>Respuesta Correcta:</v-text>
                        <v-text>Es la vida</v-text>
                      </v-col>
                      <v-col cols="6">
                        <v-text>Resultados</v-text>
                        <apexchart
                          type="donut"
                          height="150"
                          :options="chartOptions"
                          :series="series"
                        />
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </div>
            <div v-if="tareas">
              <v-container>
                <v-row justify="center" align="center">
                  <v-text>Tareas Asignadas del salón A-1</v-text>
                </v-row>
              </v-container>
            </div>
            <div v-if="trivia">
              Elige la trivia
            </div>
            <div v-if="transmision" height="100%">
              <iframe
                src="https://player.twitch.tv/?channel=sofiKimmy&muted=true"
                height="500px"
                width="100%"
                frameborder="0"
                scrolling="no"
                allowfullscreen="true"
              >
              </iframe>
            </div>
            <div v-if="estadisticas">
              elige el tipo de estadisticas
            </div>
            <div v-if="selected_intel_state" class="small">
              <v-row>
                <v-col cols="6">
                  <line-chart
                    :chart-data="datacollection"
                    class="chart_style"
                  ></line-chart>
                </v-col>
                <v-col cols="6">
                  <line-chart
                    :chart-data="datacollection2"
                    class="chart_style"
                  ></line-chart>
                </v-col>
              </v-row>
            </div>
            <div v-if="selected_emotional_state" class="small">
              <v-row>
                <v-col>
                  <line-chart
                    :chart-data="datacollection3"
                    class="chart_style"
                  ></line-chart>
                </v-col>
              </v-row>
            </div>
          </v-card>
          <!-- tabs ----------------------------------------------------------------__________----_------------>
          <v-card class="dashboard">
            <v-tabs centered color="deep-purple accent-3">
              <v-tab @click="renderStudentResourcesTab">
                Recursos
              </v-tab>
              <v-tab @click="renderChatTab">
                Chat
              </v-tab>
              <v-tab @click="renderStudentTriviaTab">
                Trivia
              </v-tab>
              <v-tab @click="renderStudentTransmisionTab">
                transmisión
              </v-tab>
              <v-tab @click="renderStudentStatsTab">
                estadisticas
              </v-tab>

              <v-tab-item>
                <div v-if="images">
                  <v-card flat @click="viewImage">
                    <v-img
                      class="white--text align-end"
                      height="200px"
                      max-width="20%"
                      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                    >
                      <v-card-title>Recurso1</v-card-title>
                    </v-img>
                  </v-card>
                </div>
                <div v-if="videos">
                  <v-card flat @click="viewVideo">
                    <iframe
                      @click="viewVideo"
                      id="ytplayer"
                      type="text/html"
                      width="25%"
                      height="20%"
                      src="http://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http://example.com"
                      frameborder="0"
                    />
                  </v-card>
                </div>
                <div v-if="links">
                  <v-card flat>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>
                          <a
                            href="https://vuetifyjs.com/en/components/navigation-drawers/#navigation-drawers"
                            >teoria</a
                          >
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-card>
                </div>
              </v-tab-item>

              <v-tab-item>
                <v-container>
                  <v-row>
                    <v-col>
                      <v-dialog v-model="dialog" width="500">
                        <template v-slot:activator="{ on }">
                          <v-btn
                            dark
                            v-on="on"
                            class="mx-auto"
                            max-width="240"
                            color="deep-purple accent-3"
                            outlined
                          >
                            Tarea 1
                          </v-btn>
                        </template>
                        <v-card>
                          <v-container>
                            <v-row>
                              <v-col>
                                <v-text-field
                                  label="Título"
                                  placeholder="tarea 1"
                                ></v-text-field>
                                <v-text-field
                                  label="Descripción"
                                  placeholder="Llegar al nivel 2 del juego"
                                ></v-text-field>
                                <v-text-field
                                  label="recompensa"
                                  placeholder="3000 xp + 150 tokens"
                                ></v-text-field>
                                <v-dialog
                                  ref="dialog"
                                  v-model="modal"
                                  :return-value.sync="date"
                                  persistent
                                  width="290px"
                                >
                                  <template v-slot:activator="{ on }">
                                    <v-text-field
                                      label="Fecha límite"
                                      v-model="date"
                                      readonly
                                      v-on="on"
                                    ></v-text-field>
                                  </template>
                                  <v-date-picker v-model="date" scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                      text
                                      color="primary"
                                      @click="modal = false"
                                      >Cancel</v-btn
                                    >
                                    <v-btn
                                      text
                                      color="primary"
                                      @click="$refs.dialog.save(date)"
                                      >OK</v-btn
                                    >
                                  </v-date-picker>
                                </v-dialog>
                                <v-row justify="center"> </v-row>
                              </v-col>
                            </v-row>
                          </v-container>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              rounded
                              dark
                              text
                              color="deep-purple accent-3"
                              @click="renderSelectedHomework"
                            >
                              Asignar
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-col>
                    <v-col> </v-col>
                  </v-row>
                  <v-row>
                    <v-col> </v-col>
                    <v-col> </v-col>
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
                    <v-col cols="3">
                      <v-row justify="center">
                        <v-avatar color="deep-purple accent-3">
                          <v-img
                            src="https://i.stack.imgur.com/frlIf.png"
                          ></v-img>
                        </v-avatar>
                      </v-row>
                    </v-col>
                    <v-col cols="3">
                      <v-list-item two-line>
                        <v-list-item-content>
                          <v-list-item-title
                            >nombre de alumno</v-list-item-title
                          >
                          <v-list-item-subtitle>Conectado</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="3">
                      <v-row justify="center">
                        <v-avatar color="deep-purple accent-3">
                          <v-icon dark>mdi-account-circle</v-icon>
                        </v-avatar>
                      </v-row>
                    </v-col>
                    <v-col cols="3">
                      <v-list-item two-line>
                        <v-list-item-content>
                          <v-list-item-title
                            >nombre de alumno</v-list-item-title
                          >
                          <v-list-item-subtitle
                            >Desconectado</v-list-item-subtitle
                          >
                        </v-list-item-content>
                      </v-list-item>
                    </v-col>
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
            <div v-if="resources">
              <v-bottom-navigation
                v-model="bottomNav"
                absolute
                color="deep-purple accent-3"
              >
                <v-btn value="images" @click="renderImagesType">
                  <v-icon>mdi-image</v-icon>
                </v-btn>

                <v-btn value="videos" @click="renderVideosType">
                  <v-icon>mdi-play-circle</v-icon>
                </v-btn>

                <v-btn value="links" @click="renderLinksType">
                  <v-icon>mdi-link-variant</v-icon>
                </v-btn>
              </v-bottom-navigation>
            </div>
          </v-card>
        </v-col>
      </v-row>
      </v-container>
    <div v-if="active_call">
      <v-footer absolute color="green accent-3">
        <v-row>
          <v-col class="text-center" cols="4">
            {{ call_timer }}
          </v-col>
          <v-col class="text-center" cols="4">
            <v-icon> mdi-phone-hangup </v-icon>
          </v-col>
          <v-col class="text-center" cols="4">
            <v-icon>mdi-volume-high</v-icon>
          </v-col>
        </v-row>
      </v-footer>
    </div>
  </div>
</template>

<script>
import LineChart from "../../LineChart.js";
import Vue from "vue";
import VueApexCharts from "vue-apexcharts";
Vue.component("apexchart", VueApexCharts);

export default {
  components: {
    LineChart
  },

  data() {
    return {
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
      transmision: null,
      estadisticas: null,
      e6: 1,
      tabs: null,
      themes: [
        {
          title: "Historia de la informática",
          imageUrl: "",
          videoUrl: "",
          notas: [
            "hacer énfasis en los sistemas operativos",
            "historia de linux",
            "futuro de la informática"
          ]
        },
        {
          title: "Historia de la informática",
          imageUrl: "",
          videoUrl: "",
          notas: [
            "hacer énfasis en los sistemas operativos",
            "historia de linux",
            "futuro de la informática"
          ]
        },
        {
          title: "Historia de la informática",
          imageUrl: "",
          videoUrl: "",
          notas: [
            "hacer énfasis en los sistemas operativos",
            "historia de linux",
            "futuro de la informática"
          ]
        }
      ],
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
  mounted() {
    this.fillData();
  },
  methods: {
    initialize_call() {
      this.active_call = true;
      this.inactive_call = false;
      setInterval(() => this.call_timer++, 1000);
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
};
</script>

<style lang="scss" scoped>
.dashboard{
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
// .media_card {
//   height: 100%;
// }
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
