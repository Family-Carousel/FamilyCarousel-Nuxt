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
    console.log(`Executing Member getUser with id: ${id}`);

    const user = await dispatch(
      "api/get",
      { query: "getMember", id },
      { root: true }
    );
    console.log(`resulting Member getUser:  ${user}`);

    commit("set", user);
    return user;
  },

  async createUser({ commit, dispatch }, input) {
    console.log(
      `Executing Member createUser with input of ${JSON.stringify(
        input,
        null,
        2
      )}`
    );

    const user = await dispatch(
      "api/mutate",
      { mutation: "createMember", input },
      { root: true }
    );
    console.log(`resulting Member createUser:  ${user}`);

    commit("set", user);
    return user;
  },

  async findOrCreateUser({ dispatch }, { attributes, username }) {
    console.log(
      `Executing Member findOrCreateUser with email: ${attributes.email} and username: ${username}`
    );

    const user = await dispatch("getUser", username);
    if (user) {
      return user;
    }
    console.log(`resulting Member findOrCreateUser:  ${user}`);

    return dispatch("createUser", {
      id: username,
      email: attributes.email,
      createdAt: new Date(Date.now()).toISOString(),
    });
  },

  async updateUser({ commit, dispatch }, input) {
    console.log(`Executing Member updateUser`);

    const user = await dispatch(
      "api/mutate",
      { mutation: "updateMember", input },
      { root: true }
    );
    console.log(`resulting Member updateUser:  ${user}`);

    commit("set", { key: "user", value: user });

    return user;
  },

  async deleteUser({ commit, dispatch }, email) {
    console.log(`Executing Member deleteUser`);

    const user = await dispatch(
      "api/mutate",
      { mutation: "deleteMember", email },
      { root: true }
    );

    console.log(`resulting Member deleteUser:  ${user}`);

    commit("set", { key: "user", value: null });

    return user;
  },
};
