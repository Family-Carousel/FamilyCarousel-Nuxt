<template>
  <div>
    <div v-if="!$auth.isAuthenticated">
      <v-card class="mx-auto" max-width="600">
        <v-img class="align-end" contain height="200" src="/logo2.png" />
        <div v-if="step === steps.register">
          <ValidationObserver ref="reg" slot-scope="{ invalid, validated }">
            <v-card-title>Create a account to get started</v-card-title>
            <v-card-text>
              <ValidationProvider name="Email" rules="required|email">
                <v-text-field
                  v-model="registerForm.email"
                  slot-scope="{ errors, valid }"
                  label="Email"
                  :error-messages="errors"
                  :success="valid"
                  placeholder="Email"
                />
              </ValidationProvider>
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
              <ValidationProvider name="Password" rules="required|min:8">
                <v-text-field
                  v-model="registerForm.password"
                  slot-scope="{ errors, valid }"
                  :error-messages="errors"
                  :success="valid"
                  placeholder="Password"
                  label="Password"
                  :type="'password'"
                />
              </ValidationProvider>
            </v-card-text>

            <v-card-actions>
              <v-btn
                class="success"
                :disabled="invalid || !validated"
                block
                @click.prevent="register"
              >
                Register
              </v-btn>
            </v-card-actions>
            <nuxt-link align="center" to="/login">
              <span style="float: right"> Have an account? Login </span>
            </nuxt-link>
          </ValidationObserver>
        </div>
        <div v-if="step === steps.confirm">
          <v-card-text>
            <v-card-title>
              Enter the code in your email to validate your account
            </v-card-title>
            <v-text-field v-model="confirmForm.email" placeholder="Email" />
            <v-text-field
              v-model="confirmForm.code"
              placeholder="Registration Code"
            />
          </v-card-text>
          <v-card-actions>
            <v-btn class="success" @click.prevent="confirm"> Confirm </v-btn>
          </v-card-actions>
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
import { ValidationObserver, ValidationProvider } from "vee-validate";

const steps = {
  register: "REGISTER",
  confirm: "CONFIRM",
};

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    steps: { ...steps },
    step: steps.register,
    menu: false,
    registerForm: {
      email: "",
      // givenName: '',
      // birthDate: '',
      password: "",
    },
    confirmForm: {
      email: "",
      code: "",
    },
  }),
  // watch: {
  //   menu (val) {
  //     val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
  //   }
  // },

  methods: {
    async register() {
      try {
        const result = await this.$refs.obs.validate();
        if (!result) {
          return;
        }

        await this.$store.dispatch("auth/register", this.registerForm);
        this.confirmForm.email = this.registerForm.email;
        this.step = this.steps.confirm;
        console.log("step: ", this.step);
      } catch (err) {
        console.log({ err });
      }
    },

    async confirm() {
      try {
        await this.$store.dispatch(
          "auth/confirmRegistration",
          this.confirmForm
        );
        await this.$store.dispatch("auth/login", this.registerForm);
        this.$router.push("/");
      } catch (err) {
        console.log({ err });
      }
    },

    // save (memberDateOfBirth) {
    //   this.$refs.menu.save(memberDateOfBirth)
    // }
  },
};
</script>
