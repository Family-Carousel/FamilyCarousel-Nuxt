export const state = () => ({
  user: null
});

export const mutations = {
  setUser(state, user) {
    state.user = user;
  }
};

export const actions = {
  async getUser({ commit, dispatch }, id) {
    const user = await dispatch(
      "api/get",
      { query: "getUser", id },
      { root: true }
    );
    commit("setUser", user);
    return user;
  },

  async createUser({ commit, dispatch }, input) {
    const user = await dispatch(
      "api/mutate",
      { mutation: "createuser", input },
      { root: true }
    );
    commit("setUser", user);
    return user;
  },

  async findOrCreateUser({ dispatch }, { attributes, email }) {
    const user = await dispatch("getUser", email);
    if (user) {
      return user;
    }

    return dispatch("createUser", {
      id: email,
      createdAt: new Date(Date.now()).toISOString()
    });
  }
};