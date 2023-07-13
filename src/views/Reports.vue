<template>
    <div id="reportsPage">
        <div class="" v-if="reports != null">
            <v-card class="mb-5 elevation-2 pa-5">
                <v-row align="end">
                    <v-col cols="12" md="4">
                        <small>من تاريخ</small>
                        <VueDatePicker :enable-time-picker="false" menu-class-name="dpMenuX" model-type="format"
                            format="yyyy-MM-dd" auto-apply :teleport="true" close-on-auto-apply no-swipe :clearable="false"
                            v-model="startDate" />
                    </v-col>
                    <v-col cols="12" md="4">
                        <small>الى تاريخ</small>
                        <VueDatePicker :enable-time-picker="false" menu-class-name="dpMenuX" model-type="format"
                            format="yyyy-MM-dd" auto-apply :teleport="true" close-on-auto-apply no-swipe :clearable="false"
                            v-model="endDate" />
                    </v-col>
                    <v-col cols="auto">
                        <v-btn color="primary" @click="fetch()" variant="tonal" size="small" icon="mdi-magnify"></v-btn>
                    </v-col>
                </v-row>
            </v-card>
            <v-row>
                <v-col cols="12" md="3">
                    <v-card class="pa-2">
                        <v-row align="center">
                            <v-col>
                                <center>
                                    <v-icon icon="mdi-account-outline" size="72" color="green"></v-icon>
                                    <h5>الموظفين الجدد</h5>
                                </center>
                            </v-col>
                            <v-col align="center" class="text-green">
                                <h1 style="font-size: 72px;">{{ reports.employees }}
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
                                    <v-icon icon="mdi-briefcase-account-outline" size="72" color="blue"></v-icon>
                                    <h5>الشركات الجديدة</h5>
                                </center>
                            </v-col>
                            <v-col align="center" class="text-blue">
                                <h1 style="font-size: 72px;">{{ reports.companies }}
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
                                    <v-icon icon="mdi-briefcase-outline" size="72" color="orange"></v-icon>
                                    <h5>الوظائف المنشورة</h5>
                                </center>
                            </v-col>
                            <v-col align="center" class="text-orange">
                                <h1 style="font-size: 72px;">{{ reports.jobs }}</h1>
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
                                    {{ reports.pendingAds }}
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
                                    <v-icon icon="mdi-access-point" size="72" color="green"></v-icon>
                                    <h5>اعلانات سلايدر فعالة</h5>
                                </center>
                            </v-col>
                            <v-col align="center" class="text-green">
                                <h1 style="font-size: 72px;">
                                    {{ reports.totalJobSlider }}
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
                                    <v-icon icon="mdi-access-point" size="72" color="green"></v-icon>
                                    <h5>اعلانات بحث فعالة</h5>
                                </center>
                            </v-col>
                            <v-col align="center" class="text-green">
                                <h1 style="font-size: 72px;">
                                    {{ reports.totalJobSearch }}
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
                                    <v-icon icon="mdi-access-point" size="72" color="green"></v-icon>
                                    <h5>اعلانات popUp فعالة</h5>
                                </center>
                            </v-col>
                            <v-col align="center" class="text-green">
                                <h1 style="font-size: 72px;">
                                    {{ reports.totalJobSplash }}
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
                                    <v-icon icon="mdi-access-point" size="72" color="green"></v-icon>
                                    <h5>اعلانات مقبولة</h5>
                                </center>
                            </v-col>
                            <v-col align="center" class="text-green">
                                <h1 style="font-size: 72px;">
                                    {{ reports.approvedAds }}
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
                                    <v-icon icon="mdi-account-check-outline" size="72" color="green"></v-icon>
                                    <h5>المتقدمين المقبولين</h5>
                                </center>
                            </v-col>
                            <v-col align="center" class="text-green">
                                <h1 style="font-size: 72px;">
                                    {{ reports.approvedApplications }}
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
                                    <v-icon icon="mdi-account-cancel-outline" size="72" color="red"></v-icon>
                                    <h5>المتقدمين المرفوضين</h5>
                                </center>
                            </v-col>
                            <v-col align="center" class="text-red">
                                <h1 style="font-size: 72px;">
                                    {{ reports.declinedApplications }}
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
                                    <v-icon icon="mdi-account-clock-outline" size="72" color="orange"></v-icon>
                                    <h5>المتقدمين في الانتظار</h5>
                                </center>
                            </v-col>
                            <v-col align="center" class="text-orange">
                                <h1 style="font-size: 72px;">
                                    {{ reports.pendingApplications }}
                                </h1>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
            <v-table class="elevation-2 mt-10" theme="light" hover>
                <thead>
                    <tr>
                        <th>التخصص</th>
                        <th>عدد الموظفين</th>
                        <th>عدد الشركات</th>
                        <th>عدد الوظائف</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="cat in reports.categoriesInfo" :key="cat.idCategory">
                        <td>{{ cat.categoryTitle }}</td>
                        <td>{{ cat.totalEmployees }}</td>
                        <td>{{ cat.totalCompanies }}</td>
                        <td>{{ cat.totalJobs }}</td>
                    </tr>
                </tbody>
            </v-table>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        reports: null,
        startDate: '',
        endDate: '',
    }),
    created: function () {
        let initDate = new Date();
        this.startDate = `${initDate.getFullYear()}-01-01`
        this.endDate = `${initDate.getFullYear()}-${initDate.getMonth() + 1}-${initDate.getDate()}`
        this.fetch();
    },
    methods: {
        async fetch() {
            this.$store.state.loading = true;
            this.reports = (await this.axios.get(`reports?startDate=${this.startDate}&endDate=${this.endDate}`)).data;
            this.$store.state.loading = false;
        }
    }
}
</script>

<style></style>