<template>
  <v-container>
    <v-col>
      <v-row>
        <div>
          <v-app-bar dense fixed color="white" flat dark absolute clipped-right>
            <div class="d-flex align-center">
              <h1>Escutec</h1>
            </div>

            <v-spacer></v-spacer>
            <v-chip class="ma-2" color="black" text-color="white">
              <v-avatar left>
                <v-icon color="deep-purple accent-3">mdi-atom-variant</v-icon>
              </v-avatar>
              {{ token_balance }}
            </v-chip>

            <v-icon color="deep-purple accent-3">mdi-bell-outline</v-icon>

            <v-icon color="deep-purple accent-3" @click="logout" class="ml-2">mdi-cog-outline</v-icon>
          </v-app-bar>
        </div>
      </v-row>
      <v-row class="mt-20">
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
                          <v-col>{{ answer1 }}</v-col>
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
                          <v-col>{{ answer2 }}</v-col>
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
                          <v-col>{{ answer3 }}</v-col>
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
                          <v-col>{{ answer4 }}</v-col>
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
            <v-row justify="center">
              <h3 class="alias-text">{{ alias }}</h3>
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
              <v-row class="mb-6">
                <v-col justify="right" v-if="svg_level1">
                  <p class="xpText" justify="right">{{ xp + "/" + next_level_xp + " XP" }}</p>
                  <v-progress-linear rounded height="6" color="deep-purple accent-3" v-model="xp"></v-progress-linear>
                </v-col>

                <v-col justify="right" v-if="svg_level2">
                  <p class="xpText" justify="right">{{ xp + "/" + next_level2_xp + " XP" }}</p>
                  <v-progress-linear
                    rounded
                    height="6"
                    color="deep-purple accent-3"
                    v-model="xpbar2"
                  ></v-progress-linear>
                </v-col>

                <v-col justify="right" v-if="svg_level3">
                  <p class="xpText" justify="right">{{ xp + "/" + next_level3_xp + " XP" }}</p>
                  <v-progress-linear
                    rounded
                    height="6"
                    color="deep-purple accent-3"
                    v-model="xpbar3"
                  ></v-progress-linear>
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
            <v-container>
              <v-carousel
                cycle
                height="150"
                hide-delimiter-background
                hide-delimiters
                show-arrows-on-hover
                class="mt-6 mb-6"
              >
                <!-- v-for="(student, i) in top9" :key="i" -->
                <v-carousel-item >
                  <v-card color="transparent" height="300">
                    <v-row align="center" justify="center">
                      <v-list-item dark v-for="(student, i) in top1_3" :key="i">
                        <v-icon color="deep-purple accent-3" class="mr-2">mdi-numeric-{{i + 1}}-circle</v-icon>
                        <!-- {{ student.alias + "/" + student.xp }} -->
                        {{student.name + '-' + student.xp}}
                      </v-list-item>
                     
                    </v-row>
                  </v-card>
                </v-carousel-item>
                <v-carousel-item>
                  <v-card color="transparent" height="300" >
                    <v-row align="center" justify="center">
                      <v-list-item dark v-for="(student, i) in top4_6" :key="i">
                        <v-icon color="deep-purple accent-3" class="mr-2">mdi-numeric-{{i + 3}}-circle</v-icon>
                        <!-- {{ student.alias + "/" + student.xp }} -->
                        {{student.name + '-' + student.xp}}
                      </v-list-item>
              
                    </v-row>
                  </v-card>
                </v-carousel-item>
                <v-carousel-item>
                  <v-card color="transparent" height="300" >
                    <v-row align="center" justify="center">
                      <v-list-item dark v-for="(student, i) in top7_9" :key="i">
                        <v-icon color="deep-purple accent-3" class="mr-2">mdi-numeric-{{i + 6}}-circle</v-icon>
                        <!-- {{ student.alias + "/" + student.xp }} -->
                        {{student.name + '-' + student.xp}}
                      </v-list-item>
                     
                    </v-row>
                  </v-card>
                </v-carousel-item>
              </v-carousel>
            </v-container>
            <v-container >
              <v-row justify="center" v-if="!boost" class="mb-4">
                <v-img
                  class="mb-4"
                  contain
                  src="../../assets/unavailable-boost.png"
                  height="100"
                  width="100"
                ></v-img>
              </v-row>
              <v-row justify="center" v-if="boost" class="mb-4">
                <v-img
                  @click="activateBoost"
                  class="mb-4"
                  contain
                  src="../../assets/available-boost.png"
                  height="100"
                  width="100"
                ></v-img>
              </v-row>
              <v-row justify="center" v-if="boost_activated" class="mb-4">
                <v-img
                  class="mb-4"
                  contain
                  src="../../assets/active-boost.png"
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
    </v-col>

    <div class="text-center">
      <!-- <v-btn
      dark
      color="orange darken-2"
      @click="snackbar = true"
    >
      Open Snackbar
      </v-btn>-->
      <v-snackbar top color="#1e1d20" :vertical="vertical" v-model="lvl_up_notif1" permanent>
        <v-row justify="center">
          <span class="notifText">Subiste de nivel</span>
        </v-row>
        <v-row>
          <LvlUpAnimation />
        </v-row>
        <v-row justify="center">
          <h3 class="lvl-up-text">+ 30</h3>
          <v-icon height="34" width="34" color="deep-purple accent-3">mdi-atom-variant</v-icon>
        </v-row>

        <!-- <v-btn
        color=""
        text
        @click="snackbar = false"
      >
        Close
        </v-btn>-->
      </v-snackbar>

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
      <v-dialog v-model="emotional_survey" width="700">
        <v-card>
          <v-card-title >
            <v-row justify="center" >
                          <h2 class="text-align">¿Cómo te has sentido?</h2>  
            </v-row>
          </v-card-title>
          <v-container>
              <v-row justify="center">
            
            <v-col cols="2">
              <v-img @click="sendSadState" contain src="../../assets/triste.jpg" height="80" width="80"></v-img>
            </v-col>
            <v-col cols="2">
              <v-img @click="sendAngryState" contain src="../../assets/enojado.png" height="80" width="80"></v-img>
            </v-col>
            <v-col cols="2">
              <v-img @click="sendBoringState" contain src="../../assets/aburrido.jpg" height="80" width="80"></v-img>
            </v-col>
            <v-col cols="2">
              <v-img @click="sendContentState" contain src="../../assets/contento.png" height="80" width="80"></v-img>
            </v-col>
            <v-col cols="2">
              <v-img @click="sendHappyState" contain src="../../assets/muyfeliz.png" height="80" width="80"></v-img>
            </v-col>
          </v-row>
          </v-container>
        
        </v-card>
      </v-dialog>
      <div v-if="onclass_loading">
        <v-footer  absolute color="#1e1d20" class="footer-loading">
          <v-card loading="green" height="100%" width="100%" color="#1e1d20">
          </v-card>
        </v-footer>
        </div>
   <div v-if="offclass">
      <v-footer absolute color="#1e1d20" height="60">
        <v-row justify="spread-around">
          <v-col cols="4">
            <!-- <v-chip>{{countdown_timer}}</v-chip> -->
          </v-col>
          <v-col cols="4">
            <v-btn dark @click="initializeClass" color="green accent-4">iniciar clase</v-btn>
          </v-col>
          <v-col cols="4">
          </v-col>
        </v-row>
      </v-footer>
   
    </div>
      <div v-if="onclass">
        <v-footer absolute color="green accent-4" height="60" inset padless >
          <v-row justify="spread-around" align="center" class="inside-bar" >
              <v-col cols="1">

              </v-col>
            <v-col cols="8" >
              <!-- // send audio messages for leadership and maagenment ++ -->
              <!-- // put icon and communicate next lvl make invision or protopie animation -->
              <!-- nxt lvl buy boost from prof or compañeros parteners students-->
              <v-row justify="center"  class="ml-12">
                <v-icon @click="note = true" large color="white">mdi-pencil-circle</v-icon>
                <v-icon @click="clueDialog = true" class="ml-2 mr-2 " large color="white">mdi-lifebuoy</v-icon>
                <v-icon @click="inbox = true" large color="white">mdi-account-circle</v-icon>

              </v-row>
            </v-col>
            <v-col cols="3">
              <v-row  justify="center" align="center">
                <v-icon  large color="yellow">mdi-fire</v-icon>
                <!-- <v-icon large color="orange">mdi-fire</v-icon>
                <v-icon large color="red">mdi-fire</v-icon>-->
                <v-progress-linear class="streak-bar" rounded v-model="streak" color="yellow"></v-progress-linear>
              </v-row>
            </v-col>
          </v-row>
        </v-footer>
        <div class="text-center">
    <v-bottom-sheet v-model="note" persistent inset hide-overlay >
      <v-sheet class="text-center" height="200px">
        <v-toolbar color="deep-purple accent-3">
          <h1 class="notas-text">Notas</h1>
        </v-toolbar>
        <v-container>
          <v-row>
            <v-col cols="8">
  <v-textarea v-model="writtenNote" height="100" outlined color="deep-purple accent-3" label="Escribe aquí">
        </v-textarea>
            </v-col>
            <v-col cols="4">
   <v-btn
          class="mt-6 mr-4"
          flat
          outlined
          color="success"
          @click="saveNote"
        >Guardar</v-btn>
   <v-btn
          class="mt-6 ml-4"
          flat
          outlined
          color="red"
          @click="note = !note"
        >cancelar</v-btn>
            </v-col>
          </v-row>   
        </v-container>
      </v-sheet>
    </v-bottom-sheet>
  </div>
        <div class="text-center">
    <v-bottom-sheet v-model="inbox"  inset hide-overlay height="340" >
      <v-sheet class="text-center" height="340px">
        <v-toolbar color="deep-purple accent-3">
          <h1 class="notas-text">Inbox</h1>
        </v-toolbar>
         <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-card  height="340" flat outlined>
                      <v-list ref="inb" id="inboxes">
                        <template v-for="(inbox_message, index) in inbox_messages">
                          <v-subheader v-if="inbox_message" :key="index">
                            {{
                            inbox_message.sender + ":" + inbox_message.message
                            }}
                          </v-subheader>
                        </template>
                      </v-list>
                      <v-container>
                        <v-row>
                          <v-col cols="10">
                            <v-text-field
                              dense
                              v-model="inbox_msg"
                              label="Escribe aquí tú mensaje"
                              outlined
                              color="deep-purple accent-3"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="2">
                            <v-btn dark color="deep-purple accent-3" @click="submitInboxMsg">Enviar</v-btn>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
      </v-sheet>
    </v-bottom-sheet>
  </div>
        <div class="text-center">
    <v-bottom-sheet v-model="clueDialog" inset hide-overlay width="500" >
      <v-sheet class="text-center" height="200px" >
        <v-toolbar color="deep-purple accent-3">
          <h1 class="notas-text">Pista</h1>
        </v-toolbar>
        <v-container>
          <v-row>
            <v-col cols="8">
              <h2>{{ clue }}</h2>
            </v-col>
            <v-col cols="4">
            <v-btn
                    class="mt-6 ml-4"
                    flat
                    outlined
                    color="red"
                    @click="clueDialog = !clueDialog"
                  >cancelar</v-btn>
            </v-col>
          </v-row>   
        </v-container>
      </v-sheet>
    </v-bottom-sheet>
  </div>
      </div>
    <v-dialog v-model="survey_time" width="500" >
      <v-window v-model="survey"  >
        <v-window-item :value="1" >
          <v-card>
            <v-card-title>
              <v-row justify="center">
                <h1>Eres el número 1!</h1>
     
              </v-row>
            </v-card-title>
            <v-container>
              <v-row justify="center">
                                <div class="thumbsup-icon">
    <svg id="stripes" class="stripes" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 187 109">
        <path  d="M4 35h83a4 4 0 0 1 4 4 4 4 0 0 1-4 4H4a4 4 0 0 1-4-4 4 4 0 0 1 4-4zM100 51h83a4 4 0 0 1 4 4 4 4 0 0 1-4 4h-83a4 4 0 0 1-4-4 4 4 0 0 1 4-4zM20 67h131a4 4 0 0 1 4 4 4 4 0 0 1-4 4H20a4 4 0 0 1-4-4 4 4 0 0 1 4-4zM92 91h51a4 4 0 0 1 4 4 4 4 0 0 1-4 4H92a4 4 0 0 1-4-4 4 4 0 0 1 4-4zM92 19h51a4 4 0 0 1 4 4 4 4 0 0 1-4 4H92a4 4 0 0 1-4-4 4 4 0 0 1 4-4z"/>
    </svg>

    <svg class="stars star1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 187 109">
        <path d="M68.1 17.4l-4.3-.6-1.9-3.9c-.2-.3-.5-.5-.9-.5s-.7.2-.9.5l-1.9 3.9-4.3.6c-.4.1-.7.3-.8.7-.1.4 0 .8.3 1l3.1 3-.7 4.3c-.1.4.1.8.4 1 .3.2.7.3 1.1.1l3.9-2 3.9 2c.3.2.7.1 1.1-.1s.5-.6.4-1l-.7-4.3 3.1-3c.3-.3.4-.7.3-1-.5-.3-.8-.6-1.2-.7z"/>
    </svg>

    <svg class="stars star2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 187 109">
        <path d="M133.1 8.1l-6.6-1-2.9-6c-.3-.5-.8-.8-1.4-.8s-1.1.3-1.4.8l-2.9 6-6.6 1c-.6.1-1.1.5-1.2 1-.2.6 0 1.2.4 1.6l4.8 4.6-1.1 6.6c-.1.6.1 1.1.6 1.5.5.3 1.1.4 1.6.1l5.9-3.1 5.9 3.1c.5.3 1.1.2 1.6-.1s.7-.9.6-1.5l-1.1-6.6 4.8-4.6c.4-.4.6-1 .4-1.6-.4-.5-.8-.9-1.4-1z"/>
    </svg>


    <svg class="stars star3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 187 109">
        <path d="M92.9 97.7l-4.6-.7-2-4.1c-.2-.3-.6-.5-.9-.5a1 1 0 0 0-.9.5l-2 4.1-4.5.7c-.4.1-.7.3-.8.7-.1.4 0 .8.3 1.1l3.3 3.2-.8 4.5c-.1.4.1.8.4 1s.8.3 1.1.1l4-2.1 4 2.1c.4.2.8.2 1.1-.1.3-.2.5-.6.4-1l-.8-4.5 3.3-3.2c.3-.3.4-.7.3-1.1-.2-.4-.5-.7-.9-.7z"/>
    </svg>


    <svg class="stars star4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 187 109">
        <path d="M45.8 62l-5.7-.8-2.5-5.1c-.2-.4-.7-.7-1.2-.7s-.9.3-1.2.7l-2.5 5.1-5.6.8c-.5.1-.9.4-1.1.9-.2.5 0 1 .3 1.3l4.1 4-1 5.6c-.1.5.1 1 .5 1.3.4.3.9.3 1.4.1l5.1-2.7 5.1 2.7c.4.2 1 .2 1.4-.1.4-.3.6-.8.5-1.3l-1-5.6 4.1-4c.4-.3.5-.9.3-1.3-.1-.5-.5-.8-1-.9z"/>
    </svg>

    <svg class="stars star5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 187 109">
        <path d="M142.9 63.7l-2.8-.4-1.3-2.6c-.1-.2-.3-.3-.6-.3s-.5.1-.6.3l-1.3 2.6-2.8.4c-.2 0-.5.2-.5.4-.1.2 0 .5.2.7l2 2-.5 2.8c0 .2.1.5.3.6.2.1.5.2.7 0l2.5-1.3 2.5 1.3h.7c.2-.1.3-.4.3-.6l-.5-2.8 2-2c.2-.2.2-.4.2-.7 0-.2-.2-.4-.5-.4z"/>
    </svg>

    <svg class="thumbsup" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 187 109">
        <path d="M55 66H33c-4.3 0-8.7-1-12.5-2.9l-7.1-3.5c-.5-.3-.9-.8-.9-1.4v-22c0-.4.1-.7.4-1l15.3-18.4v-12A4.7 4.7 0 0 1 35.3.7c5.4 3.1 5.6 11.1 5.6 16.6v7.9h17.3c4.3 0 7.9 3.5 7.9 7.8v.2L63 58.3a8.1 8.1 0 0 1-8 7.7z"
            fill="#0095ff" transform="translate(58 19)" />
        <path d="M14.1 66H1.6C.7 66 0 65.3 0 64.4V29.9c0-.9.7-1.6 1.6-1.6h12.6c.9 0 1.6.7 1.6 1.6v34.6c-.1.8-.8 1.5-1.7 1.5z" fill="#17c"
            transform="translate(58 19)" />
    </svg>
