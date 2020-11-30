export const state = () => ({
  user: null,
});

export const mutations = {
  set(state, user) {
    state.user = user;
  },
};

export const actions = {
  async getUser({ commit, dispatch }, id) {
    const user = await dispatch(
      "api/get",
      { query: "getMember", id },
      { root: true }
    );
    commit("set", user);
    return user;
  },

  async createUser({ commit, dispatch }, input) {
    const user = await dispatch(
      "api/mutate",
      { mutation: "createMember", input },
      { root: true }
    );
    commit("set", user);
    return user;
  },

  async findOrCreateUser({ dispatch }, { email }) {
    const user = await dispatch("getUser", email);
    if (user) {
      return user;
    }

    return dispatch("createUser", {
      id: email,
      createdAt: new Date(Date.now()).toISOString(),
    });
  },

  async updateUser({ commit, dispatch }, input) {
    const user = await dispatch(
      "api/mutate",
      { mutation: "updateMember", input },
      { root: true }
    );

    commit("set", { key: "user", value: user });

    return user;
  },

  async deleteUser({ commit, dispatch }, email) {
    const user = await dispatch(
      "api/mutate",
      { mutation: "deleteMember", email },
      { root: true }
    );

    commit("set", { key: "user", value: null });

    return user;
  },
};
