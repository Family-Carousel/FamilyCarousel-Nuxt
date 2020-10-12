<template>
  <v-row>
    <v-col>
      <h1 text-center>
        Register
      </h1>
    </v-col>
    <!-- Unauthenticated -->
    <v-col>
      <!-- Register -->
      <v-form v-if="step === steps.register">
        <v-text-field v-model="registerForm.email" placeholder="Email" />
        <v-text-field v-model="registerForm.givenName" placeholder="Name" />
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="registerForm.birthDate"
              label="Birthday date"
              readonly
              v-on="on"
            />
          </template>
          <v-date-picker
            ref="picker"
            v-model="registerForm.birthDate"
            :max="new Date().toISOString().substr(0, 10)"
            min="1950-01-01"
            @change="save"
          />
        </v-menu>
        <v-text-field
          v-model="registerForm.password"
          placeholder="Password"
          :type="'password'"
        />
        <v-btn class="success" @click="register">
          Register
        </v-btn>
      </v-form>

      <!-- Confirm Registration -->
      <v-form v-else>
        <v-text-field v-model="confirmForm.email" placeholder="Email" />
        <v-text-field
          v-model="confirmForm.code"
          placeholder="Registration Code"
        />
        <v-btn class="success" @click="confirm">
          Confirm
        </v-btn>
      </v-form>

      <nuxt-link to="/login">
        Have an account? Login
      </nuxt-link>
    </v-col>
    <v-col>
      <!-- Logged in -->
    </v-col>
  </v-row>
</template>

<script>
const steps = {
  register: 'REGISTER',
  confirm: 'CONFIRM'
}

export default {
  data: () => ({
    steps: { ...steps },
    step: steps.register,
    menu: false,
    registerForm: {
      email: '',
      givenName: '',
      birthDate: '',
      password: ''
    },
    confirmForm: {
      email: '',
      code: ''
    }
  }),
  watch: {
    menu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },

  methods: {
    async register () {
      try {
        await this.$store.dispatch('auth/register', this.registerForm)
        this.confirmForm.email = this.registerForm.email
        this.step = this.steps.confirm
      } catch (err) {
        console.log({ err })
      }
    },

    async confirm () {
      try {
        await this.$store.dispatch(
          'auth/confirmRegistration',
          this.confirmForm
        )
        await this.$store.dispatch('auth/login', this.registerForm)
        this.$router.push('/')
      } catch (err) {
        console.log({ err })
      }
    },

    save (memberDateOfBirth) {
      this.$refs.menu.save(memberDateOfBirth)
    }
  }
}
</script>
