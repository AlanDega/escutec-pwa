<template>
  <div>
    <v-container>
      <v-card width="1200">
        <v-toolbar color="deep-purple accent-3">
          <template v-slot:extension>
            <v-dialog v-model="dialog" width="500">
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
                    <v-icon color="deep-purple accent-3">mdi-plus</v-icon>
                  </v-btn>
                </v-fab-transition>
              </template>

              <v-card>
                <v-card-title class="headline grey lighten-2" primary-title
                  >Crear Grupo</v-card-title
                >
                <v-container>
                  <v-card-text>
                    <v-text-field
                      color="deep-purple accent-3"
                      label="Nombre del grupo"
                      v-model="group_name"
                    ></v-text-field>
                    <v-select
                      color="deep-purple accent-3"
                      v-model="value"
                      :items="items"
                      chips
                      label="Materias"
                      multiple
                      outlined
                    ></v-select>
                  </v-card-text>
                </v-container>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="deep-purple accent-3" text @click="createGroup"
                    >guardar</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
          <v-tabs color="white" centered>
            <v-tab>horario</v-tab>
            <v-tab>alumnos</v-tab>
            <v-tab>estadisticas</v-tab>
            <v-tab>notificaciones</v-tab>
            <v-tab-item>
              <v-container>
                <div v-if="data_loading">
                  <v-data-table
                    item-key="name"
                    class="elevation-1"
                    loading
                    loading-text="Loading... Please wait"
                    hide-default-footer
                  ></v-data-table>
                </div>
                <div v-if="!data_loading">
                  <template>
                    <div>
                      <v-card>
                        <v-data-table
                          :headers="headers"
                          :items="schedule"
                          hide-default-footer
                        >
                          <template v-slot:item.hora="props">
                            <v-edit-dialog
                              :return-value.sync="props.item.hora"
                              large
                              persistent
                              @save="
                                saveHora(props.item.hora, props.item.index)
                              "
                              @cancel="cancel"
                              @open="open"
                              @close="close"
                            >
                              {{ props.item.hora }}
                              <template v-slot:input>
                                <div class="mt-4 title">Update lunes</div>
                              </template>
                              <template v-slot:input>
                                <v-text-field
                                  v-model="props.item.hora"
                                  label="Materia"
                                  single-line
                                  counter
                                  autofocus
                                ></v-text-field>
                              </template>
                            </v-edit-dialog>
                          </template>
                          <template v-slot:item.lunes="props">
                            <v-edit-dialog
                              :return-value.sync="props.item.lunes"
                              large
                              persistent
                              @save="
                                saveLunes(
                                  props.item.lunes,
                                  props.item.index,
                                  props.item.prof
                                )
                              "
                              @cancel="cancel"
                              @open="open"
                              @close="close"
                            >
                              <div>
                                {{ props.item.lunes + "-" + props.item.prof }}
                              </div>
                              <template v-slot:input>
                                <div class="mt-4 title">Update lunes</div>
                              </template>
                              <template v-slot:input>
                                <v-select
                                  outlined
                                  v-model="props.item.lunes"
                                  :items="subjects"
                                  label="Materia"
                                  single-line
                                  counter
                                  autofocus
                                ></v-select>
                                <v-select
                                  outlined
                                  v-model="props.item.prof"
                                  :items="profs"
                                  label="Profesor/a"
                                  single-line
                                  counter
                                  autofocus
                                ></v-select>
                              </template>
                            </v-edit-dialog>
                          </template>
                          <template v-slot:item.martes="props">
                            <v-edit-dialog
                              :return-value.sync="props.item.martes"
                              large
                              persistent
                              @save="
                                saveMartes(props.item.martes, props.item.index)
                              "
                              @cancel="cancel"
                              @open="open"
                              @close="close"
                            >
                              <div>{{ props.item.martes }}</div>
                              <template v-slot:input>
                                <div class="mt-4 title">Update martes</div>
                              </template>
                              <template v-slot:input>
                                <v-select
                                  outlined
                                  v-model="props.item.martes"
                                  :items="subjects"
                                  label="Materia"
                                  single-line
                                  counter
                                  autofocus
                                ></v-select>
                              </template>
                            </v-edit-dialog>
                          </template>
                          <template v-slot:item.miercoles="props">
                            <v-edit-dialog
                              :return-value.sync="props.item.miercoles"
                              large
                              persistent
                              @save="
                                saveMiercoles(
                                  props.item.miercoles,
                                  props.item.index
                                )
                              "
                              @cancel="cancel"
                              @open="open"
                              @close="close"
                            >
                              <div>{{ props.item.miercoles }}</div>
                              <template v-slot:input>
                                <div class="mt-4 title">Update miercoles</div>
                              </template>
                              <template v-slot:input>
                                <v-select
                                  outlined
                                  v-model="props.item.miercoles"
                                  :items="subjects"
                                  label="Materia"
                                  single-line
                                  counter
                                  autofocus
                                ></v-select>
                              </template>
                            </v-edit-dialog>
                          </template>
                          <template v-slot:item.jueves="props">
                            <v-edit-dialog
                              :return-value.sync="props.item.jueves"
                              large
                              persistent
                              @save="
                                saveJueves(props.item.jueves, props.item.index)
                              "
                              @cancel="cancelar"
                              @open="open"
                              @close="close"
                            >
                              <div>{{ props.item.jueves }}</div>
                              <template v-slot:input>
                                <div class="mt-4 title">Update jueves</div>
                              </template>
                              <template v-slot:input>
                                <v-select
                                  outlined
                                  v-model="props.item.jueves"
                                  :items="subjects"
                                  label="Materia"
                                  single-line
                                  counter
                                  autofocus
                                ></v-select>
                              </template>
                            </v-edit-dialog>
                          </template>
                          <template v-slot:item.viernes="props">
                            <v-edit-dialog
                              :return-value.sync="props.item.viernes"
                              large
                              persistent
                              @save="
                                saveViernes(
                                  props.item.viernes,
                                  props.item.index
                                )
                              "
                              @cancel="cancel"
                              @open="open"
                              @close="close"
                            >
                              <div>{{ props.item.viernes }}</div>
                              <template v-slot:input>
                                <div class="mt-4 title">Update viernes</div>
                              </template>
                              <template v-slot:input>
                                <v-select
                                  outlined
                                  v-model="props.item.viernes"
                                  :items="subjects"
                                  label="Materia"
                                  single-line
                                  counter
                                  autofocus
                                ></v-select>
                              </template>
                            </v-edit-dialog>
                          </template>
                        </v-data-table>
                      </v-card>
                    </div>
                  </template>
                </div>
              </v-container>
            </v-tab-item>
            <v-tab-item>
              <v-container>
                <v-row justify="center">
                  <v-data-table :headers="student_headers" :items="students">
                    <template v-slot:item.alias="props">
                      <v-edit-dialog
                        :return-value.sync="props.item.alias"
                        large
                        persistent
                        @save="saveHora(props.item.alias)"
                        @cancel="cancel"
                        @open="open"
                        @close="close"
                      >
                        {{ props.item.alias }}
                        <template v-slot:input>
                          <div class="mt-4 title">Update lunes</div>
                        </template>
                        <template v-slot:input>
                          <v-text-field
                            v-model="props.item.alias"
                            label="Alias"
                            single-line
                            counter
                            autofocus
                          ></v-text-field>
                        </template>
                      </v-edit-dialog>
                    </template>
                  </v-data-table>
                </v-row>
              </v-container>
            </v-tab-item>
            <v-tab-item>
              <h1>secundaria</h1>
            </v-tab-item>
            <v-tab-item>
              <h1>preparatoria</h1>
            </v-tab-item>
          </v-tabs>
        </v-toolbar>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { db } from "../../db";
