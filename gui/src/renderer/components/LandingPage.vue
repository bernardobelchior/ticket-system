<template>
  <div id="wrapper">
    <el-card id="card-style">
      <div slot="header" style="text-align: center;">
        <h1>Ticket System</h1>
      </div>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button>Sign-In</el-button>
        </el-col>
        <el-col :span="6">
          <el-button>Sign-Up</el-button>
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
