<template>
  <v-container fluid>
    <v-text-field
      label="judul"
      prepend-icon="mdi-format-title"
      v-model.lazy="title"
    ></v-text-field>
    <v-textarea
      name="deskripsi"
      label="deskripsi"
      auto-grow
      prepend-inner-icon="mdi-note"
      rows="3"
      v-model.lazy="description"
    >
    </v-textarea>
    <!-- <v-btn color="success" @click="submit">submit</v-btn> -->
    <!-- <router-link
      :to="{ name: 'About', params: { companyid: company.objectID } }"
    >
      Read More
    </router-link> -->
    <router-link :to="{ name: 'Blog', params: { id: idBlog } }">
      <v-btn color="success" @click="submit">submit </v-btn>
    </router-link>

    <router-view></router-view>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "post",
  data: () => ({
    title: "",
    description: "",
    idBlog: 323,
  }),
  computed: {
    ...mapGetters({
      token: "auth/token",
    }),
  },
  methods: {
    submit() {
      this.axios
        .post(
          "http://demo-api-vue.sanbercloud.com/api/v2/blog",
          {
            title: this.title,
            description: this.description,
          },
          {
            headers: {
              Authorization: "Bearer " + this.token,
            },
          }
        )
        .then((response) => {
          // const { idBlog } = response.data.blog.id;
          console.log(response.data.blog.id);
          this.idBlog = response.data.blog.id;
          // console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response);
          throw error;
        });
      console.log(this.token);
    },
  },
};
</script>