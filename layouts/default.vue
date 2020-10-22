<template>
  <v-app dark>
    <v-app-bar clipped-left fixed app>
      <v-btn icon to="/">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-toolbar-title>Family Carousel</v-toolbar-title>
      <v-spacer />
      <div v-if="!$auth.isAuthenticated">
        <v-btn class="hidden-sm-and-down" text to="/register"> Sign Up </v-btn>
        <v-btn class="hidden-sm-and-down" text to="/login"> Login </v-btn>
      </div>
      <div v-else>
        <span> Welcome {{ $auth.email }} </span>
        <v-btn
          class="hidden-sm-and-down"
          text
          @click="$store.dispatch('auth/logout')"
        >
          logout
        </v-btn>
      </div>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer class="pa-3" app absolute fixed>
      <v-row>
        <v-col class="text-left">
          FamilyCarousel.com&nbsp; &copy; {{ new Date().getFullYear() }}
        </v-col>
      </v-row>
    </v-footer>
    <Snackbar></Snackbar>
  </v-app>
</template>

<script>
import Snackbar from "~/components/Snackbar";

export default {
  components: {
    Snackbar,
  },
  data() {
    return {
      title: "Family Carousel",
    };
  },
};
</script>
