import Vue from "vue";

class AuthService {
  constructor(store) {
    this.$store = store;
  }

  get isAuthenticated() {
    return this.$store.state.auth.isAuthenticated;
  }

  get user() {
    return this.$store.state.auth.user;
  }

  get email() {
    if (!this.user) {
      return null;
    }

    return this.user.attributes.email;
  }

  get id() {
    if (!this.user) {
      return null;
    }
    return this.user.username;
  }

  get groups() {
    if (!this.user) {
      return null;
    }
    return this.user.signInUserSession.accessToken.payload["cognito:groups"];
  }

  get isAdmin() {
    if (!this.user) {
      return null;
    }
    const groups = this.user.signInUserSession.accessToken.payload[
      "cognito:groups"
    ];
    return groups && groups.includes("admin");
  }
}

export default async ({ store }, inject) => {
  const authService = new AuthService(store);
  Vue.prototype.$auth = authService;
  Vue.$auth = authService;
  await store.dispatch("auth/load");
  inject("authService", authService);
};
