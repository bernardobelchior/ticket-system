<template>
  <div id="wrapper">
    <el-card id="card-style">
      <div slot="header" style="text-align: center;">
        <h1>Ticket System</h1>
      </div>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <router-link to="login"><el-button type="primary">Sign-In</el-button></router-link>
        </el-col>
        <el-col :span="6">
          <router-link to="signup"><el-button type="primary">Sign-Up</el-button></router-link>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation'

  export default {
    name: 'landing-page',
    components: {SystemInformation},
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style scoped>

#card-style {
  max-width: 500px;
  margin: auto;
}

</style>
