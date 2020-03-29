<template>
    <div>
      <template >
  <v-card
    max-width="500"
    class="mx-auto"
  >
    <v-toolbar
    class="mt-8"
      color="deep-purple accent-4"
      dark
    >
     <h2>Clasificación</h2>

    

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-trophy-outline</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list subheader>
      <v-subheader>Top3</v-subheader>

      <v-list-item
        v-for="item in top1_3"
        :key="item.group"
        @click=""
      >
        <v-list-item-avatar>
          <v-img :src="item.avatar"></v-img>
        </v-list-item-avatar>

         <v-list-item-content>
          <v-list-item-title v-text="item.group"></v-list-item-title>
          <v-list-item-subtitle v-text="item.group_xp">
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-icon>
          <v-icon > mdi-numeric-{{i}}-outline</v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list subheader>

      <v-list-item
      two-line
        v-for="item in top4_9"
        :key="item.group"
        @click=""
      >
        <v-list-item-avatar >
          <v-img :src="item.avatar"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="item.group"></v-list-item-title>
          <v-list-item-subtitle v-text="item.group_xp">
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>
    </div>
</template>

<script>
  export default {
    data: () => ({
      top1_3: [
        {  group: 'A-1', avatar: 'https://res.cloudinary.com/dalnnaod7/image/upload/v1585446680/samurai-_lqoqqj.jpg', group_xp:31200 },
        {  group: 'B-3', avatar: 'https://res.cloudinary.com/dalnnaod7/image/upload/v1585446794/twitter-presentation-1_m3vs7i.png', group_xp:29800 },
        {  group: 'B-2', avatar: 'https://res.cloudinary.com/dalnnaod7/image/upload/v1585447030/liontutorialdribbbleshot_hrtmlb.jpg', group_xp:27500 },
      ],
      top4_9: [
           {  group: 'C-1', avatar: 'https://res.cloudinary.com/dalnnaod7/image/upload/v1585447072/attachment_96391748_f4rarp.jpg', group_xp:25040 },
           {  group: 'C-3', avatar: 'https://res.cloudinary.com/dalnnaod7/image/upload/v1585447457/eebd8066712593.5b1fb339c938f_tp9lcj.png', group_xp:20100 },
           {  group: 'B-1', avatar: 'https://res.cloudinary.com/dalnnaod7/image/upload/v1585447545/71f20a84ac3e30bee442a19d19a3932a_wcm0yj.jpg', group_xp:18100 },
           {  group: 'A-2', avatar: 'https://res.cloudinary.com/dalnnaod7/image/upload/v1585447656/d824ee1eb104bc67456bb3cc73584d58_st78hp.jpg', group_xp:17762 },
           {  group: 'A-3', avatar: 'https://res.cloudinary.com/dalnnaod7/image/upload/v1585447744/attachment_91574770_kw1acc.jpg', group_xp:15690 },
           {  group: 'C-2', avatar: 'https://res.cloudinary.com/dalnnaod7/image/upload/v1585447746/97c6da40-dd98-44ff-977d-dbdaa4a139be_nieimb.jpg', group_xp:15102 },

      ],
    }),
  }
</script>

<style lang="scss" scoped>

</style>