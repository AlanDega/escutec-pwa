<template>
  <div>
    <v-tabs centered>
      <v-tab>Primaria</v-tab>
      <v-tab>Secundaria</v-tab>
      <v-tab>Preparatoria</v-tab>
      <v-tab-item>
        <v-container>
          <v-row justify="center" align="center">
            <v-col cols="4" align="center">
              <v-card
                v-for="(group, i) in groups"
                :key="i"
                class="display-1 mt-6"
                @click="goToGroup(group)"
              >
                <h1 class="group-text">{{ group}}</h1>
              </v-card>
            </v-col>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: null,
      groups: ["A-1", "A-2", "A-3"]
    };
  },
  methods: {
    goToGroup(group) {
      this.$router.push({ name: "group", params: { id: group } });
    }
  }
};
</script>

<style lang="scss" scoped>
.group-text {
  color: #3300ff;
  padding: 50px 0px;
  background: #323241;
}
</style>