<template>
  <v-container class="ma-0 pa-0" grid-list-sm>
    <div class="text-right">
      <v-btn small text to="/blogs" class="blue--text">
        All Blogs <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </div>
    <v-layout wrap>
      <blog-item-component
        v-for="blog in blogs"
        :key="'blog' + blog.id"
        :blog="blog"
      ></blog-item-component>
    </v-layout>
  </v-container>
</template>

<script>
import BlogItemComponentVue from "../components/BlogItemComponent.vue";
export default {
  data: () => ({
    baseUrl: "https://demo-api-vue.sanbercloud.com",
    blogs: [],
  }),
  components: {
    "blog-item-component": BlogItemComponentVue,
  },
  methods: {
    go() {
      const config = {
        method: "get",
        url: this.baseUrl + "/api/v2/blog/random/4",
      };
      this.axios(config)
        .then((response) => {
          let { blogs } = response.data;
          this.blogs = blogs;
          // console.log(this.blogs);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.go();
  },
};
</script>
