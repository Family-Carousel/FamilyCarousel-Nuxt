import { Auth } from "aws-amplify";

export const state = () => ({
  isAuthenticated: false,
  user: null,
});

export const mutations = {
  set(state, user) {
    state.isAuthenticated = !!user;
    state.user = user;
  },
};

export const actions = {
  async load({ commit, dispatch }) {
    try {
      const user = await Auth.currentAuthenticatedUser();
      commit("set", user);

      if (user) {
        await dispatch("user/getUser", user.username, { root: true });
      }
    } catch (error) {
      commit("set", null);
      await dispatch(
        "snackBar/addSnackBar",
        {
          text: error.message,
          timeout: 6000,
          color: "danger",
        },
        { root: true }
      );
      return;
    }
  },

  async register({ dispatch }, { email, password }) {
    try {
      const user = await Auth.signUp({
        username: email,
        password,
      });

      await dispatch(
        "snackBar/addSnackBar",
        {
          text:
            "Thanks for registering an account! Stick around to confirm before you can log in.",
          timeout: 6000,
          color: "success",
        },
        { root: true }
      );

      return user;
    } catch (error) {
      await dispatch(
        "snackBar/addSnackBar",
        {
          text: error.message,
          timeout: 6000,
          color: "danger",
        },
        { root: true }
      );
      return;
    }
  },

  async confirmRegistration({ dispatch }, { email, code }) {
    try {
      const confirmed = await Auth.confirmSignUp(email, code);

      await dispatch(
        "snackBar/addSnackBar",
        {
          text:
            "You've successfully confirmed your account! Welcome to Family Carousel.",
          timeout: 6000,
          color: "success",
        },
        { root: true }
      );

      return confirmed;
    } catch (error) {
      await dispatch(
        "snackBar/addSnackBar",
        {
          text: error.message,
          timeout: 6000,
          color: "danger",
        },
        { root: true }
      );
      return;
    }
  },

  async login({ commit, dispatch, $notifier }, { email, password }) {
    try {
      const user = await Auth.signIn(email, password);
      commit("set", user);

      await dispatch("member/findOrCreateUser", user, { root: true });

      $notifier.showMessage({ content: 'Welcome to Family Carousel!',  })

      return user;
    } catch (error) {
      return;
    }
  },

  async logout({ commit, $notifier }) {
    try {
      await Auth.signOut();
      commit("set", null);
    } catch (error) {
      $notifier.showMessage({ content: error.message, color: "danger" });
      return;
    }
  },
};
