<template>
  <div class="home">
  </div>
</template>

<script>

// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
  created(){
    firebase.auth().onAuthStateChanged((user) => {
      console.log('user', user)
    } )
  }
}
</script>
