<template>
  <v-btn color="primary" @click="clicked">edit</v-btn>
</template>
<script>
// this.router.push("home");
export default {
  data() {
    return {};
  },
  props: ["blog"],
  methods: {
    clicked() {
      console.log("clicked");
    },
  },
};
</script>