<template>
    <div v-if="job" id="jobPage">

        <v-row>
            <v-col cols="12" md="6">
                <v-card class="pa-10 elevation-2">
                    <v-text-field variant="outlined" label="عنوان الوظيفة" v-model="job.jobTitle"></v-text-field>
                    <v-text-field type="date" variant="outlined" label="آخر موعد للتقديم"
                        v-model="job.expireDate"></v-text-field>
                    <v-text-field type="number" variant="outlined" label="العدد المسموح للتقديم على الوظيفة"
                        v-model="job.maximumApplications"></v-text-field>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field type="number" variant="outlined" label="العمر من"
                                v-model="job.ageFrom"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field type="number" variant="outlined" label="العمر الى"
                                v-model="job.ageTo"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field type="number" variant="outlined" label="الراتب من"
                                v-model="job.salaryFrom"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field type="number" variant="outlined" label="الراتب الى"
                                v-model="job.salaryTo"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-text-field type="number" variant="outlined" label="ساعات العمل"
                        v-model="job.workHours"></v-text-field>
                    <v-text-field type="number" variant="outlined" label="ايام الاجازة"
                        v-model="job.holidays"></v-text-field>
                    <v-text-field type="number" variant="outlined" label="سنوات الخبرة"
                        v-model="job.skillYears"></v-text-field>
                    <v-radio-group v-model="job.gender" label="الجنس المطلوب">
                        <v-radio label="ذكر" value="male"></v-radio>
                        <v-radio label="انثى" value="female"></v-radio>
                        <v-radio label="كلاهما" value="both"></v-radio>
                    </v-radio-group>
                    <v-radio-group v-model="job.education" label="التحصيل الدراسي">
                        <v-radio label="غير مطلوب" value="غير مطلوب"></v-radio>
                        <v-radio label="ابتدائية" value="ابتدائية"></v-radio>
                        <v-radio label="متوسطة" value="متوسطة"></v-radio>
                        <v-radio label="اعدادية" value="اعدادية"></v-radio>
                        <v-radio label="بكالوريوس" value="بكالوريوس"></v-radio>
                        <v-radio label="ماجستير" value="ماجستير"></v-radio>
                        <v-radio label="دكتوراة" value="دكتوراة"></v-radio>
                    </v-radio-group>
                </v-card>
            </v-col>
            <v-col cols="12" md="6">
                <v-card class="pa-10 elevation-2">
                    <v-textarea variant="outlined" label="تفاصيل العمل" v-model="job.description"></v-textarea>
                    <v-autocomplete @update:menu="$fixMenu($event)" variant="outlined" label="المحافظة" :items="provinces"
                        item-title="provinceName" item-value="idProvince" v-model="job.provinceId"></v-autocomplete>
                    <h4>الاختصاصات</h4>
                    <v-chip color="primary" class="mx-1" closable @click:close="deleteSkill(skill.idJobCategories)"
                        v-for="skill in job.categories" :key="skill.idJobCategories">
                        {{ skill.categoryTitle }}

                    </v-chip>
                    <v-chip color="warning" class="mx-1" @click="$fixMenu($event)">
                        <b>اضافة</b>
                        <v-menu activator="parent">
                            <v-list height="400">
                                <v-list-item @click="addCategory(item.idCategory)" v-for="(item, index) in categories"
                                    :key="index" :value="item.idCategory">
                                    <v-list-item-title>{{ item.categoryTitle }}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-chip>
                </v-card>
                <v-card class="pa-10 mt-5 elevation-2">
                    <v-img class="rounded" width="100%" :src="axios.defaults.baseURL + job.image" alt=""></v-img>
                    <input accept="image/*" @change="uploadFile()" type="file" name="file" id="file" style="display:none">
                    <br>
                    <v-btn @click="pickImage()" block variant="tonal" color="warning">
                        <v-icon icon="mdi-image" start></v-icon>
                        <span>تعديل صورة الغلاف</span>
                    </v-btn>
                </v-card>
                <v-card class="pa-10 mt-5 elevation-2">
                    <h3 class="mb-5">المتقدمين على الوظيفة ({{ job.totalApplied }})</h3>
                    <v-list-item class="my-2 elevation-0" :prepend-avatar="axios.defaults.baseURL + application.userImage"
                        :title="application.username" :subtitle="'بتاريخ : ' + $formatDate(application.createdAt, true)"
                        v-for="application in applications" :key="application.idJobApplication">
                        <template v-slot:append>
                            <v-chip v-if="application.status == 'pending'" color="warning">{{ application.status }}</v-chip>
                            <v-chip v-if="application.status == 'approved'" color="success">{{ application.status
                            }}</v-chip>
                            <v-chip v-if="application.status == 'declined'" color="error">{{ application.status }}</v-chip>
                        </template>
                    </v-list-item>
                </v-card>
                <v-card class="pa-10 mt-5 elevation-2">
                    <h3 class="mb-5">اعلانات الوظيفة ({{ ads.length }})</h3>

                    <v-list-item prepend-icon="mdi-bullhorn-outline" class="my-2 elevation-0" :title="ad.adTypeTitle"
                        v-for="ad in ads" :key="ad.idJobAd">
                        <template v-slot:append>
                            <v-chip v-if="ad.status == 'pending'" color="warning">{{ ad.status }}</v-chip>
                            <v-chip v-if="ad.status == 'active'" color="success">{{ ad.status
                            }}</v-chip>
                            <v-chip v-if="ad.status == 'ended'" color="error">{{ ad.status }}</v-chip>
                        </template>
                        <template v-slot:subtitle>
                            <b>تاريخ الاعلان : {{ $formatDate(ad.createdAt, true) }} </b>
                            <br>
                            <b>يبدأ في : {{ $formatDate(ad.startDate) }} </b>
                            <br>
                            <b>ينتهي في : {{ $formatDate(ad.endDate) }} </b>
                        </template>
                    </v-list-item>
                </v-card>
            </v-col>
        </v-row>
    </div>
    <v-footer app class="elevation-2">
        <v-row>
            <v-col>
                <v-btn @click="save()" variant="elevated" color="success">
                    <span>حفظ</span>
                </v-btn>
            </v-col>
            <v-col align="left">
                <v-btn @click="deleteJob()" variant="tonal" color="error">
                    <span>حذف الوظيفة</span>
                </v-btn>
            </v-col>
        </v-row>
    </v-footer>
