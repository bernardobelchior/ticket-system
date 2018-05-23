<template>
  <div></div>
</template>

<script>
  export default {
    name: 'logout',
    mounted: function () {
      this.$store.commit('logout')
      this.$router.push('/')
    }
  }
</script>
