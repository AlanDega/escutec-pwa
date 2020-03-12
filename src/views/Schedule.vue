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
      <v-card>
        <table style="width:100%">
          <tr  >
            <th v-for="header in headers" :key="header.id">
              {{header}}
            </th>
          </tr>  
                    <v-divider color="primary"></v-divider>

          <tr v-for="grupo in grupos" :key="grupo.id">
            <td>{{grupo.hora}}</td> 
            <td @click="log(grupo.lunes)">{{grupo.lunes}}</td> 
            <td>{{grupo.martes}}</td> 
            <td>{{grupo.miercoles}}</td> 
            <td>{{grupo.jueves}}</td> 
            <td>{{grupo.viernes}}</td> 
          </tr>
          
        </table>
      </v-card>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      data_loading:true,
      headers: [ 'lunes', 'martes', 'miercoles' , 'jueves', 'viernes' ],
       
      grupos: [
        {
          hora: "07:00 - 07:50",
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
      ]
    };
  },
  mounted() {
    setTimeout(() => (this.data_loading = false), 2000);
  },
  methods:{
    log(grupo){
      console.log(grupo)
      this.$router.push({ name:"group-actions", params: { id:grupo } })
    }
  }
};
</script>

<style lang="scss" scoped></style>