</template>

<script>
export default {
    data: () => ({
        job: null,
        categories: [],
        provinces: [],
        applications: [],
        ads: [],
    }),
    created: function () {
        this.fetch();
    },
    methods: {
        async fetch() {
            this.$store.state.loading = true;
            this.job = (await this.axios.get("job/" + this.$route.params.id)).data
            this.applications = (await this.axios.get("jobApplications/" + this.$route.params.id)).data
            this.ads = (await this.axios.get("jobAds/" + this.$route.params.id)).data
            this.categories = (await this.axios.get("categorys")).data
            this.provinces = (await this.axios.get("provinces")).data
            this.job.expireDate = this.$formatDate(this.job.expireDate);
            this.$store.state.loading = false;
        },
        async deleteSkill(id) {
            this.$store.state.loading = true;
            await this.axios.delete("jobCategories/" + id);
            this.$store.state.loading = false;
            this.fetch();
        }
        ,
        async addCategory(id) {
            this.$store.state.loading = true;
            await this.axios.post("addJobCategories", {
                jobId: this.$route.params.id,
                categoryId: id,
            });
            this.$store.state.loading = false;
            this.fetch();
        },
        async save() {
            this.$store.state.loading = true;
            await this.axios.put("job/" + this.$route.params.id, {
                jobTitle: this.job.jobTitle,
                expireDate: this.job.expireDate,
                maximumApplications: this.job.maximumApplications,
                ageFrom: this.job.ageFrom,
                ageTo: this.job.ageTo,
                salaryFrom: this.job.salaryFrom,
                salaryTo: this.job.salaryTo,
                workHours: this.job.workHours,
                holidays: this.job.holidays,
                skillYears: this.job.skillYears,
                gender: this.job.gender,
                education: this.job.education,
                description: this.job.description,
                provinceId: this.job.provinceId,
            });
            this.$store.state.loading = false;
            this.$toast.success("تم الحفظ")
            this.fetch();
        },
        async pickImage() {
            document.getElementById("file").click()
        },
        async uploadFile() {
            this.$store.state.loading = true;
            var formData = new FormData();
            var imagefile = document.querySelector("#file");
            formData.append("file", imagefile.files[0]);
            await this.axios
                .post("editJobImage/" + this.$route.params.id + "?destination=job", formData);
            this.$store.state.loading = false;
            this.fetch();
            this.$toast.success("تم الحفظ");
        },
        async deleteJob() {
            let c = confirm("هل انت متأكد");
            if (c) {
                await this.axios.delete('job/' + this.$route.params.id);
                this.$toast.success("تم حذف الوظيفة");
                setTimeout(() => {
                    this.$router.push('/jobs');
                }, 200);
            }
        }
    }
}
</script>

<style></style>