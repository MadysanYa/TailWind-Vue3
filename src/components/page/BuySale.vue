<template>
    <div>
        <div v-if="errored">
            Error
        </div>
        <div v-else>
            <TitleSection
                title="All Properties"
                :isSeeMore="true"
                label="Recently Viewed"
            />
            <div class="grid grid-cols-4 gap-4" v-if="loading">
                <SkeletonCard v-for="skeleton in skeletons" :key="skeleton.id"/>
            </div>
            <div class="grid grid-cols-4 gap-4" v-else>
                <CardSection
                    v-for="recommended in recommendeds" 
                    :key="recommended.id" 
                    saleTitle="Sale"
                    :salePrice="recommended.sale_list_price"
                    :isSale="recommended.is_sale"
                    rentTitle="Rent"
                    :rentPrice="recommended.rent_list_price"
                    :isRent="recommended.is_rent"
                    :proType="recommended.property_type"
                    :proImage="recommended.image.medium"
                    :proAddress="recommended.short_address"
                    :landArea="recommended.land_area"
                    :perMeter="numberFormat(recommended.sale_list_price_per_square)"
                    :createdDate="recommended.created_at"
                    :view="recommended.view_count"
                />
            </div>
        </div>
    </div>
</template>

<script>
import TitleSection from '../TitleSection.vue'
import CardSection from '../Card.vue'
import SkeletonCard from '../loading/SkeletonCard.vue'
import axios from 'axios'

export default {
    name: 'Buy-Sale-Page',
    components: {
        TitleSection,
        CardSection,
        SkeletonCard
    },
    data() {
        return {
            loading: true,
            errored: false,
            recommendeds: [],
            skeletons: [
                {id:1},
                {id:2},
                {id:3},
                {id:4},
            ],
            baseUrl: 'https://api.z1platform.com/api/s59',
        }
    },
    methods: {
        async getAllRecommended() {
            await axios
            .get(`${this.baseUrl}/api/v2/listings`, {
                params: {
                    kind_of_listing: 'recommend',
                    is_sale: 1,
                    is_rent: 0,
                    address: '12',
                }
            })
            .then((response) => {
                return this.recommendeds = response.data.data;
            })
            .catch((error) => {
                console.log(error);
                this.errored = true;
            })
            .finally(() => this.loading = false)
        },
        numberFormat(val) {
            return val.toFixed(2)
        }
    },
    computed: {
        
    },
    mounted() {
        this.getAllRecommended()
    },
}
</script>

<style scoped>

</style>