<template>
    <div>
 <v-stepper flat v-model="e6" vertical class="daStepper">
            <v-stepper-step
              color="deep-purple accent-3"
              :complete="e6 > 1"
              step="1"
            >
              Pasar Lista
              <small>Sumar xp</small>
            </v-stepper-step>

            <v-stepper-content color="deep-purple accent-3" step="1">
              <v-btn rounded color="deep-purple accent-3" dark @click="e6 = 2"
                >Hecho</v-btn
              >
            </v-stepper-content>

            <v-stepper-step
              color="deep-purple accent-3"
              :complete="e6 > 2"
              step="2"
              >Hacer trivia de Ingeniería</v-stepper-step
            >

            <v-stepper-content color="deep-purple accent-3" step="2">
              <v-btn rounded color="deep-purple accent-3" dark @click="e6 = 3"
                >Hecho</v-btn
              >
            </v-stepper-content>

            <v-stepper-step
              color="deep-purple accent-3"
              :complete="e6 > 3"
              step="3"
              >Revisar Tarea </v-stepper-step
            >

            <v-stepper-content color="deep-purple accent-3" step="3">
              <v-btn rounded color="deep-purple accent-3" dark @click="e6 = 4"
                >Hecho</v-btn
              >
            </v-stepper-content>
          </v-stepper>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                e6: 1
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>