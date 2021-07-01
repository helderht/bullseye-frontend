<template>
  <div id="app"><router-view /></div>
</template>

<script>
export default {
  name: 'app',
  created() {
    this.$store.dispatch('autoSignin')
  },
  computed: {
    loged: function() {
      return this.$store.state.user
    }
  }
}
</script>
