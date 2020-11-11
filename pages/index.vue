<template>
  <div>
    <div v-if="!$auth.isAuthenticated">
      <v-container>
        <v-row no-gutters>
          <v-col cols="12" md="8" sm="12">
            <v-card class="pa-2 card-style" outlined title>
              <v-img src="/family.svg"></v-img>
            </v-card>
          </v-col>
          <v-col cols="12" md="4" sm="12">
            <v-card class="pa-2 card-style" outlined title>
              <h1>Welcome to Family Carousel</h1>
              <h5>Coming Soon! Subscribe to learn all about it.</h5>
              <div id="mc_embed_signup">
                <ValidationObserver ref="obs" v-slot="{ invalid, validated }">
                  <form
                    id="mc-embedded-subscribe-form"
                    ref="form"
                    action="https://familycarousel.us4.list-manage.com/subscribe/post?u=57428f46a48f61cfe6e374001&amp;id=97f31a4664"
                    method="post"
                    name="mc-embedded-subscribe-form"
                    target="_blank"
                  >
                    <div id="mc_embed_signup_scroll">
                      <div class="mc-field-group">
                        <VTextFieldWithValidation
                          id="mce-EMAIL"
                          v-model="email"
                          name="EMAIL"
                          rules="required|email"
                          label="Email Address"
                        />
                      </div>
                      <div class="mc-field-group">
                        <VTextFieldWithValidation
                          id="mce-FNAME"
                          v-model="firstName"
                          name="FNAME"
                          rules="required"
                          label="First Name"
                        />
                      </div>
                      <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
                      <div
                        style="position: absolute; left: -5000px"
                        aria-hidden="true"
                      >
                        <input
                          type="text"
                          name="b_57428f46a48f61cfe6e374001_97f31a4664"
                          tabindex="-1"
                          value
                        />
                      </div>
                      <div class="clear">
                        <v-btn
                          id="mc-embedded-subscribe"
                          color="success"
                          block
                          :disabled="invalid || !validated"
                          type="submit"
                          name="subscribe"
                          @click="submitForm"
                          >Subscribe</v-btn
                        >
                      </div>
                    </div>
                  </form>
                </ValidationObserver>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import VTextFieldWithValidation from "../components/inputs/VTextFieldWithValidation";

export default {
  components: {
    ValidationObserver,
    VTextFieldWithValidation,
  },
  data: () => ({
    email: "",
    firstName: "",
  }),
  methods: {
    submitForm() {
      this.$notifier.showMessage({
        content:
          "Thanks for signing up for our mailing list. Keep an eye out for new information.",
        color: "success",
      });
      this.$refs.form.submit();
      this.email = "";
      this.firstName = "";
    },
  },
};
</script>
<style scoped>
.card-style {
  height: 100%;
  width: 100%;
}
#mc_embed_signup {
  background: #fff;
  clear: left;
  font: 14px Helvetica, Arial, sans-serif;
}
</style>
