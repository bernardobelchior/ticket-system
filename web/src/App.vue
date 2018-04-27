<template>
  <div id="app">
    <el-menu default-active="/" router mode="horizontal" text-color="white" background-color="#35495E"
             active-text-color="white">
      <el-menu-item v-for="route in routes" :index="route.path">{{route.label}}</el-menu-item>
    </el-menu>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'app',
    computed: {
      routes: function () {
        const isLoggedIn = this.$store.state.loggedIn
        const availableRoutes = []

        for (let route of this.$router.options.routes) {
          if (route.meta && route.meta.showOnNavbar === false) {
            continue
          }

          if (route.meta && route.meta.requiresAuth && isLoggedIn) {
            availableRoutes.push(route)
          } else if (route.meta && route.meta.requiresNoAuth && !isLoggedIn) {
            availableRoutes.push(route)
          } else if (!route.meta) {
            availableRoutes.push(route)
          }
        }

        return availableRoutes
      }
    }
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
</style>
