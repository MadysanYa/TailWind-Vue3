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
                    routeName="BuySaleShow"
                    :paramId="recommended.id"
                />

                <InfiniteLoading @infinite="loadData" v-if="recommendeds.length"/>
            </div>
        </div>
    </div>
</template>

<script>
import TitleSection from '../TitleSection.vue'
import CardSection from '../Card.vue'
import SkeletonCard from '../loading/SkeletonCard.vue'
import axios from 'axios'
import InfiniteLoading from "v3-infinite-loading"

export default {
    name: 'Buy-Sale-Page',
    components: {
        TitleSection,
        CardSection,
        SkeletonCard,
        InfiniteLoading
    },
    data() {
        return {
            loading: true,
            errored: false,
            page: 1,
            last_page: 1,
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
        async getAllProperties() {
            await axios
            .get(`${this.baseUrl}/api/v2/listings`, {
                params: {
                    kind_of_listing: 'recommend',
                    is_sale: 1,
                    is_rent: 0,
                    address: '12',
                    page: this.page
                }
            })
            .then((response) => {
                this.recommendeds.push(...response.data.data)
                this.last_page = response.data.data.last_page
            })
            .catch((error) => {
                console.log(error);
                this.errored = true;
            })
            .finally(() => this.loading = false)
        },
        numberFormat(val) {
            return val.toFixed(2)
        },
        loadData(isVisibility) { 
            if (!isVisibility) { return }
            if (this.page >= this.last_page) { return }

            this.page++
            this.getAllProperties()
        }
    },
    computed: {
        
    },
    mounted() {
        this.getAllProperties()
    },
}
</script>

<style scoped>

</style>