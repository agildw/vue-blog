<template>
  <v-container fluid>
    <v-btn small plain :to="{ name: 'Blog', params: { id: idBlog } }"
      ><v-icon>mdi-arrow-left-bold</v-icon>Back</v-btn
    >
    <br />
    <v-file-input
      label="masukkan foto"
      v-model="imageFile"
      color="success"
    ></v-file-input>
    <!-- <v-btn color="success" small @click="submitPhoto">Update photo</v-btn> -->
    <v-text-field
      v-model="judul"
      label="judul"
      prepend-icon="mdi-format-title"
      color="success"
    ></v-text-field>
    <v-textarea
      name="deskripsi"
      label="deskripsi"
      auto-grow
      prepend-inner-icon="mdi-note"
      rows="3"
      v-model="description"
      color="success"
    >
    </v-textarea>
    <v-btn color="success" @click="submitData">Submit</v-btn>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
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
    ...mapActions({
      setAlert: "alert/set",
    }),
    getBlog() {
      this.idBlog = this.$route.params.id;
      this.axios
        .get(`https://demo-api-vue.sanbercloud.com/api/v2/blog/${this.idBlog}`)
        .then((response) => {
          this.judul = response.data.blog.title;
          this.description = response.data.blog.description;
        })
        .catch((error) => {
          throw error;
        });
    },
    submitData() {
      console.log("clicked");
      if (this.imageFile) {
        this.submitPhoto();
      }
      this.axios
        .post(
          `https://demo-api-vue.sanbercloud.com/api/v2/blog/${this.idBlog}?_method=PUT`,
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
          // this.$router.push({ name: "Blog", params: { id: this.idBlog } });
          this.setAlert({
            status: true,
            color: "success",
            text: "Berhasil Edit",
          });
        })
        .catch((error) => {
          this.setAlert({
            status: true,
            color: "error",
            text: "Gagal Edit",
          });
          console.log(error.response);
          throw error;
        });
    },
    submitPhoto() {
      const formData = new FormData();
      formData.append("photo", this.imageFile);
      const config = {
        method: "POST",
        url: `https://demo-api-vue.sanbercloud.com/api/v2/blog/${this.idBlog}/upload-photo`,
        data: formData,
        headers: {
          Authorization: "Bearer " + this.token,
          "content-type": "application/json",
        },
      };
      this.axios(config)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          throw error;
        });
    },
  },
  created() {
    this.getBlog();
  },
};
</script>