<template>
  <v-row>
    <v-col />
    <v-col>
      <div v-if="step === steps.register">
        <v-card class="mx-auto" max-width="600">
          <v-img class="align-end" contain height="200" src="/logo2.png" />
          <div v-if="step === 'REGISTER'">
            <v-card-title>Create a account to get started</v-card-title>
            <v-card-text>
              <v-text-field v-model="registerForm.email" placeholder="Email" />
              <!-- <v-text-field v-model="registerForm.givenName" placeholder="Name" />
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
        </v-menu> -->
              <v-text-field
                v-model="registerForm.password"
                placeholder="Password"
                :type="'password'"
              />
            </v-card-text>

            <v-card-actions>
              <v-btn class="success" block @click="register">
                Register
              </v-btn>
            </v-card-actions>
            <nuxt-link align="center" to="/login">
              <span style="float: right"> Have an account? Login </span>
            </nuxt-link>
          </div>
          <div v-else>
            <v-card-text>
              <v-card-sub-title>Enter the code in your email to validate your account</v-card-sub-title>
              <v-text-field v-model="confirmForm.email" placeholder="Email" />
              <v-text-field
                v-model="confirmForm.code"
                placeholder="Registration Code"
              />
            </v-card-text>
            <v-card-actions>
              <v-btn class="success" @click="confirm">
                Confirm
              </v-btn>
            </v-card-actions>
          </div>
        </v-card>
      </div>
    </v-col>
    <v-col />
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
      // givenName: '',
      // birthDate: '',
      password: ''
    },
    confirmForm: {
      email: '',
      code: ''
    }
  }),
  // watch: {
  //   menu (val) {
  //     val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
  //   }
  // },

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
    }

    // save (memberDateOfBirth) {
    //   this.$refs.menu.save(memberDateOfBirth)
    // }
  }
}
</script>
