<template>
  <div>
    <div v-if="!$auth.isAuthenticated">
      <v-card class="mx-auto" max-width="600">
        <v-img class="align-end" contain height="200" src="/logo2.png" />
        <div>
          <ValidationObserver ref="obs" v-slot="{ invalid, validated }">
            <v-card-title>Login To Get Started</v-card-title>
            <v-card-text>
              <v-form>
                <VTextFieldWithValidation
                  v-model="form.email"
                  rules="required|email"
                  label="Email"
                />
                <VPassowrdFieldWithValidation
                  v-model="form.password"
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
                @click.prevent="login()"
              >
                Login
              </v-btn>
            </v-card-actions>
            <nuxt-link align="center" to="/register">
              <span style="float: right">
                Don't have an account? Register
              </span>
            </nuxt-link>
          </ValidationObserver>
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

export default {
  components: {
    ValidationObserver,
    VTextFieldWithValidation,
    VPassowrdFieldWithValidation,
  },
  data: () => ({
    form: {
      email: "",
      password: "",
    },
  }),
  methods: {
    async login() {
      try {
        await this.$store.dispatch("auth/login", this.form);
        this.$router.push("/");
      } catch (error) {
        console.log({ error });
      }
    },
  },
};
</script>
