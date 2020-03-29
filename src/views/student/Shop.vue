<template>
  <div>
    <v-container>
        <v-row justify="center"> <h1>Tienda</h1></v-row>
      <v-row class="ml-8">
        <v-col cols="4">
          <v-card width="300" height="176" flat elevation="2">
            <v-img
              @click="goToItem"
              height="100%"
              width="100%"
              contain
              src="https://res.cloudinary.com/dalnnaod7/image/upload/c_fill,h_176,w_300/v1585436908/netflix_z34yn5.png"
            ></v-img>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card width="300" height="176" flat elevation="2">
            <v-img
              @click="goToItem"
              height="100%"
              width="100%"
              contain
              src="https://res.cloudinary.com/dalnnaod7/image/upload/c_fill,h_176,w_300/v1585382017/spotify992_gp6ep7.png"
            ></v-img>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card width="300" height="176" flat elevation="2">
            <v-img
              @click="goToItem"
              height="100%"
              width="100%"
              contain
              src="https://res.cloudinary.com/dalnnaod7/image/upload/c_fill,w_300/v1585381948/amazon_ja1jeg.jpg"
            ></v-img>
          </v-card>
        </v-col>
        
       
      </v-row>
      <v-row class="ml-8 mt-12">
        <v-col cols="4">
          <v-card width="300" height="176" elevation="2" >
            <v-img
              @click="goToItem"
              height="100 %"
              contain
              src="https://res.cloudinary.com/dalnnaod7/image/upload/v1585382000/nintendo_amglus.jpg"
            ></v-img>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card width="300" height="176" elevation="2" >
            <v-img
              @click="goToItem"
              height="100 %"
              contain
              src="https://res.cloudinary.com/dalnnaod7/image/upload/c_fill,h_176,w_300/v1585382009/psplus_copy_kv5sgo.png"
            ></v-img>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card width="300" height="176" elevation="2" >
            <v-img
              @click="goToItem"
              height="100 %"
              contain
              src="https://res.cloudinary.com/dalnnaod7/image/upload/c_fill,h_176,w_300/v1585439174/xbox-game-pass_w5c8et.png"
            ></v-img>
          </v-card>
        </v-col>
       
      </v-row>
      <v-row class="ml-8 mt-12">
         <v-col cols="4">
          <v-card width="300" height="176" elevation="2" >
            <v-img
              @click="goToItem"
              height="100 %"
              contain
              src="https://res.cloudinary.com/dalnnaod7/image/upload/c_fill,h_176,w_300/v1585439582/apple_zikuit.jpg"
            ></v-img>
          </v-card>
        </v-col>
         <v-col cols="4">
          <v-card width="300" height="176" elevation="2" >
            <v-img
              @click="goToItem"
              height="100 %"
              contain
              src="https://res.cloudinary.com/dalnnaod7/image/upload/c_fill,h_176,w_300/v1585440050/google-play-store-logo_jdaaxo.webp"
            ></v-img>
          </v-card>
        </v-col>
         <v-col cols="4">
          <v-card width="300" height="176" elevation="2" >
            <v-img
              @click="goToItem"
              height="100%"
              contain
              src="https://res.cloudinary.com/dalnnaod7/image/upload/c_fill,h_176,w_300/v1585382031/steam_o92tsd.jpg"
            ></v-img>
          </v-card>
        </v-col>
        
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      giftcards: [
        {
          title: "netflix"
        }
      ]
    };
  },
  methods: {
    goToItem() {
      this.$router.push("/shopitem");
    },
    goToSpotify(){
        this.$router.push("/shopitem/spotify");
    },
    goToApple(){
        this.$router.push("/shopitem/apple");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>