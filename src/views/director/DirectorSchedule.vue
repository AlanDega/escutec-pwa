<template>
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
          <v-data-table :headers="headers" :items="grupos">
            <template v-slot:item.hora="props">
              <v-edit-dialog
                :return-value.sync="props.item.hora"
                @save="save"
                @cancel="cancel"
                @open="open"
                @close="close"
              >
                {{ props.item.hora }}
                <template v-slot:input>
                  <v-text-field
                    v-model="props.item.hora"
                    :rules="[max25chars]"
                    label="Edit"
                    single-line
                    counter
                  ></v-text-field>
                </template>
              </v-edit-dialog>
            </template>
            <template v-slot:item.lunes="props">
              <v-edit-dialog
                :return-value.sync="props.item.lunes"
                large
                persistent
                @save="save"
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
                    v-model="props.item.lunes"
                    :items="subjects"
                    label="Edit"
                    single-line
                    counter
                    autofocus
                  ></v-select>
                </template>
              </v-edit-dialog>
            </template>
          </v-data-table>
        </div>
      </template>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      subjects: [
        "Historia",
        "Matemáticas",
        "Español",
        "Inglés",
        "Educación física",
        "Francés",
        "Informática",
        "Robotica"
      ],

      data_loading: true,
      headers: [
        {
          text: "hora",
          align: "start",
          sortable: false,
          value: "hora"
        },
        { text: "Lunes", value: "lunes" },
        { text: "Martes", value: "martes" },
        { text: "Miércoles", value: "miercoles" },
        { text: "Jueves", value: "jueves" },
        { text: "Viernes", value: "viernes" }
      ],
      grupos: [
        {
          hora: "",
          lunes: "",
          martes: "",
          miercoles: "",
          jueves: "",
          viernes: ""
        },
        {
          hora: "",
          lunes: "",
          martes: "",
          miercoles: "",
          protein: "",
          viernes: ""
        },
        {
          hora: "",
          lunes: "",
          martes: "",
          miercoles: "",
          protein: "",
          viernes: ""
        },
        {
          hora: "",
          lunes: "",
          martes: "",
          miercoles: "",
          jueves: "",
          viernes: ""
        },
        {
          hora: "",
          lunes: "",
          martes: "",
          miercoles: "",
          jueves: "",
          viernes: ""
        },
        {
          hora: "",
          lunes: "",
          martes: "",
          miercoles: "",
          jueves: "",
          viernes: ""
        },
        {
          hora: "",
          lunes: "",
          martes: "",
          miercoles: "",
          jueves: "",
          viernes: ""
        },
        {
          hora: "",
          lunes: "",
          martes: "",
          miercoles: "",
          jueves: "",
          viernes: ""
        }
      ]
      //    headers: [
      //     {
      //       text: "hora",
      //       align: "start",
      //       sortable: false,
      //       value: "hora"
      //     },
      //     { text: "Lunes", value: "lunes" },
      //     { text: "Martes", value: "martes" },
      //     { text: "Miércoles", value: "miercoles" },
      //     { text: "Jueves", value: "jueves" },
      //     { text: "Viernes", value: "viernes" }
      //   ],
      //   grupos: [
      //     {
      //       hora: "07:00 - 07:50",
      //       lunes: "",
      //       martes: "",
      //       miercoles: "",
      //       jueves: "",
      //       viernes: ""
      //     },
      //     {
      //       hora: "",
      //       lunes: "",
      //       martes: "",
      //       miercoles: "",
      //       protein: "",
      //       viernes: ""
      //     },
      //     {
      //       hora: "9:10 - 10:00",
      //       lunes: "",
      //       martes: "",
      //       miercoles: "",
      //       protein: "",
      //       viernes: ""
      //     },
      //     {
      //       hora: "10:00 - 10:50",
      //       lunes: "",
      //       martes: "",
      //       miercoles: "",
      //       jueves: "",
      //       viernes: ""
      //     },
      //     {
      //       hora: "10:50 - 11:40",
      //       lunes: "",
      //       martes: "C-3",
      //       miercoles: "",
      //       jueves: "",
      //       viernes: ""
      //     },
      //     {
      //       hora: "11:40 - 12:30",
      //       lunes: "",
      //       martes: "",
      //       miercoles: "",
      //       jueves: "",
      //       viernes: ""
      //     },
      //     {
      //       hora: "",
      //       lunes: "",
      //       martes: "",
      //       miercoles: "",
      //       jueves: "",
      //       viernes: ""
      //     },
      //     {
      //       hora: "13:40 - 14:30",
      //       lunes: "",
      //       martes: "",
      //       miercoles: "",
      //       jueves: "",
      //       viernes: ""
      //     }
      //   ]
    };
  },
  mounted() {
    setTimeout(() => (this.data_loading = false), 2000);
  },
  methods: {
    save() {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Data saved";
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
