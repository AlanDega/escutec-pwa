<template>
        <div>
<v-row justify="center" class="movie" >
     <video  height="70%" width="70%" autoplay controls>
  <source src="https://res.cloudinary.com/dalnnaod7/video/upload/v1585431571/y2mate.com_-_Spotify_TV_Commercial_freeyourmusic_udlCJW4I-l8_360p_qpbhq1.mp4" type="video/mp4">
</video>
    </v-row>
    <v-row >
        <v-col cols="7">
            <v-card flat>
                <v-card-text>
                   <v-row justify="center" class="mt-12">
                       <h1>Spotify</h1>
                   </v-row>
                   <v-row justify="center" class="mt-12">
                           <p>Reproduce millones de canciones sin anuncios, sin conexión y on-demand.</p>
                   </v-row>     
                </v-card-text>
            </v-card>
        </v-col>
        <v-col>
            <v-row justify="start" align="center" class="fill-height">
            <v-col cols="3">
                <h1>30</h1>
            </v-col>
            <v-col cols="3">
                                <v-icon height="220" width="220" color="deep-purple accent-3">mdi-atom-variant</v-icon>

            </v-col>
            </v-row>
            <v-row justify="left">
                <v-dialog v-model="confirmation_modal" width="600">
                    <template v-slot:activator="{on}">
                        <v-btn color="deep-purple accent-3" dark v-on="on">
                    comprar
                </v-btn> 
                    </template>
                    <v-card>
                        <v-container>
                            <v-row justify="center" class="ml-4" >
                               <CardFlip /> 
                            </v-row>
                            <v-row justify="center">
                                                    <h2>Tú compra ha sido exitosa</h2>
                            </v-row>
                            <v-row justify="center">
                                <p>En unos momentos recibiras el código para poder canjear tú tarjeta</p>
                            </v-row>
                            <v-row justify="center">

                            </v-row>
                            

                    
                        </v-container>
                    </v-card>
                </v-dialog>
               
            </v-row>

        </v-col>
    </v-row>
   
    </div>
</template>

<script>
    import CardFlip from '../../components/student/CardFlip'
    export default {
        components:{
            CardFlip
        },
        data() {
            return {
                confirmation_modal: false
            }
        },
    }
</script>

<style lang="scss" scoped>
.movie{
    background-color: black;
}

</style>