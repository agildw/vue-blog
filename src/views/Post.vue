<template>
  <v-container fluid>
    <h3>New Post</h3>
    <br />
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
    <v-btn color="success" @click="submit">submit </v-btn>
    <div v-if="idBlog != null">
      <router-link :to="{ name: 'Blog', params: { id: idBlog } }">
        <v-btn color="primary">Go to new post</v-btn>
      </router-link>
    </div>
    <router-view></router-view>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "post",
  data: () => ({
    title: "",
    description: "",
    idBlog: null,
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
          "https://demo-api-vue.sanbercloud.com/api/v2/blog",
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
          console.log(response.data.blog.id);
          this.idBlog = response.data.blog.id;
          this.setAlert({
            status: true,
            color: "success",
            text: "Berhasil diupload",
          });
        })
        .catch((error) => {
          console.log(error.response);
          this.setAlert({
            status: true,
            color: "error",
            text: "gagal upload",
          });
          throw error;
        });
      console.log(this.token);
    },
    ...mapActions({
      setAlert: "alert/set",
    }),
  },
};
</script>