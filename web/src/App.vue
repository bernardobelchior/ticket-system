<template>
  <div id="app">
    <header>
      <el-col :span="12">
        <a href="#/">Ticket System</a>
      </el-col>
      <el-col :span="12">
        <el-menu default-active="/" router mode="horizontal">
          <el-menu-item index="/login">Login</el-menu-item>
          <el-menu-item index="/signup">Sign Up</el-menu-item>
        </el-menu>
      </el-col>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  body {
    margin: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  main {
    margin-top: 40px;
  }

  header {
    margin: 0;
    height: 56px;
    padding: 0 16px 0 24px;
    background-color: #35495E;
    color: #ffffff;
  }

  header a {
    display: block;
    position: relative;
    font-size: 20px;
    line-height: 1;
    letter-spacing: .02em;
    font-weight: 400;
    box-sizing: border-box;
    padding-top: 16px;
    text-decoration: none;
    color: white;
  }
</style>
