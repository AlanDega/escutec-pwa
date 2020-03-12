<template>
    <div>
 <v-stepper v-model="e6" vertical class="daStepper">
            <v-stepper-step
              color="deep-purple accent-3"
              :complete="e6 > 1"
              step="1"
            >
              Select an app
              <small>Summarize if needed</small>
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
              >Configure analytics for this app</v-stepper-step
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
              >Select an ad format and name ad unit</v-stepper-step
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