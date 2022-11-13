<template>
    <div>
        <TitleSection title="Preview Detail" />
        <p>{{ listingDetail.id }}</p>
    </div>
</template>

<script>
import TitleSection from '../TitleSection.vue'
import axios from 'axios'

export default {
    name: 'Detail-Page',
    components: {
        TitleSection
    },
    data() {
        return {
            listingID: this.$route.params.id,
            loading: true,
            listingDetail: {},
            baseUrl: 'https://api.z1platform.com/api/s59',
        }
    },
    methods: {
        async getDetailProperty() {
            await axios
            .get(`${this.baseUrl}/api/v2/listings/${this.listingID}`)
                .then((response) => {
                this.listingDetail = response.data;
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => this.loading = false)
        },
    },
    mounted() {
        this.getDetailProperty()
    },

}
</script>

<style scoped>

</style>