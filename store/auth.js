import { Auth } from "aws-amplify";

export const state = () => ({
  isAuthenticated: false,
  user: null,
});

export const mutations = {
  set(state, user) {
    console.log(
      `Executing Auth Set with state ${JSON.stringify(
        state,
        null,
        2
      )} and user ${JSON.stringify(user, null, 2)}`
    );

    state.isAuthenticated = !!user;
    state.user = user;
  },
};

export const actions = {
  async load({ commit, dispatch }) {
    console.log(`Executing Auth Load`);

    try {
      const user = await Auth.currentAuthenticatedUser();
      commit("set", user);
      console.log(
        `resulting auth load before success:  ${JSON.stringify(user, null, 2)}`
      );

      if (user) {
        await dispatch("member/getUser", user.username, { root: true });
        console.log(`resulting auth load after success:  ${user}`);
      }
    } catch (error) {
      console.log(`resulting auth load failure:  ${error}`);

      commit("set", null);
    }
  },

  async register(_, { email, password }) {
    console.log(`Executing Auth Register`);

    const user = await Auth.signUp({
      username: email,
      password,
    });
    console.log(`resulting auth register:  ${user}`);

    return user;
  },

  async confirmRegistration(_, { email, code }) {
    console.log(`Executing Auth confirm registeration`);

    return await Auth.confirmSignUp(email, code);
  },

  async login({ commit, dispatch }, { email, password }) {
    console.log(`Executing Auth login`);

    const user = await Auth.signIn(email, password);
    commit("set", user);

    console.log(`resulting auth login:  ${JSON.stringify(user, null, 2)}`);

    await dispatch("member/findOrCreateUser", user, { root: true });

    return user;
  },

  async logout({ commit }) {
    console.log(`Executing Auth logout`);

    await Auth.signOut();
    commit("set", null);
    console.log(`resulting auth logout`);
  },
};
