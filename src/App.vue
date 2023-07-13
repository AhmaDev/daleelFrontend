<template>
  <v-app>
    <v-navigation-drawer width="300" color="white" theme="light" elevation="2" v-if="isLoggedIn" app v-model="drawer">
      <v-btn @click="drawer = !drawer" style="position: absolute" class="ma-2 hidden-md-and-up" flat icon>
        <v-icon>mdi-menu</v-icon>
      </v-btn>

      <div class="text-center">
        <br />
        <br />
        <!-- <div class="bg-white ma-5 rounded-lg"> -->
        <img src="./logo.png" width="150" alt="" />
        <!-- </div> -->
        <br />
        <br />
        <v-divider></v-divider>
        <br />
      </div>

      <v-list>
        <template v-for="item in menu" :key="item.title">
          <template v-if="userInfo.idUser != 1">
            <v-list-item :prepend-icon="item.icon" :value="item.route" active-color="blue-darken-2" :to="item.route"
              rounded="xl" class="mx-2" v-if="item.onlyAdmin != true">
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item>
          </template>
          <template v-if="userInfo.idUser == 1">
            <v-list-item :prepend-icon="item.icon" :value="item.route" active-color="blue-darken-2" :to="item.route"
              rounded="xl" class="mx-2">
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item>
          </template>
        </template>
      </v-list>
      <template v-slot:append>
        <v-list>
          <v-list-item :prepend-icon="'mdi-power'" active-color="white" rounded="xl" class="mx-2" @click="logout()">
            <v-list-item-title> تسجيل خروج </v-list-item-title>
          </v-list-item>
        </v-list>
        <br />
        <div class="mb-10">
          <div class="text-center">
            <v-btn variant="text">
              <small class="text-white">
                <b>AhmaDev Development</b> &copy;
                {{ new Date().getFullYear() }}
              </small>
            </v-btn>
          </div>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar color="white" v-if="isLoggedIn" elevation="2">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>الدليل</v-app-bar-title>
    </v-app-bar>
    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container :class="$vuetify.display.mobile ? 'pa-1' : ''" fluid>
        <!-- If using vue-router -->
        <router-view v-if="isLoggedIn" />
        <Login v-else />
      </v-container>
    </v-main>
    <notifications />
    <v-overlay style="z-index: 10000000000000" :model-value="$store.state.loading" scrim="#000000"
      class="align-center justify-center">
      <v-progress-circular color="white" indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import Login from "./views/Login.vue";

export default {
  name: "App",
  components: { Login },
  data: () => ({
    isLoggedIn: false,
    userInfo: null,
    drawer: true,
    menu: [
      {
        title: "الرئيسية",
        route: "/",
        icon: "mdi-home-outline",
      },
      { title: "الوظائف", route: "/jobs", icon: "mdi-briefcase-outline" },
      { title: "الاعلانات", route: "/ads", icon: "mdi-access-point" },
      { title: "الاشعارات", route: "/notifications", icon: "mdi-bell-outline" },
      { title: "المستخدمين", route: "/users", icon: "mdi-account-outline" },
      { title: "اسعار الاعلانات", route: "/prices", icon: "mdi-cash" },
      { title: "التقارير", route: "/reports", icon: "mdi-poll" },
      { title: "الاعدادات", route: "/settings", icon: "mdi-cog" },
    ],
  }),
  mounted: function () {

    if (localStorage.getItem("userInfo")) {
      this.isLoggedIn = true;
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    } else {
      this.isLoggedIn = false;
    }
  },
  methods: {
    getAssets(assetName) {
      let asset = require("./assets/" + assetName);
      return asset;
    },
    logout() {
      let con = confirm("هل انت متأكد من تسجيل الخروج");
      if (con) {
        localStorage.clear();
        location.href = "/";
      }
    },
  },
};
</script>
<style src="./style.css"></style>
