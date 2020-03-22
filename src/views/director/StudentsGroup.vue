<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-card width="1200">
          <v-toolbar flat height="10">
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
                    >Crear Alumno</v-card-title
                  >
                  <v-container>
                    <v-card-text>
                      <v-text-field
                        color="deep-purple accent-3"
                        label="Alias"
                        v-model="student_alias"
                      ></v-text-field>
                      <v-text-field
                        color="deep-purple accent-3"
                        label="Email"
                        v-model="student_email"
                      ></v-text-field>
                      <v-text-field
                        color="deep-purple accent-3"
                        label="Contraseña"
                        v-model="student_password"
                      ></v-text-field>
                      <v-text-field
                        color="deep-purple accent-3"
                        label="Confirmar Contraseña"
                        v-model="student_password_confirmation"
                      ></v-text-field>
                    </v-card-text>
                  </v-container>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="deep-purple accent-3"
                      text
                      @click="createStudent"
                      >guardar</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
          </v-toolbar>
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
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase";
import { db } from "../../db";
export default {
  data() {
    return {
      classroom: this.$route.params.id,
      student_alias: null,
      student_email: null,
      student_password: null,
      student_password_confirmation: null,
      xp: 0,
      rating: 0,
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
      .doc(this.classroom)
      .get()
      .then(snapshot => {
        const document = snapshot.data();
        this.student_headers = document.student_headers;
        db.collection(this.school_name + "-" + this.classroom + "-students")
          .get()
          .then(querySnapshot => {
            const documents = querySnapshot.docs.map(doc => {
              this.students.push(doc.data());
            });
            console.log("student-docs", documents);
          });
      });
  },
  methods: {
    createStudent() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.student_email,
          this.student_password
        );
      db.collection(this.school_name + "-" + this.classroom + "-students")
        .doc(this.student_email)
        .set({
          level: this.level_selected,
          group: this.$route.params.id,
          alias: this.student_alias,
          email: this.student_email,
          student_password: this.student_password,
          xp: this.xp,
          rating: this.rating
        })
        .then(() => {
          db.collection("usuarios")
            .doc(this.student_email)
            .set({
              alias: this.student_alias,
              tipo_usuario: "student",
              level: this.level_selected,
              group: this.$route.params.id
            });
          console.log("exito");
          (this.student_alias = ""),
            (this.student_email = ""),
            db
              .collection(this.school_name + "-" + this.classroom + "-students")
              .get()
              .then(querySnapshot => {
                this.dialog = false;
                const documents = querySnapshot.docs.map(doc => doc.data());
                console.log("documents", documents);
                this.students = documents;
              });
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
