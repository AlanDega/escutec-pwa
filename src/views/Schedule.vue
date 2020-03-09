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
    <div v-if="this.data_loading === false">
      <v-data-table
       item-key="name"
        class="elevation-1"
         :headers="headers"
        :items="grupos"
        :items-per-page="9"
         hide-default-footer>
         </v-data-table>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      data_loading: true,
      headers:[
          {
              text: '   ',
            align: 'start',
            sortable: false,
            value: 'name',
      },
          { text: 'Lunes', value: 'calories' },
          { text: 'Martes', value: 'fat' },
          { text: 'Miercoles', value: 'carbs' },
          { text: 'Jueves', value: 'protein' },
          { text: 'Viernes', value: 'sodium' },
      ],
      grupos:[
         {
          name: '07:00 - 07:50',
          calories: 'A-1',
          fat: 'B-3',
          carbs: 'E-1',
          protein: 'C-2',
          sodium: 'C-1',
          calcium: '14%',
          iron: '1%'
        },
        {
          name: '07:50 - 08:40',
          calories: 'B-1',
          fat: 'B-2',
          carbs: 'B-3',
          protein: 'A-2',
          sodium: 'A-1',
          calcium: '8%',
          iron: '1%'
        },
        {
          name: '9:10 - 10:00',
          calories: 'B-2',
          fat: 'C-1',
          carbs: 'A-1',
          protein: 'E-2',
          sodium: 'B-3',
          calcium: '6%',
          iron: '7%'
        },
        {
          name: '10:00 - 10:50',
          calories: 'A-3',
          fat: 'A-3',
          carbs: 'B-2',
          protein: 'E-1',
          sodium: 'E-2',
          calcium: '3%',
          iron: '8%'
        },
        {
          name: '10:50 - 11:40',
          calories: 'C-1',
          fat: 'C-3',
          carbs: 'A-2',
          protein:'C-1',
          sodium: 'A-1',
          calcium: '7%',
          iron: '16%'
        },
        {
          name: '11:40 - 12:30',
          calories: 'A-2',
          fat: 'D-1',
          carbs: 'C-2',
          protein: 'B-3',
          sodium: 'A-1',
          calcium: '0%',
          iron: '0%'
        },
        {
          name: '12:50 - 13:40',
          calories: 'C-2',
          fat: 'D-2',
          carbs: 'B-1',
          protein: 'A-2'
,          sodium: 'A-1',
          calcium: '0%',
          iron: '2%'
        },
        {
          name: '13:40 - 14:30' ,
          calories: '',
          fat: 'E-1',
          carbs: 'B-3',
          protein: 'A-1',
          sodium: 'C-2',
          calcium: '0%',
          iron: '45%'
        },
      ]
    };
  },
  mounted() {
    setTimeout(() => (this.data_loading = false), 2000);
  }
};
</script>

<style lang="scss" scoped>
</style>