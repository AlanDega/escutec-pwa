<template>
  <div>
    <v-tabs centered>
      <v-tab>horario</v-tab>
      <v-tab>estadisticas</v-tab>
      <v-tab>notificaciones</v-tab>
      <v-tab-item>
        <v-container>
          <h1>{{ prof_name }}</h1>
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
                        @save="saveHora(props.item.hora, props.item.index)"
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
                            label=""
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
                        @save="saveLunes(props.item.lunes, props.item.index)"
                        @cancel="cancel"
                        @open="open"
                        @close="close"
                      >
                        <div>{{ props.item.lunes }}</div>
                        <template v-slot:input>
                          <div class="mt-4 title">Update lunes</div>
                        </template>
                        <template v-slot:input>
                          <v-select
                            outlined
                            v-model="props.item.lunes"
                            :items="groups"
                            label="Grupo"
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
                        @save="saveMartes(props.item.martes, props.item.index)"
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
                            :items="groups"
                            label="Edit"
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
                          saveMiercoles(props.item.miercoles, props.item.index)
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
                            :items="groups"
                            label="Edit"
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
                        @save="saveJueves(props.item.jueves, props.item.index)"
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
                            :items="groups"
                            label="Edit"
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
                          saveViernes(props.item.viernes, props.item.index)
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
                            :items="groups"
                            label="Edit"
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
        <h1>secundaria</h1>
      </v-tab-item>
      <v-tab-item>
        <h1>preparatoria</h1>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import { db } from "../../db";
export default {
  data() {
    return {
      prof_name: null,
      school_name: "st.johns",
      level_selected: "primaria",
      subjects: [],
      headers: [],
      schedule: [],
      groups: [],
      data_loading: true
    };
  },
  mounted() {
    setTimeout(() => (this.data_loading = false), 2000);

    db.collection(this.school_name + "-" + this.level_selected + "-professors")
      .doc(this.$route.params.id)
      .get()
      .then(snapshot => {
        const document = snapshot.data();
        console.log("prof-document", document);
        this.prof_name = document.prof_name;
        this.schedule = document.schedule;
        this.headers = document.headers;
        this.subjects = document.subjects;
        db.collection(this.school_name + "-" + this.level_selected + "-groups")
          .get()
          .then(querySnapshot => {
            const documents = querySnapshot.docs.map(doc => {
              this.groups.push(doc.data().group_name);
            });
          });
      });
  },
  methods: {
    saveHora(change, i) {
      console.log("change", change, "item", i);
      db.collection(
        this.school_name + "-" + this.level_selected + "-professors"
      )
        .doc(this.$route.params.id)
        .get()
        .then(snapshot => {
          const document = snapshot.data();
          console.log("doc-before", document);
          document.schedule[i].hora = change;
          const newDoc = document;
          console.log("doc-after", newDoc);
          db.collection(
            this.school_name + "-" + this.level_selected + "-professors"
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
    saveLunes(change, i) {
      console.log("change", change, "item", i);
      db.collection(
        this.school_name + "-" + this.level_selected + "-professors"
      )
        .doc(this.$route.params.id)
        .get()
        .then(snapshot => {
          const document = snapshot.data();
          console.log("doc-before", document);
          document.schedule[i].lunes = change;
          const newDoc = document;
          console.log("doc-after", newDoc);
          db.collection(
            this.school_name + "-" + this.level_selected + "-professors"
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
      db.collection(
        this.school_name + "-" + this.level_selected + "-professors"
      )
        .doc(this.$route.params.id)
        .get()
        .then(snapshot => {
          const document = snapshot.data();
          console.log("doc-before", document);
          document.schedule[i].martes = change;
          const newDoc = document;
          console.log("doc-after", newDoc);
          db.collection(
            this.school_name + "-" + this.level_selected + "-professors"
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
      db.collection(
        this.school_name + "-" + this.level_selected + "-professors"
      )
        .doc(this.$route.params.id)
        .get()
        .then(snapshot => {
          const document = snapshot.data();
          console.log("doc-before", document);
          document.schedule[i].miercoles = change;
          const newDoc = document;
          console.log("doc-after", newDoc);
          db.collection(
            this.school_name + "-" + this.level_selected + "-professors"
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
      db.collection(
        this.school_name + "-" + this.level_selected + "-professors"
      )
        .doc(this.$route.params.id)
        .get()
        .then(snapshot => {
          const document = snapshot.data();
          console.log("doc-before", document);
          document.schedule[i].jueves = change;
          const newDoc = document;
          console.log("doc-after", newDoc);
          db.collection(
            this.school_name + "-" + this.level_selected + "-professors"
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
      db.collection(
        this.school_name + "-" + this.level_selected + "-professors"
      )
        .doc(this.$route.params.id)
        .get()
        .then(snapshot => {
          const document = snapshot.data();
          console.log("doc-before", document);
          document.schedule[i].viernes = change;
          const newDoc = document;
          console.log("doc-after", newDoc);
          db.collection(
            this.school_name + "-" + this.level_selected + "-professors"
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
