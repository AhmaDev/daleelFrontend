<template>
    <div id="usersPage">
        <v-data-table :items="users" :headers="headers" theme="light" hover>
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
                <v-btn variant="tonal" size="small" color="success" icon="mdi-pencil" :to="'/user/' + item.value.idUser">
                </v-btn>
                &nbsp;
                <v-btn v-if="item.value.idUser != 1" variant="tonal" color="error" icon="mdi-delete-outline" size="small">
                </v-btn>
            </template>
        </v-data-table>
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
        ]
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
    }
}
</script>

<style></style>