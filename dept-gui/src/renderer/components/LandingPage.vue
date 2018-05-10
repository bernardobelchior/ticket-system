<template>
  <el-card class="card">
    <div slot="header">
      <h2 style="margin: 0;">Welcome!</h2>
    </div>
    <div>
      Welcome to the Ticket System!
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'landing-page',
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link)
    }
  }
}
</script>

<style scoped>
.card {
  max-width: 500px;
  margin: auto;
}
</style>
