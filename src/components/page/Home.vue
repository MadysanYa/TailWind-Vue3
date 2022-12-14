<template>
    <div>
        <div v-if="errored">
            Error
        </div>
        <div v-else>
            <!-- Carousel Section -->
            <div class="grid grid-cols-4 gap-4 pt-5">
                <CarouselSection
                    :data="advertise"
                    :fromDetail="false"
                    :colSpan="true"
                />

                <div class="w-full max-w-md p-5 bg-white border rounded-lg">
                    <div class="flex items-center justify-between mb-4">
                        <h5 class="font-bold leading-none">Latest News</h5>
                        <router-link :to="{ name: 'News' }" class=" text-sky-400 hover:underline">View all</router-link>
                    </div>
                    <div class="flow-root">
                        <div class="overflow-y-auto" style="height: 457px;">
                            <ul role="list" class="divide-y divide-gray-200">
                                <li class="border" v-for="data in news" :key="data.id">
                                    <div class="flex items-center space-x-4 p-2">
                                        <div class="flex-shrink-0">
                                            <img class="h-10 w-14" :src="data.featured_image.small" alt="">
                                        </div>
                                        <div class="flex-1 min-w-0">
                                            <router-link to="">
                                                <p class="text-sm text-gray-400 line-clamp-2">
                                                    {{ data.title }}
                                                </p>
                                            </router-link>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <InfiniteLoading @infinite="loadData" v-if="news.length != total"/>
                        </div>
                    </div>
                </div>

            </div>

            <TitleSection title="Recommended" :isSeeMore="true" listingType="recommended"/>
            <div class="grid grid-cols-4 gap-4" v-if="loading">
                <SkeletonCard v-for="skeleton in skeletons" :key="skeleton.id" />
            </div>
            <div class="grid grid-cols-4 gap-4" v-else>
                <CardSection v-for="recommended in recommendeds" :key="recommended.id" saleTitle="Sale"
                    :salePrice="recommended.sale_list_price" :isSale="recommended.is_sale" rentTitle="Rent"
                    :rentPrice="recommended.rent_list_price" :isRent="recommended.is_rent"
                    :proType="recommended.property_type" :proImage="recommended.image.medium"
                    :proAddress="recommended.short_address" :landArea="recommended.land_area"
                    :perMeter="numberFormat(recommended.sale_list_price_per_square)"
                    :createdDate="recommended.created_at" 
                    :view="recommended.view_count" routeName="BuySaleShow"
                    :paramId="recommended.id" />
            </div>

            <TitleSection title="Most Viewed" :isSeeMore="true" listingType="most-viewed"/>
            <div class="grid grid-cols-4 gap-4" v-if="loading">
                <SkeletonCard v-for="skeleton in skeletons" :key="skeleton.id" />
            </div>
            <div class="grid grid-cols-4 gap-4" v-else>
                <CardSection v-for="mostView in mostViews" :key="mostView.id" saleTitle="Sale"
                    :salePrice="mostView.sale_list_price" :isSale="mostView.is_sale" rentTitle="Rent"
                    :rentPrice="mostView.rent_list_price" :isRent="mostView.is_rent" :proType="mostView.property_type"
                    :proImage="mostView.image.medium" :proAddress="mostView.short_address"
                    :landArea="mostView.land_area" :perMeter="numberFormat(mostView.sale_list_price_per_square)"
                    :createdDate="mostView.created_at" :view="mostView.view_count" routeName="BuySaleShow"
                    :paramId="mostView.id" />
            </div>


            <TitleSection title="Latest Properties" :isSeeMore="true" listingType="latest-properties"/>
            <div class="grid grid-cols-4 gap-4" v-if="loading">
                <SkeletonCard v-for="skeleton in skeletons" :key="skeleton.id" />
            </div>
            <div class="grid grid-cols-4 gap-4" v-else>
                <CardSection v-for="latestProperty in latestProperties" :key="latestProperty.id" saleTitle="Sale"
                    :salePrice="latestProperty.sale_list_price" :isSale="latestProperty.is_sale" rentTitle="Rent"
                    :rentPrice="latestProperty.rent_list_price" :isRent="latestProperty.is_rent"
                    :proType="latestProperty.property_type" :proImage="latestProperty.image.medium"
                    :proAddress="latestProperty.short_address" :landArea="latestProperty.land_area"
                    :perMeter="numberFormat(latestProperty.sale_list_price_per_square)"
                    :createdDate="latestProperty.created_at" :view="latestProperty.view_count" routeName="BuySaleShow"
                    :paramId="latestProperty.id" />
            </div>
        </div>
    </div>
</template>

<script>
import TitleSection from '../TitleSection.vue'
import CardSection from '../Card.vue'
import CarouselSection from '../Carousel.vue'
import SkeletonCard from '../loading/SkeletonCard.vue'
import InfiniteLoading from "v3-infinite-loading"
import axios from 'axios'

export default {
    name: 'Home-Page',
    components: {
        TitleSection,
        CardSection,
        SkeletonCard,
        CarouselSection,
        InfiniteLoading
    },
    data() {
        return {
            loading: true,
            errored: false,
            total: 0,
            page: 1,
            per_page: 8,
            limit: 4,
            recommendeds: [],
            mostViews: [],
            latestProperties: [],
            advertise: [],
            news: [],
            skeletons: [
                { id: 1 },
                { id: 2 },
                { id: 3 },
                { id: 4 },
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
        async getAllAds() {
            await axios
                .get(`${this.baseUrl}/api/v2/news_and_ads`, {
                    params: {
                        format: 'Ads'
                    }
                })
                .then((response) => {
                    return this.advertise = response.data.data.slice(0, 5);
                })
                .catch((error) => {
                    console.log(error);
                    this.errored = true;
                })
                .finally(() => this.loading = false)
        },
        async getAllNews() {
            await axios
                .get(`${this.baseUrl}/api/v2/news_and_ads`, {
                    params: {
                        format: 'News',
                        page: this.page,
                        per_page: this.per_page
                    }
                })
                .then((response) => {
                    this.news.push(...response.data.data)
                    this.total = response.data.meta.total
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
        loadData() {
            console.log('Hello Vue');
            this.page++
            this.getAllNews()
        }
    },
    computed: {

    },
    mounted() {
        this.getAllRecommended()
        this.getAllMostView()
        this.getAllLatestProperty()
        this.getAllAds()
        this.getAllNews()
    },
}
</script>

<style scoped>

</style>