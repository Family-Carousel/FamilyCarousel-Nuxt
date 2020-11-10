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
    const user = await Auth.currentAuthenticatedUser();
    commit("set", user);

    if (user) {
      await dispatch("user/getUser", user.username, { root: true });
    }
  },

  async register(_, { email, password }) {
    const user = await Auth.signUp({
      username: email,
      password,
    });

    return user;
  },

  async confirmRegistration(_, { email, code }) {
    return await Auth.confirmSignUp(email, code);
  },

  async login({ commit, dispatch }, { email, password }) {
    const user = await Auth.signIn(email, password);
    commit("set", user);

    await dispatch("member/findOrCreateUser", user, { root: true });

    // $notifier.showMessage({ content: 'Welcome to Family Carousel!',  })

    return user;
  },

  async logout({ commit }) {
    await Auth.signOut();
    commit("set", null);
  },
};
