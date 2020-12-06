<template>
  <div>
    <div>
      <h2>
        Thanks for registering! Please finish filling out your profile to
        continue
      </h2>
    </div>
    <h2></h2>
  </div>
</template>

<script>
export default {
  async asyncData({ store, redirect }) {
    const memberUsername = store.$authService.id;
    const member = await store.dispatch("member/getUser", memberUsername);

    return { member };
  },
};
</script>
