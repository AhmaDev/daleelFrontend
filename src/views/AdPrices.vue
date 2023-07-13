<template>
    <div id="adPricesPage">
        <v-table theme="light" hover>
            <thead>
                <tr>
                    <th>نوع الاعلان</th>
                    <th>السعر لليوم الواحد</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="ad in adTypes" :key="ad.idAdType">
                    <td>{{ ad.adTypeTitle }}</td>
                    <td>
                        <v-text-field @change="updatePrice($event, ad.idAdType)" variant="outlined" hide-details
                            density="compact" type="number" v-model="ad.adPrice">
                        </v-text-field>
                    </td>
                </tr>
            </tbody>
        </v-table>
    </div>
</template>

<script>
export default {
    data: () => ({
        adTypes: [],
    }),
    created: function () {
        this.fetch();
    },
    methods: {
        async fetch() {
            this.$store.state.loading = true;
            this.adTypes = (await this.axios.get('adTypes')).data;
            this.$store.state.loading = false;
        },
        async updatePrice(e, id) {
            let price = e.target.value;
            this.$store.state.loading = true;
            await this.axios.put('adType/' + id, {
                adPrice: price,
            });
            this.$toast.success('تم تغيير السعر');
            this.$store.state.loading = false;
        },
    }
}
</script>

<style></style>