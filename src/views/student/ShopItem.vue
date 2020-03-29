<template>
        <div>
<v-row justify="center" class="movie" >
     <video  height="70%" width="70%" autoplay controls>
  <source src="https://res.cloudinary.com/dalnnaod7/video/upload/v1585393983/y2mate.com_-_Estos_son_los_ESTRENOS_de_ABRIL_DE_NETFLIX_ESPAN%CC%83A_BA-mu3txjrs_1080p_bbph6s.mp4" type="video/mp4">
</video>
    </v-row>
    <v-row >
        <v-col cols="7">
            <v-card flat>
                <v-card-text>
                   <v-row justify="center" class="mt-12">
                       <h1>Netflix</h1>
                   </v-row>
                   <v-row justify="center" class="mt-12">
                           <p>Con la compra de esta tarjeta obtienes acceso a netflix</p>
                   </v-row>
                   <v-row justify="center">
                             por un mes para ver tus peliculas y series favoritas
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