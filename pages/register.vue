<template>
  <div>
    <div v-if="!$auth.isAuthenticated">
      <v-card class="mx-auto" max-width="600">
        <v-img class="align-end" contain height="200" src="/logo2.png" />
        <div v-if="step === steps.register">
          <ValidationObserver ref="obs" v-slot="{ invalid, validated }">
            <v-card-title>Create a account to get started</v-card-title>
            <v-card-text>
              <v-form>
                <VTextFieldWithValidation
                  v-model="registerForm.email"
                  rules="required|email"
                  label="Email"
                />
                <VPassowrdFieldWithValidation
                  v-model="registerForm.password"
                  rules="required|min:8"
                  label="Password"
                />
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-btn
                class="success"
                :disabled="invalid || !validated"
                block
                @click.prevent="register()"
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
import { ValidationObserver } from "vee-validate";
import VTextFieldWithValidation from "../components/inputs/VTextFieldWithValidation";
import VPassowrdFieldWithValidation from "../components/inputs/VPasswordFieldWithValidation";

const steps = {
  register: "REGISTER",
  confirm: "CONFIRM",
};

export default {
  components: {
    ValidationObserver,
    VTextFieldWithValidation,
    VPassowrdFieldWithValidation,
  },
  data: () => ({
    steps: { ...steps },
    step: steps.register,
    menu: false,
    registerForm: {
      email: "",
      password: "",
    },
    confirmForm: {
      email: "",
      code: "",
    },
  }),
  methods: {
    async register() {
      try {
        const result = await this.$refs.obs.validate();
        if (!result) {
          this.$notifier.showMessage({
            content:
              "Registration form is not valid. Please correct errors shown in red.",
            color: "success",
          });
          return;
        }

        await this.$store.dispatch("auth/register", this.registerForm);
        this.confirmForm.email = this.registerForm.email;
        this.step = this.steps.confirm;
        this.$notifier.showMessage({
          content:
            "Account registration successful! Check your email for a confirmation code to finish.",
          color: "success",
        });
      } catch (err) {
        this.$notifier.showMessage({
          content: err.message || err,
          color: "danger",
        });
      }
    },

    async confirm() {
      try {
        await this.$store.dispatch(
          "auth/confirmRegistration",
          this.confirmForm
        );
        await this.$store.dispatch("auth/login", this.registerForm);
        this.$notifier.showMessage({
          content: "Welcome to Family Carousel!",
          color: "success",
        });
        this.$router.push("/");
      } catch (err) {
        this.$notifier.showMessage({
          content: err.message || err,
          color: "danger",
        });
      }
    },
  },
};
</script>
