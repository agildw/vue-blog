<template>
  <v-card>
    <v-toolbar dark color="success">
      <v-btn icon dark @click.native="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>Register</v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-container fluid>
      <v-form ref="form">
        <v-file-input
          show-size
          truncate-length="15"
          v-model="imageFile"
          color="success"
          label="Masukkan foto"
        ></v-file-input>
        <!-- <input type="file" name="photo" ref="photo" style="margin: 10px 0" /> -->
        <v-text-field
          v-model="name"
          label="Name"
          required
          append-icon="mdi-name"
          color="success"
        ></v-text-field>
        <v-text-field
          v-model="email"
          label="E-Mail"
          required
          append-icon="mdi-email"
          color="success"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          counter
          @click:append="showPassword = !showPassword"
          color="success"
        ></v-text-field>
        <div class="text-xs-center">
          <v-btn color="success" @click="submit">Register</v-btn>
          <v-icon right dark>mdi-lock-open</v-icon>
        </div>
      </v-form>
    </v-container>
  </v-card>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      email: "",
      showPassword: false,
      password: "",
      baseUrl: "https://demo-api-vue.sanbercloud.com",
      imageFile: null,
      name: "",
    };
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set",
      // setToken: "auth/setToken",
    }),
    close() {
      this.$emit("closed", false);
    },
    submit() {
      const formData = new FormData();
      formData.append("email", this.email);
      formData.append("password", this.password);
      formData.append("name", this.name);
      formData.append("photo_profile", this.imageFile);
      // formData.append("photo_profile", this.$refs.photo.files[0]);

      const config = {
        method: "post",
        url: this.baseUrl + "/api/v2/auth/register",
        data: formData,
      };
      this.axios(config)
        .then(() => {
          this.setAlert({
            status: true,
            color: "success",
            text: "Register Berhasil",
          });
          this.close();
        })
        .catch((error) => {
          this.setAlert({
            status: true,
            color: "error",
            text: "Register gagal",
          });
          throw error;
        });
    },
  },
};
</script>