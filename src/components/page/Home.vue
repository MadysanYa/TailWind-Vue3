<template>
    <div>
        <div v-if="errored">
            Error
        </div>
        <div v-else>
            <TitleSection
                title="Recommended"
                :isSeeMore="true"
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
            </div>

            <TitleSection
                title="Most Viewed"
                :isSeeMore="true"
            />
            <div class="grid grid-cols-4 gap-4" v-if="loading">
                <SkeletonCard v-for="skeleton in skeletons" :key="skeleton.id"/>
            </div>
            <div class="grid grid-cols-4 gap-4" v-else>
                <CardSection
                    v-for="mostView in mostViews" 
                    :key="mostView.id" 
                    saleTitle="Sale"
                    :salePrice="mostView.sale_list_price"
                    :isSale="mostView.is_sale"
                    rentTitle="Rent"
                    :rentPrice="mostView.rent_list_price"
                    :isRent="mostView.is_rent"
                    :proType="mostView.property_type"
                    :proImage="mostView.image.medium"
                    :proAddress="mostView.short_address"
                    :landArea="mostView.land_area"
                    :perMeter="numberFormat(mostView.sale_list_price_per_square)"
                    :createdDate="mostView.created_at"
                    :view="mostView.view_count"
                    routeName="BuySaleShow"
                    :paramId="mostView.id"
                />
            </div>


            <TitleSection
                title="Latest Properties"
                :isSeeMore="true"
            />
            <div class="grid grid-cols-4 gap-4" v-if="loading">
                <SkeletonCard v-for="skeleton in skeletons" :key="skeleton.id"/>
            </div>
            <div class="grid grid-cols-4 gap-4" v-else>
                <CardSection
                    v-for="latestProperty in latestProperties" 
                    :key="latestProperty.id" 
                    saleTitle="Sale"
                    :salePrice="latestProperty.sale_list_price"
                    :isSale="latestProperty.is_sale"
                    rentTitle="Rent"
                    :rentPrice="latestProperty.rent_list_price"
                    :isRent="latestProperty.is_rent"
                    :proType="latestProperty.property_type"
                    :proImage="latestProperty.image.medium"
                    :proAddress="latestProperty.short_address"
                    :landArea="latestProperty.land_area"
                    :perMeter="numberFormat(latestProperty.sale_list_price_per_square)"
                    :createdDate="latestProperty.created_at"
                    :view="latestProperty.view_count"
                    routeName="BuySaleShow"
                    :paramId="latestProperty.id"
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
    name: 'Home-Page',
    components: {
        TitleSection,
        CardSection,
        SkeletonCard
    },
    data() {
        return {
            loading: true,
            errored: false,
            limit: 4,
            recommendeds: [],
            mostViews: [],
            latestProperties: [],
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
                return this.recommendeds = response.data.data.slice(0, this.limit);
            })
            .catch((error) => {
                console.log(error);
                this.errored = true;
            })
            .finally(() => this.loading = false)
        },
        async getAllMostView() {
            await axios
            .get(`${this.baseUrl}/api/v2/listings`, {
                params: {
                    is_sale: 1,
                    is_rent: 0,
                    address: '12',
                    sort_by: 'view:desc'
                }
            })
            .then((response) => {
                return this.mostViews = response.data.data.slice(0, this.limit);
            })
            .catch((error) => {
                console.log(error);
                this.errored = true;
            })
            .finally(() => this.loading = false)
        },
        async getAllLatestProperty() {
            await axios
            .get(`${this.baseUrl}/api/v2/listings`, {
                params: {
                    is_sale: 1,
                    is_rent: 0,
                    address: '12',
                }
            })
            .then((response) => {
                return this.latestProperties = response.data.data.slice(0, this.limit);
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
        this.getAllMostView()
        this.getAllLatestProperty()
    },
}
</script>

<style scoped>

</style>