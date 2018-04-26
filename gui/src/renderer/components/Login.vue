<template>
  <el-card class="login-card">
    <div slot="header">
      Login
    </div>
    <el-form :model="form" label-width="120px">
      <el-form-item label="Email">
        <el-input v-model="form.email" placeholder="Email"></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <router-link to="/"><el-button type="primary">Back</el-button></router-link>
      <el-button type="primary" @click="submit" :loading="loginLoading">Login</el-button>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'login',
  data: function () {
    return {
      form: {
        email: '',
        password: ''
      },
      loginLoading: false
    }
  },
  methods: {
    submit: function () {
      /* this.loginLoading = true
        this.$root.$data.feathers.authenticate({
          strategy: 'local',
          email: this.form.email,
          password: this.form.password
        }).then(() => {
          this.loginLoading = false
          this.$router.push('/tickets/create')
        }).catch(e => {
          this.loginLoading = false
          console.error(e)

          this.$message({
            type: 'error',
            message: 'Login failed',
            showClose: true
          })
        }) */
    }
  }
}
</script>

<style scoped>
.login-card {
  max-width: 500px;
  margin: auto;
}
</style>
