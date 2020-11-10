export const actions = {
  async createFamilyMember({ dispatch }, input) {
    const familyMember = await dispatch(
      "api/mutate",
      { mutation: "createFamilyMember", input },
      { root: true }
    );

    return familyMember;
  },

  async updateFamily({ dispatch }, input) {
    const familyMember = await dispatch(
      "api/mutate",
      { mutation: "updateFamilyMember", input },
      { root: true }
    );

    return familyMember;
  },

  async deleteFamily({ dispatch }, id) {
    const familyMember = await dispatch(
      "api/mutate",
      { mutation: "deleteFamilyMember", id },
      { root: true }
    );

    return familyMember;
  },
};
