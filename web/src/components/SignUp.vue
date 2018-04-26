<template>
  <el-card class="login-card">
    <div slot="header">
      Sign Up
    </div>
    <el-form :model="form" label-width="150px">
      <el-form-item label="Name">
        <el-input v-model="form.name" placeholder="Name"></el-input>
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="form.email" placeholder="Email"></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="Repeat Password">
        <el-input v-model="form.repeatPassword" type="password"></el-input>
      </el-form-item>
      <el-button type="primary" @click="submit" :loading="signUpLoading">Sign Up</el-button>
    </el-form>
  </el-card>
</template>

<script>
  export default {
    name: 'sign-up',
    data: function () {
      return {
        form: {
          name: '',
          email: '',
          password: '',
          repeatPassword: ''
        },
        signUpLoading: false
      }
    },
    methods: {
      submit: function () {
        this.signUpLoading = true
        this.$root.$data.feathers.service('users').create({
          name: this.form.name,
          email: this.form.email,
          password: this.form.password
        }).then(() => {
          this.signUpLoading = false
          this.$message({
            type: 'success',
            message: 'Sign up successful. You can now login.',
            showClose: true
          })
          this.$router.push('/login')
        }).catch(e => {
          this.signUpLoading = false
          if (e.errors[0].validatorKey === 'not_unique') {
            this.$message({
              type: 'error',
              message: 'Email is already in use.',
              showClose: true
            })
          } else {
            this.$message({
              type: 'error',
              message: 'Could not sign up.',
              showClose: true
            })
          }
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
