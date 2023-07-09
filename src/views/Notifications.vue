<template>
    <div id="notifications">
        <v-card class="pa-10">
            <v-text-field variant="outlined" v-model="title" label="عنوان الاشعار"></v-text-field>
            <v-textarea variant="outlined" v-model="body" label="محتوى الاشعار"></v-textarea>
            <v-radio-group @change="changeType($event)" v-model="type" label="ارسال الى" color="blue">
                <v-radio label="الكل" value="all"></v-radio>
                <v-radio label="اصحاب العمل" value="companies"></v-radio>
                <v-radio label="الباحثين عن عمل" value="emplyees"></v-radio>
            </v-radio-group>
            <h3>اجمالي المستخدمين الذين سيصلهم الاشعار: {{ selectedUsers.length }}</h3>
            <v-divider class="my-10"></v-divider>
            <v-btn @click="send()" elevation="0" color="success">ارسال</v-btn>
        </v-card>
    </div>
</template>

<script>
export default {
    data: () => ({
        title: '',
        body: '',
        users: [],
        selectedUsers: [],
        type: 'all',
    }),
    created: function () {
        this.fetch();
    },
    methods: {
        async fetch() {
            this.$store.state.loading = true;
            this.users = (await this.axios.get('users')).data;
            this.selectedUsers = this.users.filter(e => e.fcmToken != null);
            this.$store.state.loading = false;
        },
        changeType(e) {
            let type = e.target.value;
            if (type == 'all') {
                this.selectedUsers = this.users.filter(e => e.fcmToken != null);
            }
            if (type == 'companies') {
                this.selectedUsers = this.users.filter(e => e.fcmToken != null && e.roleId == 3);
            }
            if (type == 'employees') {
                this.selectedUsers = this.users.filter(e => e.fcmToken != null && e.roleId == 2);
            }
        },
        async send() {
            if (this.title.length == 0 || this.body.length == 0) {
                this.$toast.warning("يرجى ملئ الحقول للمتابعة");
                return;
            }
            let tokens = this.selectedUsers.map(e => e.fcmToken);
            let values = this.selectedUsers.map(e => [e.idUser, this.title, this.body, 'announcment']);
            this.$store.state.loading = true;
            this.axios.post('notifications/send', {
                title: this.title,
                body: this.body,
                users: tokens,
            }).then(() => {
                this.axios.post('addNotification', values).then(() => {
                    this.$toast.success("تم ارسال الاشعار");
                    this.title = '';
                    this.body = '';
                }).finally(() => this.$store.state.loading = false);;
            });
        },
    }
}
</script>

<style></style>