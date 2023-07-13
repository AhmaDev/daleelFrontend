<template>
    <div id="usersPage">
        <v-card class="pa-5">
            <v-autocomplete :custom-filter="customFilter" @update:model-value="goToUser($event)"
                @update:menu="$fixMenu($event)" prepend-inner-icon="mdi-magnify" :items="users" item-title="username"
                clearable item-value="idUser" variant="outlined" label="ابحث عن مستخدم" v-model="searchField">
                <template v-slot:item="{ props, item }">
                    <v-list-item v-bind="props" :prepend-avatar="axios.defaults.baseURL + item.raw.image"
                        :title="item.raw.username" :subtitle="item.raw.phone"></v-list-item>
                </template>
            </v-autocomplete>
            <v-data-table class="elevation-0" :items="users" :headers="headers" theme="light" hover>
                <template v-slot:[`item.image`]="{ item }">
                    <v-avatar size="36px">
                        <v-img alt="Avatar" :src="axios.defaults.baseURL + item.value.image"></v-img>
                    </v-avatar>
                </template>
                <template v-slot:[`item.roleName`]="{ item }">
                    <v-chip color="blue" v-if="item.value.roleId == 3">شركة</v-chip>
                    <v-chip color="orange" v-if="item.value.roleId == 2">باحث عن عمل</v-chip>
                    <v-chip color="red" v-if="item.value.roleId == 1">Admin</v-chip>
                </template>
                <template v-slot:[`item.isBanned`]="{ item }">
                    <v-chip color="green" v-if="item.value.isBanned == 0">فعال</v-chip>
                    <v-chip color="red" v-if="item.value.isBanned == 1">محظور</v-chip>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn variant="tonal" size="small" color="success" icon="mdi-pencil"
                        :to="'/user/' + item.value.idUser">
                    </v-btn>
                    &nbsp;
                    <v-btn v-if="item.value.idUser != 1" variant="tonal" color="error" icon="mdi-delete-outline"
                        size="small">
                    </v-btn>
                </template>
            </v-data-table>
        </v-card>
    </div>
</template>

<script>
export default {
    data: () => ({
        users: [],
        headers: [
            { title: "الصورة", key: 'image', width: '50px' },
            { title: "اسم المستخدم", key: 'username' },
            { title: " نوع الحساب", key: 'roleName' },
            { title: " رقم الهاتف", key: 'phone' },
            { title: " الايميل", key: 'email' },
            { title: " الجنس", key: 'gender' },
            { title: " الحالة", key: 'isBanned' },
            { title: " الاجراءات", key: 'actions' },
        ],
        searchField: null,
    }),
    created: function () {
        this.fetch();
    },
    methods: {
        async fetch() {
            this.$store.state.loading = true;
            this.users = (await this.axios.get('users')).data
            this.$store.state.loading = false;
        },
        customFilter(itemTitle, queryText, item) {
            const textOne = item.raw.username.toLowerCase()
            const textTwo = item.raw.phone.toLowerCase()
            const searchText = queryText.toLowerCase()

            return textOne.indexOf(searchText) > -1 ||
                textTwo.indexOf(searchText) > -1
        },
        goToUser(e) {
            if (e != null) {
                this.$router.push('/user/' + e);
            }
        }

    }
}
</script>

<style></style>