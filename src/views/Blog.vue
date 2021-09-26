<template>
  <div>
    <!-- <div v-if="blogId == false" justify-center>
      <h3>Blog not found</h3>
      <v-btn :to="{ name: 'Home' }" color="error" class="justify-center"
        >Back</v-btn
      >
    </div> -->
    <div v-if="!guest && blogId != false">
      <v-btn
        small
        :to="{ name: 'EditBlog', params: { id: blogId } }"
        color="primary"
        class="float-left mx-1 mb-2"
        >EDIT</v-btn
      >
      <delete-component :blogId="blogId"></delete-component>
    </div>

    <v-card v-if="blog.id">
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

      <v-card-text>
        <v-simple-table dense>
          <tbody>
            <tr>
              <td><v-icon>mdi-format-title</v-icon>Judul</td>
              <td class="blue--text">{{ blog.title }}</td>
            </tr>
            <tr>
              <td><v-icon>mdi-note</v-icon>Deskripsi</td>
              <td>{{ blog.description }}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
// import delete from '../components/Delete.vue';
import deleteComponent from "../components/DeleteComponent.vue";
export default {
  data: () => ({
    baseUrl: "https://demo-api-vue.sanbercloud.com",
    blog: {},
    blogId: false,
  }),
  components: {
    "delete-component": deleteComponent,
  },
  computed: {
    ...mapGetters({
      guest: "auth/guest",
    }),
  },
  methods: {
    go() {
      let { id } = this.$route.params;
      const config = {
        method: "get",
        url: `${this.baseUrl}/api/v2/blog/${id}`,
      };
      this.axios(config)
        .then((response) => {
          this.blogId = response.data.blog.id;
          // console.log(this.blogId);
          let { blog } = response.data;
          this.blog = blog;
        })
        .catch((error) => {
          this.$router.push({ name: "Home" });
          alert("blog not found");
          throw error;
        });
    },
  },
  created() {
    this.go();
  },
};
</script>