</div>
       
              </v-row>
  
            </v-container>
             <v-card-actions>
              <v-btn @click="survey = 2" color="deep-purple accent-3" dark>siguiente</v-btn>
            </v-card-actions>
          </v-card>
        </v-window-item>
        <v-window-item :value="2" width="300">
          <v-card>
            <v-card-title>
              <v-row justify="center">
                <h3>Resultado</h3>
              </v-row>
            </v-card-title>
            <v-container>
              <v-row justify="center">
                <h1>{{ total_xp + 'XP'}}</h1>
              </v-row>
            </v-container>
            <v-card-actions>
              <v-btn color="deep-purple accent-3" dark @click="survey = 3">siguiente</v-btn>
            </v-card-actions>
          </v-card>
        </v-window-item>
        <v-window-item :value="3" width="300">
          <v-card>
            <v-card-title>
              <v-row justify="center">
                <h3>Tokens</h3>
              </v-row>
            </v-card-title>
            <v-container>
              <v-row justify="center">
                <v-icon color="deep-purple accent-3">mdi-atom-variant</v-icon>
                <h2>{{total_tokens}}</h2>
              </v-row>
            </v-container>
            <v-card-actions>
              <v-btn color="deep-purple accent-3" dark @click="survey = 4">siguiente</v-btn>
            </v-card-actions>
          </v-card>
        </v-window-item>
        <v-window-item :value="4" width="300">
          <v-card>
            <v-card-title>
              <v-row justify="center">
                <h3>¿Te gustó la clase</h3>
              </v-row>
            </v-card-title>
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-row justify="center">
                    <v-btn color="deep-purple accent-3">
                      <v-icon color="white" @click="sendSurveyLike">mdi-thumb-up-outline</v-icon>
                    </v-btn>
                  </v-row>
                </v-col>
                <v-col cols="6">
                  <v-row justify="center">
                    <v-btn color="deep-purple accent-3">
                      <v-icon color="white" @click="sendSurveyUnlike">mdi-thumb-down-outline</v-icon>
                    </v-btn>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
            <v-img></v-img>
          </v-card>
        </v-window-item>
        <v-window-item :value="5" width="500">
          <v-card>
            <v-card-title>
              <v-row justify="center">
                <h3>Notas del grupo</h3>
              </v-row>
            </v-card-title>
            <v-container>
              <v-row justify="center">
                <v-container>
                  <v-textarea outlined color="deep-purple accent-3" v-model="group_note"></v-textarea>
                </v-container>
              </v-row>
              <v-card-actions>
                <v-btn text color="deep-purple accent-3" dark @click="sendGroupNotes">Enviar</v-btn>
              </v-card-actions>
            </v-container>
            <v-img></v-img>
          </v-card>
        </v-window-item>
      </v-window>
    </v-dialog>
    
  </v-container>

