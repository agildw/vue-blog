<template>
  <div>
    <router-link :to="{ name: 'Home' }">
      <v-btn color="error" @click="deleteBlog(blogId)">Delete</v-btn>
    </router-link>
    <router-view></router-view>
  </div>
</template>

  
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  // name: "delete",
  props: ["blogId"],
  computed: {
    ...mapGetters({
      token: "auth/token",
    }),
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set",
    }),
    deleteBlog(id) {
      // console.log(this.token);
      const config = {
        method: "post",
        url: `http://demo-api-vue.sanbercloud.com/api/v2/blog/${id}`,
        params: {
          _method: "DELETE",
        },
        headers: {
          Authorization: "Bearer " + this.token,
        },
      };
      this.axios(config)
        .then((response) => {
          console.log(response.data);
          this.setAlert({
            status: true,
            color: "success",
            text: "Delete Berhasil",
          });
        })
        .catch((error) => {
          console.log(error.response);
          // console.log(this.token);
          this.setAlert({
            status: true,
            color: "error",
            text: "Delete gagal",
          });
          throw error;
        });
    },
  },
};
</script>