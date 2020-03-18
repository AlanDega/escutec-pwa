<template>
  <v-container>
    <v-row>
      <v-col cols="4">
        <v-card class="mx-auto" max-width="300">
          <v-toolbar color="deep-purple accent-3" dark>
            <v-row justify="center">
              <v-icon height="100" width="100">mdi-image</v-icon>
            </v-row>
            <template v-slot:extension>
              <v-dialog v-model="img_dialog" width="500">
                <template v-slot:activator="{ on }">
                  <v-fab-transition>
                    <v-btn
                      color="white"
                      fab
                      large
                      dark
                      v-on="on"
                      absolute
                      bottom
                      right
                    >
                      <v-icon color="deep-purple accent-3">mdi-plus </v-icon>
                    </v-btn>
                  </v-fab-transition>
                </template>

                <v-card>
                  <v-card-title class="headline grey lighten-2" primary-title
                    >Crear Recurso</v-card-title
                  >
                  <v-container>
                    <v-card-text>
                      <v-text-field
                        label="Título"
                        v-model="img_title"
                      ></v-text-field>
                      <v-text-field
                        label="Link"
                        v-model="img_url"
                      ></v-text-field>
                    </v-card-text>
                  </v-container>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="deep-purple accent-3"
                      text
                      @click="createImgResource"
                      >guardar</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
          </v-toolbar>
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
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card class="mx-auto" max-width="300">
          <v-toolbar color="deep-purple accent-3" dark>
            <v-row justify="center">
              <v-icon height="100" width="100">mdi-play-box</v-icon>
            </v-row>
            <template v-slot:extension>
              <v-dialog v-model="video_dialog" width="500">
                <template v-slot:activator="{ on }">
                  <v-fab-transition>
                    <v-btn
                      color="white"
                      fab
                      large
                      dark
                      v-on="on"
                      absolute
                      bottom
                      right
                    >
                      <v-icon color="deep-purple accent-3">mdi-plus </v-icon>
                    </v-btn>
                  </v-fab-transition>
                </template>

                <v-card>
                  <v-card-title class="headline grey lighten-2" primary-title
                    >Crear Recurso</v-card-title
                  >
                  <v-container>
                    <v-card-text>
                      <v-text-field
                        label="Título"
                        v-model="video_title"
                      ></v-text-field>
                      <v-text-field
                        label="Link"
                        v-model="video_url"
                      ></v-text-field>
                    </v-card-text>
                  </v-container>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="deep-purple accent-3"
                      text
                      @click="createVideoResource"
                      >guardar</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
          </v-toolbar>
          <v-row justify="center">
            <v-col>
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
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card class="mx-auto" max-width="300">
          <v-toolbar color="deep-purple accent-3" dark>
            <v-row justify="center">
              <v-icon height="100" width="100">mdi-text</v-icon>
            </v-row>
            <template v-slot:extension>
              <v-dialog v-model="text_dialog" width="500">
                <template v-slot:activator="{ on }">
                  <v-fab-transition>
                    <v-btn
                      color="white"
                      fab
                      large
                      dark
                      v-on="on"
                      absolute
                      bottom
                      right
                    >
                      <v-icon color="deep-purple accent-3">mdi-plus </v-icon>
                    </v-btn>
                  </v-fab-transition>
                </template>

                <v-card>
                  <v-card-title class="headline grey lighten-2" primary-title
                    >Crear Recurso</v-card-title
                  >
                  <v-container>
                    <v-card-text>
                      <v-text-field
                        label="Título"
                        v-model="text_title"
                      ></v-text-field>
                      <v-text-field
                        label="Link"
                        v-model="text_url"
                      ></v-text-field>
                    </v-card-text>
                  </v-container>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="deep-purple accent-3"
                      text
                      @click="createTextResource"
                      >guardar</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
          </v-toolbar>
          <v-row justify="center">
            <v-col>
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
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { db } from '../../db'
import firebase from 'firebase'

export default {
  data() {
    return {
      img_resources: [],
      img_title: null,
      img_url: null,
      video_resources: [],
      video_title: null,
      video_url: null,
      text_resources: [],
      text_title: null,
      text_url: null,
      classroom: 'ingeniería-preparatoria-stjohns',
      img_dialog: false,
      video_dialog: false,
      text_dialog: false,
      fab: false,
      hidden: false
    };
  },
  mounted(){
     db.collection(this.classroom + "-img-resources")
            .get()
            .then(querySnapshot => {
              const documents = querySnapshot.docs.map(doc => doc.data());
              console.log("documents", documents);
              this.img_resources = documents;
            });
     db.collection(this.classroom + "-video-resources")
            .get()
            .then(querySnapshot => {
              const documents = querySnapshot.docs.map(doc => doc.data());
              console.log("documents", documents);
              this.video_resources = documents;
            });
     db.collection(this.classroom + "-text-resources")
            .get()
            .then(querySnapshot => {
              const documents = querySnapshot.docs.map(doc => doc.data());
              console.log("documents", documents);
              this.text_resources = documents;
            });
  },
  methods: {
    createImgResource() {
      db.collection(this.classroom + "-img-resources")
        .add({
          title: this.img_title,
          url: this.img_url,
        })
        .then(() => {
          console.log("exito");
          db.collection(this.classroom + "-img-resources")
            .get()
            .then(querySnapshot => {
              this.dialog = false;
              const documents = querySnapshot.docs.map(doc => doc.data());
              console.log("documents", documents);
              this.img_resources = documents;
            });
        });
    },
    createVideoResource() {
      db.collection(this.classroom + "-video-resources")
        .add({
          title: this.video_title,
          url: this.video_url,
        })
        .then(() => {
          console.log("exito");
          db.collection(this.classroom + "-video-resources")
            .get()
            .then(querySnapshot => {
              this.video_dialog = false;
              const documents = querySnapshot.docs.map(doc => doc.data());
              console.log("documents", documents);
              this.video_resources = documents;
            });
        });
    },
    createTextResource() {
      db.collection(this.classroom + "-text-resources")
        .add({
          title: this.text_title,
          url: this.text_url,
        })
        .then(() => {
          console.log("exito");
          db.collection(this.classroom + "-text-resources")
            .get()
            .then(querySnapshot => {
              this.text_dialog = false;
              const documents = querySnapshot.docs.map(doc => doc.data());
              console.log("documents", documents);
              this.text_resources = documents;
            });
        });
    },
  }
};
</script>

<style lang="scss" scoped></style>
