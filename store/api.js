import { API } from "aws-amplify";
import * as gqlQueries from "~/graphql/queries";
import * as gqlMutations from "~/graphql/mutations";

export const state = () => ({});

export const getters = {
  authMode: (state, getters, rootState) =>
    rootState.auth.IsAutenticated ? "AMAZON_COGNITO_USER_POOLS" : "API_KEY",
};

export const actions = {
  async get({ getters }, { query, id }) {
    const { data } = await API.graphql({
      query: gqlQueries[query],
      variables: { id },
      authMode: getters.authMode,
    });

    return data[query];
  },
  async query({ getters }, { query, filter }) {
    const { data } = await API.graphql({
      query: gqlQueries[query],
      variables: { filter },
      authMode: getters.authMode,
    });

    return data[query].items;
  },
  async mutate({ getters }, { mutation, input }) {
    const { data } = await API.graphql({
      query: gqlMutations[mutation],
      variables: { input },
      authMode: getters.authMode,
    });

    return data[mutation];
  },
};
