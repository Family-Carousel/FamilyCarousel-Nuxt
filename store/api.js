import { API, graphqlOperation } from "aws-amplify";
import * as gqlQueries from "~/graphql/queries";
import * as gqlMutations from "~/graphql/mutations";

export const state = () => ({});

export const getters = {
  authMode: (state, getters, rootState) =>
    rootState.auth.IsAutenticated ? "AMAZON_COGNITO_USER_POOLS" : "API_KEY",
};

export const actions = {
  async get({ getters }, { query, id }) {
    console.log(`Executing API Get with query ${query} and id ${id}.`);
    try {
      const { data } = await API.graphql(
        graphqlOperation(gqlQueries[query], { id }),
        { authMode: getters.authMode }
      );

      console.log(`resulting api get:  ${JSON.stringify(data, null, 2)}`);

      return data[query];
    } catch (err) {
      console.log(`API Get Thrown Error: ${JSON.stringify(err, null, 2)}`);
      throw new Error(err.message);
    }
  },
  async query({ getters }, { query, filter }) {
    console.log(`Executing API Query`);

    const { data } = await API.graphql(
      graphqlOperation(gqlQueries[query], { filter }),
      { authMode: getters.authMode }
    );

    console.log(`resulting api query:  ${JSON.stringify(data, null, 2)}`);

    return data[query].items;
  },
  async mutate({ getters }, { mutation, input }) {
    console.log(
      `Executing API Mutate with mutation ${mutation} and input ${JSON.stringify(
        input,
        null,
        2
      )}`
    );

    const { data } = await API.graphql(
      graphqlOperation(gqlMutations[mutation], { input }),
      { authMode: getters.authMode }
    );

    console.log(`resulting api mutate:  ${JSON.stringify(data, null, 2)}`);

    return data[mutation];
  },
};
