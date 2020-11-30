<template>
  <div>
    <v-row>
      <v-col>
        <v-row>
          <v-col>
            <v-img src="/logo2.png" class="mb-8" contain height="200"></v-img>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="center_button"
              >Choose your family from below or click here to create a new one
              now</v-btn
            >
            <v-spacer></v-spacer>
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
  async asyncData({ store }) {
    const memberEmail = store.$authService.email;
    console.log({ memberEmail });
    const member = await store.dispatch("member/getUser", memberEmail);
    return { member };
  },
  data: () => ({}),
};
</script>

<style lang="scss">
.center_button {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 40%;
  font-size: 7px;
}

.isMember {
  color: red;
  font: bold 24px/24px Helvetica, Sans-Serif;
  letter-spacing: -1px;
  background: rgb(0, 0, 0); /* fallback color */
  background: rgba(0, 0, 0, 0.9);
  padding: 3px;
}
</style>
