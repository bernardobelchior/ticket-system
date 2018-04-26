<template>
  <el-card class="login-card">
    <div slot="header">
      Login
    </div>
    <el-form :model="form" label-width="120px">
      <el-form-item label="Username">
        <el-input v-model="username" placeholder="Username"></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="password" type="password"></el-input>
      </el-form-item>
      <el-button type="primary" @click="submit">Login</el-button>
    </el-form>
  </el-card>
</template>

<script>
  export default {
    name: 'login',
    data: function () {
      return {
        form: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      submit: function () {
        this.$root.$data.feathers.authenticate({
          strategy: 'local',
          email: this.form.username,
          password: this.form.password
        }).then(result => {
          console.log(result)
        }).catch(e => {
          console.log(e)
        })
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