</template>

<script>
 
import { CometChat } from "@cometchat-pro/chat";
import { db } from "../../db";
import firebase from "firebase";
import moment from "moment";

import LvlUpAnimation from '../../components/student/LvlUpAnimation'

export default {
  components: {
    LvlUpAnimation
  },

  data() {
    return {
      offclass:null,
      streak:0,
      top4_6:[],
      top7_9:[],
      group_note:null,
      survey_time:false,
      inbox:false,
      inbox_messages:[],
      inbox_msg:null,
      clue:null,
      clueDialog:false,
      writtenNote:null,
      note: false,
      onclass_loading: false,
      emotional_survey:false,
      survey:1,
      total_match_rewards:[],
      tokens_trivia_reward: 9,
      total_xp: 0,
      total_tokens:0,
      total_rewards: [],
      initSound: null,
      onclass: false,
      triggers: [],
      top1_3: null,
      top3_6: null,
      top6_9: null,
      boost: false,
      boost_activated: null,
      token_balance: 0,
      total_tokens:null,
      lvl_up_notif1: false,
      lvl_1_rewarded: null,
      lvl_2_rewarded: null,
      lvl_3_rewarded: null,
      student_xp_level: 0,
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
      earned_xp: 30,
      earned_tokens: 3,
      // lvl_up_reward: 30,
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

      xp: 0,
      xpbar1: 0,
      xpbar2: 0,
      xpbar3: 0,
      next_level_xp: 100,
      next_level2_xp: 200,
      next_level3_xp: 300,
      diff_lvl1: 100,
      diff_lvl2: 100,
      diff_lvl3: 100,

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
    inbox_messages() {
      setTimeout(() => {
        this.$refs.inb.$el.scrollTop = this.$refs.inb.$el.scrollHeight;
      }, 0);
    },
    question() {
      // this.trivia_is_active = true;
    },
    xp() {
      //ahi un cambi porque en miunted genera un cambio
      if (this.xp >= 0 && this.xp <= 99) {
        this.svg_level1 = true;
        this.svg_level2 = false;
        this.svg_level3 = false;
      } else if (this.xp >= 100 && this.xp <= 199) {
        if (this.student_xp_level === 1 && this.lvl_2_rewarded === false) {
          this.student_xp_level++;
          db.collection("usuarios")
            .doc(this.user)
            .update({
              student_xp_level: this.student_xp_level,
              lvl_1_rewarded: true
            })
            .then(() => {
              this.lvl_up_notif1 = true;
              const increment = firebase.firestore.FieldValue.increment(
                this.tokens_reward
              );
              const tokensRef = db
                .collection(
                  this.school_name + "-" + this.classroom + "-students"
                )
                .doc(this.user);
              const batch = db.batch();
              batch.set(
                tokensRef,
                { token_balance: increment },
                { merge: true }
              );
              batch.commit().then(() => {
                db.collection("usuarios")
                  .doc(this.user)
                  .get()
                  .then(snapshot => {
                    const document = snapshot.data();
                    this.token_balance = document.token_balance;
                  });
              });
            });
        }
        this.svg_level1 = false;
        this.svg_level2 = true;
        this.svg_level3 = false;
        this.xpbar2 = this.xp - 100;
        // this.percentageLevel2();
      } else if (this.xp >= 200 && this.xp <= 299) {
        if ((this.student_xp_level = 2 && this.lvl_2_rewarded === false)) {
          // level up
          this.lvl_up_notif2 = true;
          this.student_xp_level++;
          db.collection("usuarios")
            .doc(this.user)
            .update({
              student_xp_level: this.student_xp_level,
              lvl_2_rewarded: true
            });
        }
        this.svg_level3 = true;
        this.svg_level2 = false;
        this.svg_level1 = false;
        this.xpbar3 = this.xp - 200;
        // this.percentageLevel3();
      }
    },
    boost() {}
    // boost(){
    //   if(this.boost = true){
    //     setTimeout(() => {
    //       this.boost = false
    //     },6000)

    //   }
    // }
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
            this.token_balance = document.token_balance;
            this.alias = document.alias;
            this.classroom = document.group;
            this.student_xp_level = document.student_xp_level;
            this.lvl_1_rewarded = document.lvl_1_rewarded;
            this.lvl_2_rewarded = document.lvl_2_rewarded;
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
                // this.percentageLevel2();
                // this.percentageLevel3();
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
                this.onclass = document.onclass;
                if(this.onclass === true){
                  this.offclass = false 
                } else {
                  this.offclass = true
                }
                 let ref2 = db
              .collection(this.prof_email + '-' + this.user + '-chatroom')
              .orderBy("timestamp");
            ref2.onSnapshot(snapshot => {
              snapshot.docChanges().forEach(change => {
                if ((change.type = "added")) {
                  console.log("nuevo mensaje", change.doc.data().timestamp);
                  let doc = change.doc;
                  this.inbox_messages.push({
                    id: doc.id,
                    sender: doc.data().sender,
                    message: doc.data().message,
                    timestamp: moment(doc.data().timestamp).format("LTS")
                  });
                }
              });
            });
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
                    db.collection(
                      this.school_name + "-" + this.classroom + "-students"
                    )
                      .orderBy("xp", "desc")
                      .limit(9)
                      .get()
                      .then(querySnapshot => {
                        const documents = querySnapshot.docs.map(doc =>
                          doc.data()
                        );
                        console.log("sorted-docs", documents);
                        // this.top1_3 = documents;
                        this.top1_3 = [
                          {
                            name: 'estudiante1',
                            xp: this.xp
                        },
                          {
                            name: 'estudiante2',
                            xp: 0
                        },
                          {
                            name: 'estudiante3',
                            xp: 0
                        },
                        ]
                        this.top4_6 = [
                          {
                            name: 'estudiante4',
                            xp: 0
                        },
                          {
                            name: 'estudiante5',
                            xp: 0
                        },
                          {
                            name: 'estudiante6',
                            xp: 0
                        },
                        ]
                        this.top7_9 = [
                          {
                            name: 'estudiante7',
                            xp: 0
                        },
                          {
                            name: 'estudiante8',
                            xp: 0
                        },
                          {
                            name: 'estudiante9',
                            xp: 0
                        },
                        ]
                        let d = new Date();
                        console.log("hora", d.getHours());
                      });
                  });
              });
            let ref = db
              .collection(this.classroom + "-messages")
              .orderBy("timestamp");
            ref.onSnapshot(snapshot => {
              snapshot.docChanges().forEach(change => {
                if ((change.type = "added")) {
                  console.log("nuevo mensaje", change.doc.data().timestamp);
                  let doc = change.doc;
                  this.messages.push({
                    id: doc.id,
                    sender: doc.data().sender,
                    message: doc.data().message,
                    timestamp: moment(doc.data().timestamp).format("LTS")
                  });
                  if (
                    change.doc.data().sender === this.prof_email &&
                    change.doc.data().message === "impulso" &&
                    change.doc.data().timestamp >= Date.now() - 3000
                  ) {
                    this.availableBoost();

                    setTimeout(() => {
                      this.boost = false;
                    }, 6000);
                    this.triggers.push({
                      id: doc.id,
                      sender: doc.data().sender,
                      message: doc.data().message,
                      timestamp: moment(doc.data().timestamp).format("LTS")
                    });
                  }
                  if (
                    change.doc.data().sender === this.prof_email &&
                    change.doc.data().message === "iniciar clase" &&
                    change.doc.data().timestamp >= Date.now() - 3000
                  ) {
                    console.log("funcione a init");
                    // this.initializeClass();
                  } else if (
                    change.doc.data().sender === this.prof_email &&
                    change.doc.data().message === "terminar clase" &&
                    change.doc.data().timestamp >= Date.now() - 3000
                  ) {
                    this.onclass = false;
                    this.finalizeClass();
                  } else if (
                    change.doc.data().sender === this.prof_email &&
                    change.doc.data().message === this.user &&
                    change.doc.data().timestamp >= Date.now() - 3000
                  ) {
                    this.validatePresence();
                  } else {
                    console.log("no es el avatar");
                  }
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
    saveNote(){
      db.collection(this.user + '-' + this.prof_email + '-notes' )
        .add({
          writtenNote: this.writtenNote
        }).then(() => {
          this.note = false
        })
    },
      sendSadState(){
       const increment = firebase.firestore.FieldValue.increment(10);
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
              // this.percentageLevel2();
              // this.percentageLevel3();
            });
 const increment = firebase.firestore.FieldValue.increment(1);
      const surveySadRef = db
        .collection(this.user + "-stats")
        .doc("emotional-state");
      const batch = db.batch();
      batch.set(surveySadRef, { triste: increment }, { merge: true });
      batch.commit().then(() => {
        console.log("mision likes cumplida");
        //dialog false
      });
          console.log("mision emotionalxp cumplida");
        });

      },
      sendAngryState(){
        const increment = firebase.firestore.FieldValue.increment(10);
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
              // this.percentageLevel2();
              // this.percentageLevel3();
            });
 const increment = firebase.firestore.FieldValue.increment(1);
      const surveyAngryRef = db
        .collection(this.user + "-stats")
        .doc("emotional-state");
      const batch = db.batch();
      batch.set(surveyAngryRef, { enojado: increment }, { merge: true });
      batch.commit().then(() => {
        console.log("mision likes cumplida");
        //dialog false
      });
          console.log("mision emotionalxp cumplida");
        });

      },
      sendBoringState(){
        const increment = firebase.firestore.FieldValue.increment(10);
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
            });
 const increment = firebase.firestore.FieldValue.increment(1);
      const surveyBoringRef = db
        .collection(this.user + "-stats")
        .doc("emotional-state");
      const batch = db.batch();
      batch.set(surveyBoringRef, { aburrido: increment }, { merge: true });
      batch.commit().then(() => {
        console.log("mision likes cumplida");
        //dialog false
      });
          console.log("mision emotionalxp cumplida");
        });

      },
      sendContentState(){
        const increment = firebase.firestore.FieldValue.increment(10);
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
              
            });
 const increment = firebase.firestore.FieldValue.increment(1);
      const surveyContentRef = db
        .collection(this.user + "-stats")
        .doc("emotional-state");
      const batch = db.batch();
      batch.set(surveyContentRef, { contento: increment }, { merge: true });
      batch.commit().then(() => {
        console.log("mision likes cumplida");
        //dialog false
      });
          console.log("mision emotionalxp cumplida");
        });

      },
      sendHappyState(){
        const increment = firebase.firestore.FieldValue.increment(10);
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
              // this.percentageLevel2();
              // this.percentageLevel3();
            });
 const increment = firebase.firestore.FieldValue.increment(1);
      const surveyHappyRef = db
        .collection(this.user + "-stats")
        .doc("emotional-state");
      const batch = db.batch();
      batch.set(surveyHappyRef, { feliz: increment }, { merge: true });
      batch.commit().then(() => {
        console.log("mision likes cumplida");
        //dialog false
      });
          console.log("mision emotionalxp cumplida");
        });

      },
    
    sendGroupNotes() {
      db.collection(this.prof_email)
        .add({
          note: this.group_note
        })
        .then(() => {
          this.survey_time = false;
          this.$router.push('/student-schedule')
        });
    },
     sendSurveyLike() {
      const increment = firebase.firestore.FieldValue.increment(1);
      const surveyLikesRef = db
        .collection(this.prof_email + "-stats")
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
        .collection(this.prof_email + "-stats")
        .doc("unlikes");
      const batch = db.batch();
      batch.set(surveyUnlikesRef, { unlike: increment }, { merge: true });
      batch.commit().then(() => {
        console.log("mision likes cumplida");
        this.survey++;
      });
    },
    finalizeClass() {
      
      // this.loading_results = true
      this.onclass = false
      this.offclass = true
      db.collection(this.user + "-stats")
        .orderBy("timestamp")
        .limit(3)
        .get()
        .then(querySnapshot => {
          this.survey_time = true
          const documents = querySnapshot.docs.map(doc => {
            console.log("map,earned xp", doc.data().earned_xp);
            this.total_rewards.push(doc.data().earned_xp);
            this.total_match_rewards.push(doc.data().earned_tokens)
          });
          this.total_xp = this.total_rewards.reduce((a, b) => a + b, 0);
          this.total_tokens = this.total_match_rewards.reduce((a, b) => a + b, 0);
        });
      // this.survey_time = true
      // this.$router.push('/student-lobby')
    },
    initializeClass() {
      const initAudio = new Audio(require('../../assets/boost2.mp3'))
      const preProfName = this.$route.params.id;
      const newProfName = preProfName.replace("_", " ");
      db.collection(this.school_name + "-" + this.level + "-professors")
        .doc(newProfName)
        .get()
        .then(snapshot => {
          const document = snapshot.data();
          console.log("profDoc", document);
          if (document.onclass === true) {
            this.offclass = false
            this.onclass_loading = true
            initAudio.play()
            // this.onclass = null
            // this.initSound.play();
            setTimeout(() => {
              initAudio.pause()
              this.onclass_loading = false
              this.onclass = true
            },3000)
           
          } else if (document.onclass === false) {
            this.onclass = false;
          }
        });
    },
    availableBoost() {
      this.boost = true;
      //           const audio = new Audio(require("../../assets/boost2.mp3"));
      //     const boostDisponible = new Audio(
      //       require("../../assets/impulso-disponible.mp3")
      //     );
      //     audio.play();
      //     setTimeout(() => {
      //       audio.pause();
      //       boostDisponible.play();
      //     }, 2000);
    },
    activateBoost() {
      this.boost = false
      this.boost_activated = true;
      const audio = new Audio(require("../../assets/boost1.mp3"));
      audio.play();
      setTimeout(() => {
        this.boost_activated = false;
      }, 30000);
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
    // para elt timpo de sde el login empieoz timer de rleoj timepo actual
    //retos sumar acietos en cierto contendeor anazalizar primero coual es el sutantebale y eficiente
    //lvl2 prof rating a alumnos
    //carousel
    // ver si para el realtime usamos vuefire bindings o llamadas cada x cantidad de tiempo cada cuelta del carousel ?

    percentageLevel2() {
      this.xpbar2 = (this.xp / this.next_level2_xp) * 100;

      console.log("result", result);
    },
    percentageLevel3() {
      let lvl_3_result = (this.xp / this.next_level3_xp) * 100;
      this.level_percentage_xpbar3 = lvl_3_result;
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
            this.clue = document.clue
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
      const winAudio = new Audio(require("../../assets/win.wav"));
      const loseAudio = new Audio(require("../../assets/lose.mp3"));
      this.trivia_is_active = false;
      if (this.answer1 === this.right_answer && this.boost_activated === true) {
        this.streak + 10
        winAudio.play();
        db.collection(this.user + "-stats").add({
          earned_xp: this.earned_xp,
          earned_tokens: this.tokens_trivia_reward,
          // lvl_up_reward: this.lvl_up_reward,
          timestamp: Date.now()
        });
        db.collection(this.school_name + "-" + this.classroom + "-students")
          .doc(this.user)
          .update({ right: true, answered: true })
          .then(() => console.log("right updated"));
        this.snackbar = true;
        const increment = firebase.firestore.FieldValue.increment(
          this.earned_xp * 2
        );
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
              // this.percentageLevel2();
              // this.percentageLevel3();
            });

          console.log("mision xp cumplida");
        });
      } else if (
        this.answer1 != this.right_answer &&
        this.boost_activated === true
      ) {
        this.errorNotif = true;
        loseAudio.play();
        db.collection(this.school_name + "-" + this.classroom + "-students")
          .doc(this.user)
          .update({ right: false, answered: true })
          .then(() => console.log("wrong updated"));
      }
      if (this.answer1 === this.right_answer) {
        this.streak + 10
        winAudio.play();
        db.collection(this.user + "-stats").add({
          earned_xp: this.earned_xp,
          earned_tokens: this.earned_tokens,
          // lvl_up_reward: this.lvl_up_reward,
          timestamp: Date.now()
        });
        db.collection(this.school_name + "-" + this.classroom + "-students")
          .doc(this.user)
          .update({ right: true, answered: true })
          .then(() => console.log("right updated"));
        this.snackbar = true;
        const increment = firebase.firestore.FieldValue.increment(
          this.earned_xp
        );
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
              // this.percentageLevel2();
              // this.percentageLevel3();
            });

          console.log("mision xp cumplida");
        });
      } else if (this.answer1 != this.right_answer) {
        this.errorNotif = true;
        loseAudio.play();
        db.collection(this.school_name + "-" + this.classroom + "-students")
          .doc(this.user)
          .update({ right: false, answered: true })
          .then(() => console.log("wrong updated"));
      }
    },
    checkAnswer2() {
      const winAudio = new Audio(require("../../assets/win.wav"));
      const loseAudio = new Audio(require("../../assets/lose.mp3"));
      this.trivia_is_active = false;
      if (this.answer2 === this.right_answer && this.boost_activated === true) {
        winAudio.play();
        this.streak + 10
        db.collection(this.user + "-stats").add({
          earned_xp: this.earned_xp,
          earned_tokens: this.earned_tokens,
          // lvl_up_reward: this.lvl_up_reward,
          timestamp: Date.now()
        });
        db.collection(this.school_name + "-" + this.classroom + "-students")
          .doc(this.user)
          .update({ right: true, answered: true })
          .then(() => console.log("right updated"));
        this.snackbar = true;
        const increment = firebase.firestore.FieldValue.increment(
          this.earned_xp * 2
        );
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
              // this.percentageLevel2();
              // this.percentageLevel3();
            });

          console.log("mision xp cumplida");
        });
      } else if (
        this.answer2 != this.right_answer &&
        this.boost_activated === true
      ) {
        this.errorNotif = true;
        loseAudio.play();
        db.collection(this.school_name + "-" + this.classroom + "-students")
          .doc(this.user)
          .update({ right: false, answered: true })
          .then(() => console.log("wrong updated"));
      }
      if (this.answer2 === this.right_answer) {
        this.streak + 10
        winAudio.play();
        db.collection(this.user + "-stats").add({
          earned_xp: this.earned_xp,
          earned_tokens: this.earned_tokens,
          // lvl_up_reward: this.lvl_up_reward,
          timestamp: Date.now()
        });
        db.collection(this.school_name + "-" + this.classroom + "-students")
          .doc(this.user)
          .update({ right: true, answered: true })
          .then(() => console.log("right updated"));
        this.snackbar = true;
        const increment = firebase.firestore.FieldValue.increment(
          this.earned_xp
        );
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
              // this.percentageLevel2();
              // this.percentageLevel3();
            });

          console.log("mision xp cumplida");
        });
      } else if (this.answer2 != this.right_answer) {
        this.errorNotif = true;
        loseAudio.play();
        db.collection(this.school_name + "-" + this.classroom + "-students")
          .doc(this.user)
          .update({ right: false, answered: true })
          .then(() => console.log("wrong updated"));
      }
    },
    checkAnswer3() {
      const winAudio = new Audio(require("../../assets/win.wav"));
      const loseAudio = new Audio(require("../../assets/lose.mp3"));
      this.trivia_is_active = false;
      if (this.answer3 === this.right_answer && this.boost_activated === true) {
        winAudio.play();
        this.streak + 10
        db.collection(this.user + "-stats").add({
          earned_xp: this.earned_xp,
          earned_tokens: this.earned_tokens,
          // lvl_up_reward: this.lvl_up_reward,
          timestamp: Date.now()
        });
        db.collection(this.school_name + "-" + this.classroom + "-students")
          .doc(this.user)
          .update({ right: true, answered: true })
          .then(() => console.log("right updated"));
        this.snackbar = true;
        const increment = firebase.firestore.FieldValue.increment(
          this.earned_xp * 2
        );
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
              // this.percentageLevel2();
              // this.percentageLevel3();
            });

          console.log("mision xp cumplida");
        });
      } else if (
        this.answer3 != this.right_answer &&
        this.boost_activated === true
      ) {
        this.errorNotif = true;
        loseAudio.play();
        db.collection(this.school_name + "-" + this.classroom + "-students")
          .doc(this.user)
          .update({ right: false, answered: true })
          .then(() => console.log("wrong updated"));
      }
      if (this.answer3 === this.right_answer) {
        this.streak + 10
        winAudio.play();
        db.collection(this.user + "-stats").add({
          earned_xp: this.earned_xp,
          earned_tokens: this.earned_tokens,
          // lvl_up_reward: this.lvl_up_reward,
          timestamp: Date.now()
        });
        db.collection(this.school_name + "-" + this.classroom + "-students")
          .doc(this.user)
          .update({ right: true, answered: true })
          .then(() => console.log("right updated"));
        this.snackbar = true;
        const increment = firebase.firestore.FieldValue.increment(
          this.earned_xp
        );
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
              // this.percentageLevel2();
              // this.percentageLevel3();
            });

          console.log("mision xp cumplida");
        });
      } else if (this.answer3 != this.right_answer) {
        this.errorNotif = true;
        loseAudio.play();
        db.collection(this.school_name + "-" + this.classroom + "-students")
          .doc(this.user)
          .update({ right: false, answered: true })
          .then(() => console.log("wrong updated"));
      }
    },
    checkAnswer4() {
      //mejora el timing en la secuencia
      const winAudio = new Audio(require("../../assets/win.wav"));
      const loseAudio = new Audio(require("../../assets/lose.mp3"));
      this.trivia_is_active = false;
      if (this.answer4 === this.right_answer && this.boost_activated === true) {
        winAudio.play();
        this.streak + 10
        db.collection(this.user + "-stats").add({
          earned_xp: this.earned_xp,
          earned_tokens: this.earned_tokens,
          // lvl_up_reward: this.lvl_up_reward,
          timestamp: Date.now()
        });
        db.collection(this.school_name + "-" + this.classroom + "-students")
          .doc(this.user)
          .update({ right: true, answered: true })
          .then(() => console.log("right updated"));
        this.snackbar = true;
        const increment = firebase.firestore.FieldValue.increment(
          this.earned_xp * 2
        );
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
              // this.percentageLevel2();
              // this.percentageLevel3();
            });

          console.log("mision xp cumplida");
        });
      } else if (
        this.answer4 != this.right_answer &&
        this.boost_activated === true
      ) {
        this.errorNotif = true;
        loseAudio.play();
        db.collection(this.school_name + "-" + this.classroom + "-students")
          .doc(this.user)
          .update({ right: false, answered: true })
          .then(() => console.log("wrong updated"));
      }
      if (this.answer4 === this.right_answer) {
        this.streak + 10
        winAudio.play();
        db.collection(this.user + "-stats").add({
          earned_xp: this.earned_xp,
          earned_tokens: this.earned_tokens,
          // lvl_up_reward: this.lvl_up_reward,
          timestamp: Date.now()
        });
        db.collection(this.school_name + "-" + this.classroom + "-students")
          .doc(this.user)
          .update({ right: true, answered: true })
          .then(() => console.log("right updated"));
        this.snackbar = true;
        const increment = firebase.firestore.FieldValue.increment(
          this.earned_xp
        );
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
              // this.percentageLevel2();
              // this.percentageLevel3();
            });

          console.log("mision xp cumplida");
        });
      } else if (this.answer4 != this.right_answer) {
        this.errorNotif = true;
        loseAudio.play();
        db.collection(this.school_name + "-" + this.classroom + "-students")
          .doc(this.user)
          .update({ right: false, answered: true })
          .then(() => console.log("wrong updated"));
      }
    },
    submit() {
      // this.initSound = new Audio(require("../../assets/boost2.mp3"));
      // this.initSound.play().then(() => {
      //   this.initSound.pause();
      // });

      db.collection(this.classroom + "-messages")
        .add({
          sender: this.user,
          message: this.msg,
          timestamp: Date.now()
        })
        .catch(err => console.log("error", err))
        .then(() => {
          if (this.msg === "presente") {
            this.emotional_survey = true
            setTimeout(() => {
              db.collection(
                this.school_name + "-" + this.classroom + "-students"
              )
                .doc(this.user)
                .get()
                .then(snapshot => {
                  const document = snapshot.data();
                  this.xp = document.xp;
                  // this.percentageLevel2();
                  // this.percentageLevel3();
                  this.msg = "";
                });
            }, 3000);
          }
        });
    },
    submitInboxMsg(){
        db.collection(this.prof_email + '-' + this.user + '-chatroom')
          .add({
             sender: this.user,
            message: this.inbox_msg,
            timestamp: Date.now()
          })
          .catch(err => console.log("error", err))
        .then(() => {
          console.log('inbox enviado')
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
.notas-text {
  color: white;
}
.inside-bar{
  margin-bottom: 40px;
}
.footer-loading {
  height: 50px;
  padding: 0;
}
.bar-loading {
  width: 100%;
  padding: 0;
  height: 100%;
  
}
.thumbsup-icon {
    position: relative;
    width: 300px;
    height: 300px;
}

.thumbsup-icon svg {
    position: absolute;
}

.thumbsup-icon .stripes {
    fill: #f7f7f7;
    animation: 1300ms stripes-swing infinite ease-in-out;
}

.thumbsup-icon .stars {
    fill: #febb02
}

.thumbsup-icon .star1 {
    animation: 1300ms star-fly1 infinite;
    z-index: 1;
}

.thumbsup-icon .star2 {
    animation: 1300ms star-fly2 infinite;
    z-index: 1;
}

.thumbsup-icon .star3 {
    animation: 1300ms star-fly3 infinite;
    z-index: 1;
}

.thumbsup-icon .star4 {
    animation: 1300ms star-fly4 infinite;
    z-index: 1;
}

.thumbsup-icon .star5 {
    animation: 1300ms star-fly5 infinite;
    z-index: 1;
}

.thumbsup-icon .thumbsup {
    animation: 1300ms thumbsup-shake infinite ease-in-out;
    z-index: 2;
}

@keyframes star-fly1 {
    0% {
        transform: translate(20%, 40%) scale(0.76, 0.76);
        opacity: 0;
    }
    12.8% {
        opacity: 1;
    }
    28.2% {
        transform: translate(0, 0) scale(1, 1);
    }
}

@keyframes star-fly2 {
    0% {
        transform: translate(-14%, 40%) scale(0.76, 0.76);
        opacity: 0;
    }
    12.8% {
        opacity: 1;
    }
    28.2% {
        transform: translate(0, 0) scale(1, 1);
    }
}

@keyframes star-fly3 {
    0% {
        transform: translate(5%, -35%) scale(0.76, 0.76);
        opacity: 0;
    }
    12.8% {
        opacity: 1;
    }
    28.2% {
        transform: translate(0, 0) scale(1, 1);
    }
}

@keyframes star-fly4 {
    0% {
        transform: translate(30%, 0) scale(0.76, 0.76);
        opacity: 0;
    }
    12.8% {
        opacity: 1;
    }
    28.2% {
        transform: translate(0, 0) scale(1, 1);
    }
}

@keyframes star-fly5 {
    0% {
        transform: translate(-20%, 0) scale(0.76, 0.76);
        opacity: 0;
    }
    12.8% {
        opacity: 1;
    }
    28.2% {
        transform: translate(0, 0) scale(1, 1);
    }
}

@keyframes thumbsup-shake {
    0% {
        transform: rotate(20deg) scale(0.74, 0.74);
        opacity: 0.1;
    }
    7.7% {
        opacity: 1;
        transform: rotate(0) scale(1, 1);
    }
    15.4% {
        transform: rotate(-11deg) scale(1.08, 1.08);
    }
    28.2% {
        transform: rotate(0) scale(1, 1);
    }
}

@keyframes stripes-swing {
    20.5% {
        transform: translate(4%, 0);
    }
    38.4% {
        transform: translate(-2%, 0);
    }
    59% {
        transform: translate(3.7%, 0);
    }
    79.5% {
        transform: translate(0, 0);
    }
}


.streak-bar {
  width: 180px;
}
.alias-text {
  color: white;
  margin-top: 10%;
}
.lvl-up-text {
  color: #641fff;
  font-size: 32px;
  margin-left: 100px;
  margin-right: -30px;
}
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
  margin-top: 15px;
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
#inboxes {
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
