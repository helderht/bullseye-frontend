<template>
  <button @click="signin">iniciar</button>
</template>

<script>
import axios from 'axios'
export default {
  name: 'signin',
  methods: {
    signin: function() {
      axios
        .post('signin', {
          email: 'inter@mail.com',
          password: 'inter'
        })
        .then(res => {
          this.$store.dispatch('saveToken', res.data)
          this.$router.push({name: 'board'})
        })
        .catch(e => {
          if (e.response.status === 403) {
            console.log('datos incorrectos')
          } else {
            console.log('error en el servidor')
          }
        })
    }
  }
}
</script>
