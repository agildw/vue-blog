<template>
  <v-container fluid>
    <v-btn small plain :to="{ name: 'Blog', params: { id: idBlog } }"
      ><v-icon>mdi-arrow-left-bold</v-icon>Back</v-btn
    >
    <!-- <v-file-input
      chips
      truncate-length="15"
      ref="image"
      v-model="imageFile"
      label="select image"
      accept="image/"
    ></v-file-input> -->
    <br />
    <input type="file" name="photo" ref="photo" style="margin: 10px 0" /><br />
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
    <v-btn color="success" @click="submitData">Submit</v-btn>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    judul: "",
    description: "",
    idBlog: null,
    imageFile: null,
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
      // console.log(this.$refs.photo.files);
      const formData = new FormData();
      let file = this.$refs.photo.files[0];
      console.log(file);
      formData.append("photo", file);
      const config = {
        method: "POST",
        url: `https://demo-api-vue.sanbercloud.com/api/v2/blog/${this.idBlog}/upload-photo`,
        body: formData,
        headers: {
          Authorization: "Bearer " + this.token,
          "content-type": "multipart/form-data",
        },
      };
      this.axios(config)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          throw error;
        });
      // console.log("clicked");
      // console.log(this.$refs.image);
    },
  },
  created() {
    this.getBlog();
  },
};
</script>