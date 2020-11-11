<template>
  <ValidationProvider
    v-slot="{ errors, valid }"
    :name="$attrs.label"
    :rules="rules"
  >
    <v-text-field
      v-model="innerValue"
      :error-messages="errors"
      :success="valid"
      v-bind="$attrs"
      v-on="$listeners"
    ></v-text-field>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from "vee-validate";

export default {
  components: {
    ValidationProvider,
  },
  props: {
    rules: {
      type: [Object, String],
      default: "",
    },
    // must be included in props
    value: {
      type: null,
      default: null,
    },
  },
  data: () => ({
    innerValue: "",
  }),
  watch: {
    // Handles internal model changes.
    innerValue(newVal) {
      this.$emit("input", newVal);
    },
    // Handles external model changes.
    value(newVal) {
      this.innerValue = newVal;
    },
  },
  created() {
    if (this.value) {
      this.innerValue = this.value;
    }
  },
};
</script>
