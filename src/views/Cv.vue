<template>
  <div id="cvPage">
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <div v-if="user && cv">
      <div id="header">
        <v-row align="center">
          <v-col>
            <h1>{{ user.username }}</h1>
          </v-col>
          <v-col cols="auto">
            <img class="profileImage" :src="axios.defaults.baseURL + user.image" alt="">
          </v-col>
        </v-row>
      </div>
      <div class="pa-10">
        <v-row>
          <v-col cols="12">
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-icon>
                <v-icon size="32" color="blue">mdi-phone-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title style="font-size: 20px;">
                  <b>رقم الهاتف</b>
                </v-list-item-title>
                <v-list-item-subtitle style="font-size: 20px;">
                  <b>{{ user.phone }}</b>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-icon>
                <v-icon size="32" color="blue">mdi-email-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title style="font-size: 20px;">
                  <b>البريد الالكتروني</b>
                </v-list-item-title>
                <v-list-item-subtitle style="font-size: 20px;">
                  <b>{{ user.email }}</b>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-icon>
                <v-icon size="32" color="blue">mdi-gender-male-female</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title style="font-size: 20px;">
                  <b>الجنس</b>
                </v-list-item-title>
                <v-list-item-subtitle style="font-size: 20px;">
                  <b>{{ user.gender }}</b>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-icon>
                <v-icon size="32" color="blue">mdi-book-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title style="font-size: 20px;">
                  <b>معلومات الدراسة</b>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <div v-for="edu in cv.education" :key="edu.schoolName">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-account-school-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    <b>{{ edu.schoolName }}</b>
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ edu.year }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </div>
          </v-col>
          <v-col cols="12">
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-icon>
                <v-icon size="32" color="blue">mdi-checkbox-blank-badge-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title style="font-size: 20px;">
                  <b>الخبرات</b>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <div v-for="skill in cv.skills" :key="skill">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-circle</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    <b>{{ skill }}</b>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </div>
          </v-col>
          <v-col cols="12">
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-icon>
                <v-icon size="32" color="blue">mdi-translate-variant</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title style="font-size: 20px;">
                  <b>اللغات</b>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <div v-for="language in cv.languages" :key="language">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-web-box</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    <b>{{ language }}</b>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </div>
          </v-col>
          <v-col cols="12">
            <v-list-item>
              <v-list-item-icon>
                <v-icon size="32" color="blue">mdi-information-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title style="font-size: 20px;">
                  <b>نبذة عني</b>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <b>{{ cv.info }}</b>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CV',
  data: () => ({
    cv: null,
    user: null,
    isLoading: true,
  }),
  created: function () {
    this.fetch();
  },
  methods: {
    fetch() {
      this.axios.get('user/' + this.$route.params.id).then(res => {
        this.user = res.data;
        this.axios.get('cv/' + this.$route.params.id).then(res => {
          this.cv = res.data;
          this.cv.education = JSON.parse(this.cv.education);
          this.cv.skills = JSON.parse(this.cv.skills);
          this.cv.languages = JSON.parse(this.cv.languages);
          this.isLoading = false;
        }).catch(err => {
          console.log(err);
        });
      }).catch(err => {
        console.log(err);
      });;
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Almarai&display=swap');

* {
  font-family: 'Almarai', sans-serif;
}

#header {
  background-color: #223CA3;
  color: white;
  padding: 20px;
}

#header h1 {
  font-size: 30px;
}

.profileImage {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #FFFFFF;
}
</style>
