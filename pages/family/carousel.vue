<template>
  <div>
    <v-row>
      <v-col>
        <v-row>
          <v-col>
            <v-img
              src="/logo2.png"
              class="mb-n5 mt-n5"
              contain
              height="250"
            ></v-img>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <div style="text-align: center">
              <v-btn color="primary" to="create"> Create new Family </v-btn>
            </div>
          </v-col>
        </v-row>
        <v-container fluid>
          <v-row dense>
            <v-col
              v-for="family in families"
              :key="family.title"
              :cols="family.flex"
            >
              <v-card>
                <v-img
                  v-if="!family.src"
                  src="/family.svg"
                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                >
                  <v-card-title align="left" class="make_a_span">
                    {{ family.title }}
                  </v-card-title>
                </v-img>
                <v-card-actions>
                  <v-btn color="success" block>Work with this family</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  async asyncData({ store, redirect }) {
    const memberUsername = store.$authService.id;
    const member = await store.dispatch("member/getUser", memberUsername);
    console.log(`Member received from API: ${JSON.stringify(member, null, 2)}`);
    if (!member.firstName || !member.dateOfBirth) {
      redirect("/family/carousel");
    }
    const families = member.families.items;
    return { families };
  },
  data: () => ({}),
};
</script>

<style lang="scss" scoped>
.center_button {
  width: 20%;
  margin: -20% -50%;
  position: relative;
  top: 50%;
  left: 50%;
}
</style>
