<template>
  <v-container fluid>
    <v-file-input chips truncate-length="15" ref="image"></v-file-input>
    <v-btn color="success" small @click="submitPhoto">Update photo</v-btn>
    <br /><br />
    <v-text-field
      v-model="judul"
      label="judul"
      prepend-icon="mdi-format-title"
    ></v-text-field>
    <v-textarea
      name="deskripsi"
      label="deskripsi"
      auto-grow
      prepend-inner-icon="mdi-note"
      rows="3"
      v-model="description"
    >
    </v-textarea>
    <v-btn color="success" @click="submitData" :to="{ name: 'Home' }"
      >Submit</v-btn
    >
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    judul: "",
    description: "",
    idBlog: null,
  }),
  computed: {
    ...mapGetters({
      token: "auth/token",
    }),
  },
  methods: {
    getBlog() {
      this.idBlog = this.$route.params.id;
      this.axios
        .get(`http://demo-api-vue.sanbercloud.com/api/v2/blog/${this.idBlog}`)
        .then((response) => {
          this.judul = response.data.blog.title;
          this.description = response.data.blog.description;
        })
        .catch((error) => {
          throw error;
        });
    },
    submitData() {
      this.axios
        .post(
          `http://demo-api-vue.sanbercloud.com/api/v2/blog/${this.idBlog}?_method=PUT`,
          {
            title: this.judul,
            description: this.description,
          },
          {
            headers: { Authorization: "Bearer " + this.token },
          }
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response);
          throw error;
        });
    },
    submitPhoto() {
      console.log("clicked");
      console.log(this.$refs.image);
    },
  },
  created() {
    this.getBlog();
  },
};
</script>