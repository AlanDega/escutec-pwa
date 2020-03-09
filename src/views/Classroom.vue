<template>
  <div>
    <v-container fluid class="daContain">
      <v-row>
        <v-col cols="9" align="center">
          Media
 <v-row justify="center">
        <h1>modes</h1>
      </v-row>
        </v-col>
        <v-col cols="3">
          <v-stepper v-model="e6" vertical class="daStepper">
            <v-stepper-step :complete="e6 > 1" step="1">
              Select an app
              <small>Summarize if needed</small>
            </v-stepper-step>

            <v-stepper-content step="1">
              <v-btn color="primary" @click="e6 = 2">Hecho</v-btn>
            </v-stepper-content>

            <v-stepper-step :complete="e6 > 2" step="2">Configure analytics for this app</v-stepper-step>

            <v-stepper-content step="2">
              <v-btn color="primary" @click="e6 = 3">Hecho</v-btn>
            </v-stepper-content>

            <v-stepper-step :complete="e6 > 3" step="3">Select an ad format and name ad unit</v-stepper-step>

            <v-stepper-content step="3">
              <v-btn color="primary" @click="e6 = 4">Hecho</v-btn>
            </v-stepper-content>

            <v-stepper-step step="4">View setup instructions</v-stepper-step>
            <v-stepper-content step="4">
              <v-btn color="primary" @click="e6 = 1">Hecho</v-btn>
            </v-stepper-content>
          </v-stepper>
        </v-col>
      </v-row>
     
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      e6: 1
    };
  }
};
</script>

<style lang="scss" scoped>
.daContain {
  height: 100%;
}
.daStepper{
  max-height: 95%;
}
</style>