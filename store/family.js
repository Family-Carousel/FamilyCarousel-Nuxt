export const state = () => ({
  families: [],
  family: null,
});

export const mutations = {
  set(state, { key, value }) {
    state[key] = value;
  },
};

export const actions = {
  async listAllFamilies({ commit, dispatch }) {
    const families = await dispatch(
      "api/query",
      { query: "listFamilies" },
      { root: true }
    );

    commit("set", { key: "families", value: families });

    return families;
  },

  async getFamily({ commit, dispatch }, id) {
    const family = await dispatch(
      "api/get",
      { query: "getFamily", id },
      { root: true }
    );

    commit("set", { key: "family", value: family });

    return family;
  },

  async createFamily({ commit, dispatch }, input) {
    const family = await dispatch(
      "api/mutate",
      { mutation: "createFamily", input },
      { root: true }
    );

    commit("set", { key: "family", value: family });

    return family;
  },

  async updateFamily({ commit, dispatch }, input) {
    const family = await dispatch(
      "api/mutate",
      { mutation: "updateFamily", input },
      { root: true }
    );

    commit("set", { key: "family", value: family });

    return family;
  },

  async deleteFamily({ commit, dispatch }, id) {
    const family = await dispatch(
      "api/mutate",
      { mutation: "deleteFamily", id },
      { root: true }
    );

    commit("set", { key: "family", value: null });

    return family;
  },
};
