export const state = () => ({
  snackBars: []
});

export const mutations = {
  set(state, snackBar) {
    state.snackBars.push(snackBar);
  }
};

export const actions = {
  async addSnackBar({ commit }, snackBar) {
    snackBar.showing = true;
    snackBar.color = snackBar.color || "success";
    commit("set", snackBar);
    return snackBar;
  }
};
