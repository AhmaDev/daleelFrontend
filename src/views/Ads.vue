<template>
    <div id="adsPage">
        <v-row>
            <v-col cols="12" md="12">
                <v-card class="pa-10 elevation-2">
                    <h3>اعلانات الوظائف ({{ jobAds.length }})</h3>
                    <v-data-table theme="light" hover density="compact" :items="jobAds" :headers="jobAdsHeader">
                        <template v-slot:[`item.jobTitle`]="{ item }">
                            {{ item.value.jobTitle }}
                            <br>
                            <small>{{ $formatDate(item.value.createdAt, true) }}</small>
                        </template>
                        <template v-slot:[`item.startDate`]="{ item }">
                            <v-icon icon="mdi-source-commit-start" start></v-icon>
                            {{ $formatDate(item.value.startDate) }}
                            <br>

                            <v-icon icon="mdi-source-commit-end" start></v-icon>
                            {{ $formatDate(item.value.endDate) }}
                        </template>
                        <template v-slot:[`item.days`]="{ item }">
                            {{ $diffDays(item.value.startDate, item.value.endDate) }}
                        </template>
                        <template v-slot:[`item.totalPrice`]="{ item }">
                            <b class="text-success">{{ (item.value.pricePerDay * $diffDays(item.value.startDate,
                                item.value.endDate)).toLocaleString() }} IQD</b>
                        </template>
                        <template v-slot:[`item.paymentInfo`]="{ item }">
                            <v-dialog width="auto">
                                <template v-slot:activator="{ props }">
                                    <v-btn density="compact" variant="tonal" color="primary" v-bind="props">
                                        <v-icon icon="mdi-information" start></v-icon>
                                        <span>{{ item.value.paymentType }}</span>
                                    </v-btn>
                                </template>

                                <v-card>
                                    <v-card-text>
                                        <pre>
                                            {{ JSON.parse(item.value.paymentInfo) }}
                                        </pre>
                                    </v-card-text>
                                </v-card>
                            </v-dialog>
                        </template>
                        <template v-slot:[`item.status`]="{ item }">
                            <v-chip density="compact" v-if="item.value.status == 'pending'" color="warning">{{
                                item.value.status }}</v-chip>
                            <v-chip density="compact" v-if="item.value.status == 'active'" color="success">{{
                                item.value.status }}</v-chip>
                            <v-chip density="compact" variant="outlined" v-if="item.value.status == 'approved'"
                                color="success">{{
                                    item.value.status }}</v-chip>
                            <v-chip density="compact" v-if="item.value.status == 'ended'" color="error">{{ item.value.status
                            }}</v-chip>
                            <v-chip density="compact" v-if="item.value.status == 'denied'" color="error">{{
                                item.value.status }}</v-chip>
                        </template>
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-btn v-if="item.value.status == 'pending' || item.value.status == 'denied'" class="ma-1"
                                variant="tonal" @click="changeAdStatus(item.value.idJobAd, 'approved')" density="compact"
                                color="success">
                                <v-icon icon="mdi-check" start></v-icon>
                                <span>موافق</span>
                            </v-btn>
                            <v-btn v-if="item.value.status == 'pending' || item.value.status == 'approved'" class="ma-1"
                                variant="tonal" @click="changeAdStatus(item.value.idJobAd, 'denied')" density="compact"
                                color="error">
                                <v-icon icon="mdi-close" start></v-icon>
                                <span>رفض</span>
                            </v-btn>
                            <v-btn class="ma-1" variant="elevated" elevation="0" @click="deleteAd(item.value.idJobAd)"
                                density="compact" color="error">
                                <v-icon icon="mdi-delete-outline" start></v-icon>
                                <span>حذف</span>
                            </v-btn>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
            <v-col cols="12" md="12">
                <v-card class="pa-10 elevation-2">
                    <h3>اعلانات السير الذاتية ({{ cvAds.length }})</h3>
                    <v-data-table theme="light" hover density="compact" :items="cvAds" :headers="cvAdsHeader">
                        <template v-slot:[`item.username`]="{ item }">
                            {{ item.value.username }}
                            <br>
                            <small>{{ $formatDate(item.value.createdAt, true) }}</small>
                        </template>
                        <template v-slot:[`item.startDate`]="{ item }">
                            <v-icon icon="mdi-source-commit-start" start></v-icon>
                            {{ $formatDate(item.value.startDate) }}
                            <br>

                            <v-icon icon="mdi-source-commit-end" start></v-icon>
                            {{ $formatDate(item.value.endDate) }}
                        </template>
                        <template v-slot:[`item.days`]="{ item }">
                            {{ $diffDays(item.value.startDate, item.value.endDate) }}
                        </template>
                        <template v-slot:[`item.totalPrice`]="{ item }">
                            <b class="text-success">{{ (item.value.pricePerDay * $diffDays(item.value.startDate,
                                item.value.endDate)).toLocaleString() }} IQD</b>
                        </template>
                        <template v-slot:[`item.paymentInfo`]="{ item }">
                            <v-dialog width="auto">
                                <template v-slot:activator="{ props }">
                                    <v-btn density="compact" variant="tonal" color="primary" v-bind="props">
                                        <v-icon icon="mdi-information" start></v-icon>
                                        <span>ZAINCASH</span>
                                    </v-btn>
                                </template>

                                <v-card>
                                    <v-card-text>
                                        <pre>
                                            {{ JSON.parse(item.value.paymentInfo) }}
                                        </pre>
                                    </v-card-text>
                                </v-card>
                            </v-dialog>
                        </template>
                        <template v-slot:[`item.status`]="{ item }">
                            <v-chip density="compact" v-if="item.value.status == 'pending'" color="warning">{{
                                item.value.status }}</v-chip>
                            <v-chip density="compact" v-if="item.value.status == 'active'" color="success">{{
                                item.value.status }}</v-chip>
                            <v-chip density="compact" variant="outlined" v-if="item.value.status == 'approved'"
                                color="success">{{
                                    item.value.status }}</v-chip>
                            <v-chip density="compact" v-if="item.value.status == 'ended'" color="error">{{ item.value.status
                            }}</v-chip>
                            <v-chip density="compact" v-if="item.value.status == 'denied'" color="error">{{
                                item.value.status }}</v-chip>
                        </template>
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-btn v-if="item.value.status == 'pending' || item.value.status == 'denied'" class="ma-1"
                                variant="tonal" @click="changeCvAdStatus(item.value.idCvAd, 'approved')" density="compact"
                                color="success">
                                <v-icon icon="mdi-check" start></v-icon>
                                <span>موافق</span>
                            </v-btn>
                            <v-btn v-if="item.value.status == 'pending' || item.value.status == 'approved'" class="ma-1"
                                variant="tonal" @click="changeCvAdStatus(item.value.idCvAd, 'denied')" density="compact"
                                color="error">
                                <v-icon icon="mdi-close" start></v-icon>
                                <span>رفض</span>
                            </v-btn>
                            <v-btn class="ma-1" variant="elevated" elevation="0" @click="deleteCvAd(item.value.idCvAd)"
                                density="compact" color="error">
                                <v-icon icon="mdi-delete-outline" start></v-icon>
                                <span>حذف</span>
                            </v-btn>
                            <v-btn class="ma-1" variant="tonal" elevation="0" target="_BLANK"
                                :to="'/cv/' + item.value.idUser" density="compact" color="orange">
                                <v-icon icon="mdi-file-document-outline" start></v-icon>
                                <span>CV</span>
                            </v-btn>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    data: () => ({
        cvAds: [],
        jobAds: [],
        jobAdsHeader: [
            { title: "الوظيفة", key: "jobTitle" },
            { title: "نوع الاعلان", key: "adTypeTitle" },
            { title: "مدة الاعلان", key: "startDate" },
            { title: "عدد الايام", key: "days" },
            { title: "المبلغ الاجمالي", key: "totalPrice" },
            { title: "الحالة", key: "status" },
            { title: "الدفع", key: "paymentInfo" },
            { title: "الاجراءات", key: "actions" },
        ],
        cvAdsHeader: [
            { title: "المعلن", key: "username" },
            { title: "مدة الاعلان", key: "startDate" },
            { title: "عدد الايام", key: "days" },
            { title: "المبلغ الاجمالي", key: "totalPrice" },
            { title: "الحالة", key: "status" },
            { title: "الدفع", key: "paymentInfo" },
            { title: "الاجراءات", key: "actions" },
        ],
    }),
    created: function () {
        this.fetch();
    },
    methods: {
        async fetch() {
            this.$store.state.loading = true;
            this.cvAds = (await this.axios.get("allCvAds")).data;
            this.jobAds = (await this.axios.get("allJobAds")).data;
            this.$store.state.loading = false;
        },
        async changeAdStatus(id, status) {
            this.$store.state.loading = true;
            await this.axios.put('jobAd/' + id, {
                status: status,
            });
            this.fetch();
            this.$store.state.loading = false;
        },
        async changeCvAdStatus(id, status) {
            this.$store.state.loading = true;
            await this.axios.put('cvAd/' + id, {
                status: status,
            });
            this.fetch();
            this.$store.state.loading = false;
        },
        async deleteAd(id) {
            let c = confirm('هل انت متأكد');
            if (!c) {
                return;
            }
            this.$store.state.loading = true;
            await this.axios.delete('jobAd/' + id);
            this.fetch();
            this.$store.state.loading = false;
        },
        async deleteCvAd(id) {
            let c = confirm('هل انت متأكد');
            if (!c) {
                return;
            }
            this.$store.state.loading = true;
            await this.axios.delete('cvAd/' + id);
            this.fetch();
            this.$store.state.loading = false;
        },
    }
}
</script>

<style>
td {
    font-size: 13px;
}
</style>