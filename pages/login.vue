<template>
  <div>
    <div v-if="!$auth.isAuthenticated">
      <v-card class="mx-auto" max-width="600">
        <v-img class="align-end" contain height="200" src="/logo2.png" />
        <div>
          <v-card-title>Login To Get Started</v-card-title>
          <v-card-text>
            <v-text-field v-model="form.email" placeholder="Email" />
            <v-text-field
              v-model="form.password"
              placeholder="Password"
              :type="'password'"
            />
          </v-card-text>
          <v-card-actions>
            <v-btn class="success" block @click.prevent="login">
              Login
            </v-btn>
          </v-card-actions>
          <nuxt-link align="center" to="/register">
            <span style="float: right"> Don't have an account? Register </span>
          </nuxt-link>
        </div>
      </v-card>
    </div>
    <div v-else>
      <p>Your already logged in as {{ $auth.email }}</p>
      <v-btn
        class="hidden-sm-and-down"
        text
        @click="$store.dispatch('auth/logout')"
      >
        logout
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    form: {
      email: '',
      password: ''
    }
  }),
  methods: {
    async login () {
      try {
        await this.$store.dispatch('auth/login', this.form)
        this.$router.push('/')
      } catch (error) {
        console.log({ error })
      }
    }
  }
}
</script>
