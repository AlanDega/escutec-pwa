<template>
    <div>
        <v-container>
            <v-row justify="center" class="mt-12">
                <v-card width="800"> 
                    <v-toolbar color="deep-purple accent-3">
                       <h2 class="retos-text">Retos</h2>
                        <v-spacer></v-spacer>
                        <v-icon color="white">mdi-flag-checkered</v-icon>
                    </v-toolbar>
                    <v-row justify="center" class="mt-8 mb-4">
                       <h1>Obtén 3 aciertos</h1> 
                    </v-row>
                    <v-row justify="center" class="mb-8">
                        <v-img contain src="../../assets/0-3.png" height="60" width="100"></v-img>
                    </v-row>
                    <v-divider class="mb-8"></v-divider>
                    <v-row justify="center" class="mt-8 mb-4">
                       <h1>Termina 3 tareas</h1> 
                    </v-row>
                    <v-row justify="center" class="mb-8">
                        <v-img contain src="../../assets/2-3.png" height="60" width="100"></v-img>
                    </v-row>
                  
                    <v-divider class="mb-8"></v-divider>
                    <v-row justify="center" class="mt-8 mb-4">
                       <h1>Ayuda a 3 compañeros</h1> 
                    </v-row>
                    <v-row justify="center" class="mb-8">
                        <v-img contain src="../../assets/3-3.png" height="60" width="100"></v-img>
                    </v-row>
                </v-card>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                key: value
            }
        },
    }
</script>

<style lang="scss" scoped>
.retos-text{
    color: white;
}
</style>