<template>
    <div id="jobsPage">
        <v-card class="pa-10 elevation-2">
            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field @keypress.enter="searchByCode($event)" variant="outlined" label="ابحث عن كود وظيفة"
                        density="compact" prepend-inner-icon="mdi-pound" hint="اضغط ENTER للبحث"></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-autocomplete clearable v-model="selectedCategory" @update:modelValue.="fetch()"
                        @update:menu="$fixMenu($event)" density="compact" variant="outlined" label="فرز حسب الاختصاص"
                        :items="categories" item-title="categoryTitle" item-value="idCategory"></v-autocomplete>
                </v-col>
            </v-row>
            <v-data-table density="compact" theme="light" :height="500" fixed-header hover :items-per-page="20"
                :headers="tableHeader" :items="jobs" class="elevation-0">
                <template v-slot:[`item.idJob`]="{ item }">
                    <v-chip color="success">
                        D{{ item.value.idJob }}
                    </v-chip>
                </template>
                <template v-slot:[`item.jobTitle`]="{ item }">
                    <b>{{ item.value.jobTitle }}</b>
                </template>
                <template v-slot:[`item.expireDate`]="{ item }">
                    {{ $formatDate(item.value.expireDate) }}
                </template>
                <template v-slot:[`item.createdAt`]="{ item }">
                    {{ $formatDate(item.value.createdAt, true) }}
                </template>
                <template v-slot:[`item.maximumApplications`]="{ item }">
                    <v-chip color="info">
                        <pre>{{ item.value.totalApplied }}/{{ item.value.maximumApplications }}</pre>
                    </v-chip>
                </template>
                <template v-slot:[`item.image`]="{ item }">
                    <img :src="axios.defaults.baseURL + item.value.image" style="border-radius: 10px;" :width="80"
                        :height="40" alt="">
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn variant="tonal" size="small" color="blue" :to="`/job/${item.value.idJob}`" icon>
                        <v-icon icon="mdi-eye"></v-icon>
                    </v-btn>
                    &nbsp;
                    &nbsp;
                    <v-btn variant="tonal" size="small" color="error" @click="deleteJob(item.value.idJob)" icon>
                        <v-icon icon="mdi-delete-outline"></v-icon>
                    </v-btn>
                </template>
            </v-data-table>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'jobsPage',
    data: () => ({
        jobs: [],
        categories: [],
        selectedCategory: null,
        tableHeader: [
            { title: "#", key: 'idJob' },
            { title: "غلاف الوظيفة", key: 'image' },
            { title: "عنوان الوظيفة", key: 'jobTitle' },
            { title: "بواسطة", key: 'username' },
            { title: "بتاريخ", key: 'createdAt' },
            { title: "المحافظة", key: 'provinceName' },
            { title: "الجنس", key: 'gender' },
            { title: "الدراسة", key: 'education' },
            { title: "المتقدمين", key: 'maximumApplications' },
            { title: "اخر موعد للتقديم", key: 'expireDate' },
            { title: "الاجراءات", key: 'actions' },
        ]
    }),
    created: function () {
        this.fetch();
    },
    methods: {
        async fetch() {
            this.$store.state.loading = true;
            var q = '';
            if (this.selectedCategory != null) {
                console.log(this.selectedCategory);
                q = q + "&categoryId=" + this.selectedCategory;
            }
            this.jobs = (await this.axios.get("jobs?order=createdAt&sort=DESC&limit=10000" + q)).data;
            this.categories = (await this.axios.get("categorys")).data;
            this.$store.state.loading = false;
        },
        async searchByCode(e) {
            let code = e.target.value;
            if (code == "") {
                this.fetch();
            } else {
                try {
                    let id = code.split('D')[1];
                    this.$store.state.loading = true;
                    this.jobs = (await this.axios.get("jobs?id=" + id)).data;
                    this.$store.state.loading = false;
                } catch (error) {
                    console.error(error);
                }
            }

        },
        async deleteJob(id) {
            let c = confirm("هل انت متأكد");
            if (c) {
                await this.axios.delete('job/' + id);
                this.$toast.success("تم حذف الوظيفة");
                this.fetch();
            }
        }
    }
}
</script>

<style>
td {
    font-size: 13px;
}
</style>