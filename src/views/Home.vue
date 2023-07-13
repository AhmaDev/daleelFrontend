<template>
  <div id="home">
    <v-row>
      <v-col cols="12" md="3">
        <v-card class="pa-2">
          <v-row align="center">
            <v-col>
              <center>
                <v-icon icon="mdi-account-outline" size="72" color="green"></v-icon>
                <h3>الموظفين</h3>
              </center>
            </v-col>
            <v-col align="center" class="text-green">
              <h1 style="font-size: 72px;">{{ users.filter(e => e.roleId == 2).length.toLocaleString() }}</h1>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card class="pa-2">
          <v-row align="center">
            <v-col>
              <center>
                <v-icon icon="mdi-briefcase-account-outline" size="72" color="blue"></v-icon>
                <h3>الشركات</h3>
              </center>
            </v-col>
            <v-col align="center" class="text-blue">
              <h1 style="font-size: 72px;">{{ users.filter(e => e.roleId == 3).length.toLocaleString() }}</h1>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card class="pa-2">
          <v-row align="center">
            <v-col>
              <center>
                <v-icon icon="mdi-briefcase-outline" size="72" color="orange"></v-icon>
                <h3>الوظائف</h3>
              </center>
            </v-col>
            <v-col align="center" class="text-orange">
              <h1 style="font-size: 72px;">{{ jobs.length }}</h1>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card class="pa-2">
          <v-row align="center">
            <v-col>
              <center>
                <v-icon icon="mdi-access-point" size="72" color="red"></v-icon>
                <h5>اعلانات في الانتظار</h5>
              </center>
            </v-col>
            <v-col align="center" class="text-red">
              <h1 style="font-size: 72px;">
                {{ cvAds.filter(e => e.status == 'pending').length + jobAds.filter(e => e.status == 'pending').length }}
              </h1>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card class="pa-2">
          <v-row align="center">
            <v-col>
              <center>
                <v-icon icon="mdi-memory" size="72" color="pink"></v-icon>
                <h5>RAM</h5>
              </center>
            </v-col>
            <v-col align="center" class="text-pink">
              <h1 v-if="os != null" style="font-size: 52px;">
                {{ ((os.memory - os.freeMemory) / os.memory).toFixed(2) }}%
              </h1>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card class="pa-2">
          <v-row align="center">
            <v-col>
              <center>
                <v-icon icon="mdi-cpu-64-bit" size="72" color="grey"></v-icon>
                <h5>CPU</h5>
              </center>
            </v-col>
            <v-col align="center" class="text-grey">
              <h1 v-if="os != null" style="font-size: 52px;">
                {{ (os.cpu).toFixed(2) }}%
              </h1>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card class="pa-2">
          <v-row align="center">
            <v-col>
              <center>
                <v-icon icon="mdi-database" size="72" color="indigo"></v-icon>
                <h5>Storage</h5>
              </center>
            </v-col>
            <v-col align="center" class="text-indigo">
              <h1 v-if="os != null" style="font-size: 52px;">
                {{ (100 - (((5000 - jobs.length) / 5000) * 100)).toFixed(2) }}%
              </h1>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" md="12">
        <v-card class="pa-2">
          <h3 class="headerTitle">اخر 10 وظائف</h3>
          <v-table theme="light" hover>
            <thead>
              <tr>
                <th>#</th>
                <th>عنوان الوظيفة</th>
                <th>بتاريخ</th>
                <th>الاجراءات</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="job in latestJobs" :key="job.idJob">
                <td>D{{ job.idJob }}</td>
                <td>{{ job.jobTitle }}</td>
                <td>{{ $formatDate(job.createdAt, true) }}</td>
                <td>
                  <v-btn :to="'/job/' + job.idJob" variant="tonal" color="success" icon density="compact">
                    <v-icon icon="mdi-eye"></v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>


export default {
  components: {

  },

  data: () => ({
    users: [],
    jobs: [],
    latestJobs: [],
    cvAds: [],
    jobAds: [],
    os: null,
    chartData: null,
    chartOptions: {
      responsive: true
    }

  }),
  created: function () {
    this.fetch();
  },
  methods: {
    async fetch() {
      this.$store.state.loading = true;
      this.users = (await this.axios.get('users')).data;
      this.jobs = (await this.axios.get('jobs')).data;
      this.os = (await this.axios.get('os')).data;
      this.cvAds = (await this.axios.get("allCvAds")).data;
      this.jobAds = (await this.axios.get("allJobAds")).data;
      this.latestJobs = (await this.axios.get('jobs?order=createdAt&sort=DESC&limit=10')).data;
      this.$store.state.loading = false;
    },

  },
};
</script>

<style></style>