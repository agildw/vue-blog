<template>
  <v-flex xs6>
    <v-card :to="'/blog/' + blog.id">
      <v-img
        :src="
          blog.photo ? baseUrl + blog.photo : 'https://picsum.photos/600/400'
        "
        class="white--text"
        height="200px"
      >
        <v-card-title
          class="fill-height align-end"
          v-text="blog.title"
        ></v-card-title>
      </v-img>
      <v-card-actions>
        <v-progress-linear color="blue-grey" height="7"> </v-progress-linear>
      </v-card-actions>
      <v-card-actions>
        <span>{{ blog.description.substring(0, 15) }}...</span>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>
<script>
export default {
  data: () => ({
    baseUrl: "https://demo-api-vue.sanbercloud.com",
    blogs: [],
  }),
  props: ["blog"],
};
</script>