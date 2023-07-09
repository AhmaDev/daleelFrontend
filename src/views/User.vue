<template>
    <div id="userPage">
        <v-card v-if="user != null" class="pa-10">
            <v-row>
                <v-col cols="12" md="8">
                    <v-text-field variant="outlined" label="اسم المستخدم" v-model="user.username">
                        <template v-slot:append-inner>
                            <v-chip color="blue" v-if="user.roleId == 3">شركة</v-chip>
                            <v-chip color="orange" v-if="user.roleId == 2">باحث عن عمل</v-chip>
                        </template>
                    </v-text-field>
                    <v-text-field variant="outlined" label="رقم الهاتف" v-model="user.phone"></v-text-field>
                    <v-text-field variant="outlined" label="الايميل" v-model="user.email"></v-text-field>
                    <v-autocomplete @update:menu="$fixMenu($event)" variant="outlined" v-model="user.provinceId"
                        :items="categories" item-title="categoryTitle" item-value="idCategory"
                        label="الاختصاص"></v-autocomplete>
                    <v-autocomplete @update:menu="$fixMenu($event)" variant="outlined" v-model="user.categoryId"
                        :items="provinces" item-title="provinceName" item-value="idProvince"
                        label="المحافظة"></v-autocomplete>
                    <v-text-field variant="outlined" label="الموقع" v-model="user.location"></v-text-field>
                    <v-radio-group v-model="user.gender" label="الجنس" color="blue">
                        <v-radio label="ذكر" value="male"></v-radio>
                        <v-radio label="انثى" value="female"></v-radio>
                    </v-radio-group>
                    <v-switch style="width: 200px;" v-model="user.isBanned" :true-value="1" :false-value="0" color="error"
                        label="حظر الحساب" inset></v-switch>
                    <v-divider class="mb-5"></v-divider>
                    <v-btn @click="saveUser()" elevation="0" color="success" size="large">حفظ</v-btn>
                </v-col>
                <v-col cols="12" md="4">
                    <v-card variant="outlined" color="error" class="pa-5">
                        <h4 class="mb-5">تغيير كلمة المرور</h4>
                        <v-text-field v-model="newPassword" prepend-inner-icon="mdi-key" variant="outlined"
                            label="كلمة المرور الجديدة"></v-text-field>
                        <v-btn @click="updatePassword()" elevation="0" color="error" size="large" block>تغيير كلمة
                            المرور</v-btn>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<script>
export default {
    data: () => ({
        user: null,
        categories: [],
        provinces: [],
        newPassword: '',
    }),
    created: function () {
        this.fetch();
    },
    methods: {
        async fetch() {
            this.$store.state.loading = true;
            this.user = (await this.axios.get('user/' + this.$route.params.id)).data;
            this.provinces = (await this.axios.get('provinces')).data;
            this.categories = (await this.axios.get('categorys')).data;
            this.$store.state.loading = false;
        },
        async saveUser() {
            this.$store.state.loading = true;
            await this.axios.put('user/' + this.$route.params.id, {
                "username": this.user.username,
                "phone": this.user.phone,
                "email": this.user.email,
                "provinceId": this.user.provinceId,
                "location": this.user.location,
                "isBanned": this.user.isBanned,
                "gender": this.user.gender,
                "categoryId": this.user.categoryId,
            });
            this.$store.state.loading = false;
            this.$toast.success("تم حفظ المعلومات");
        },
        async updatePassword() {
            if (this.newPassword == "") {
                this.$toast.error("يرجى ادخال كلمة مرور جديدة");
                return;
            }
            this.$store.state.loading = true;
            await this.axios.put('updatePasswordAdmin/' + this.$route.params.id, {
                "password": this.newPassword,
            });
            this.$store.state.loading = false;
            this.newPassword = ""
            this.$toast.success("تم حفظ المعلومات");
        },
    }
}
</script>

<style></style>