export default {
  data() {
    return {
      student_headers: [],
      students: [],
      group_name: null,
      school_name: "stj",
      level_selected: "primaria",
      subjects: [],
      headers: [],
      schedule: [],
      data_loading: true,
      profs: []
    };
  },
  mounted() {
    setTimeout(() => (this.data_loading = false), 2000);
    db.collection(this.school_name + "-" + this.level_selected + "-groups")
      .doc(this.$route.params.id)
      .get()
      .then(snapshot => {
        const document = snapshot.data();
        console.log("group-document", document);
        this.group_name = document.group_name;
        this.schedule = document.schedule;
        this.headers = document.headers;
        this.subjects = document.subjects;
        this.student_headers = document.student_headers;
        this.students = document.students;
        db.collection(
          this.school_name + "-" + this.level_selected + "-professors"
        )
          .get()
          .then(querySnapshot => {
            const documents = querySnapshot.docs.map(doc => {
              this.profs.push(doc.data().prof_name);
            });
          });
      });
  },
  methods: {
    saveHora(change, i) {
      console.log("change", change, "item", i);
      db.collection(this.school_name + "-" + this.level_selected + "-groups")
        .doc(this.$route.params.id)
        .get()
        .then(snapshot => {
          const document = snapshot.data();
          console.log("doc-before", document);
          document.schedule[i].hora = change;
          const newDoc = document;
          console.log("doc-after", newDoc);
          db.collection(
            this.school_name + "-" + this.level_selected + "-groups"
          )
            .doc(this.$route.params.id)
            .set(newDoc)
            .then(() => {
              console.log("field updated");

              this.snack = true;
              this.snackColor = "success";
              this.snackText = "Data saved";
            });
        });
    },
    saveLunes(change, i, prof) {
      console.log("change", change, "item", i);
      db.collection(this.school_name + "-" + this.level_selected + "-groups")
        .doc(this.$route.params.id)
        .get()
        .then(snapshot => {
          const document = snapshot.data();
          console.log("doc-before", document);
          document.schedule[i].lunes = change;
          document.schedule[i].prof = prof;
          const newDoc = document;
          console.log("doc-after", newDoc);
          db.collection(
            this.school_name + "-" + this.level_selected + "-groups"
          )
            .doc(this.$route.params.id)
            .set(newDoc)
            .then(() => {
              console.log("field updated");

              this.snack = true;
              this.snackColor = "success";
              this.snackText = "Data saved";
            });
        });
    },
    saveMartes(change, i) {
      console.log("change", change, "item", i);
      db.collection(this.school_name + "-" + this.level_selected + "-groups")
        .doc(this.$route.params.id)
        .get()
        .then(snapshot => {
          const document = snapshot.data();
          console.log("doc-before", document);
          document.schedule[i].martes = change;
          const newDoc = document;
          console.log("doc-after", newDoc);
          db.collection(
            this.school_name + "-" + this.level_selected + "-groups"
          )
            .doc(this.$route.params.id)
            .set(newDoc)
            .then(() => {
              console.log("field updated");

              this.snack = true;
              this.snackColor = "success";
              this.snackText = "Data saved";
            });
        });
    },
    saveMiercoles(change, i) {
      console.log("change", change, "item", i);
      db.collection(this.school_name + "-" + this.level_selected + "-groups")
        .doc(this.$route.params.id)
        .get()
        .then(snapshot => {
          const document = snapshot.data();
          console.log("doc-before", document);
          document.schedule[i].miercoles = change;
          const newDoc = document;
          console.log("doc-after", newDoc);
          db.collection(
            this.school_name + "-" + this.level_selected + "-groups"
          )
            .doc(this.$route.params.id)
            .set(newDoc)
            .then(() => {
              console.log("field updated");

              this.snack = true;
              this.snackColor = "success";
              this.snackText = "Data saved";
            });
        });
    },
    saveJueves(change, i) {
      console.log("change", change, "item", i);
      db.collection(this.school_name + "-" + this.level_selected + "-groups")
        .doc(this.$route.params.id)
        .get()
        .then(snapshot => {
          const document = snapshot.data();
          console.log("doc-before", document);
          document.schedule[i].jueves = change;
          const newDoc = document;
          console.log("doc-after", newDoc);
          db.collection(
            this.school_name + "-" + this.level_selected + "-groups"
          )
            .doc(this.$route.params.id)
            .set(newDoc)
            .then(() => {
              console.log("field updated");

              this.snack = true;
              this.snackColor = "success";
              this.snackText = "Data saved";
            });
        });
    },
    saveViernes(change, i) {
      console.log("change", change, "item", i);
      db.collection(this.school_name + "-" + this.level_selected + "-groups")
        .doc(this.$route.params.id)
        .get()
        .then(snapshot => {
          const document = snapshot.data();
          console.log("doc-before", document);
          document.schedule[i].viernes = change;
          const newDoc = document;
          console.log("doc-after", newDoc);
          db.collection(
            this.school_name + "-" + this.level_selected + "-groups"
          )
            .doc(this.$route.params.id)
            .set(newDoc)
            .then(() => {
              console.log("field updated");

              this.snack = true;
              this.snackColor = "success";
              this.snackText = "Data saved";
            });
        });
    },

    cancel() {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Canceled";
    },
    open() {
      this.snack = true;
      this.snackColor = "info";
      this.snackText = "Dialog opened";
    },
    close() {
      console.log("Dialog closed");
    },

    log(grupo) {
      console.log(grupo);
      this.$router.push({ name: "group-actions", params: { id: grupo } });
    }
  }
};
</script>

<style lang="scss" scoped></style>
