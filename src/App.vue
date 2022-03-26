<template>
  <div id="nav">
    
    <nav class="navbar navbar-expand-md navbar-light bg-light">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand">Recipe Sharing</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mb-2 mb-lg-0 ms-auto">
            <li class="nav-item">
              <router-link class="nav-link active" to="/">Home</router-link>
            </li>

            <template v-if="$store.state.isAuthenticated">
              <li class="nav-item">
                <router-link class="nav-link active" to="/profile">Profile</router-link>
              </li>
            </template>

            <template v-if="!$store.state.isAuthenticated">
              <li class="nav-item">
                <router-link class="nav-link active" to="/login">Login</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link active" to="/signup">Signup</router-link>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </nav>

  </div>
  <router-view/>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'App',
    
    beforeCreate () {
      this.$store.commit('initializeStore')

      const token = this.$store.state.token
      
      if ( token ) {
        axios.defaults.headers.common['Authorization'] = "Token " + token
      } else {
        axios.defaults.headers.common['Authorization'] = ''
      }
    },

  }
</script>

<style lang="scss">

</style>
