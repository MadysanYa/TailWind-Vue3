<template>
    <div>
        <div v-if="errored">
            Error
        </div>
        <div v-else>
            <TitleSection title="All News" listingType="news"/>
            <div class="grid grid-cols-2 gap-4">
                <CardNews
                    v-for="value in news" 
                    routeName="BuySaleShow"
                    :key="value.id" 
                    :paramId="value.id"
                    :newsImage="value.featured_image.medium"
                    :newsTitle="value.title"
                    :newsDescription="value.description"
                    :newsLink="value.ref_link"
                    :newsUpdateDate="value.updated_at"
                />
            </div>
            <div class="py-5">
                <InfiniteLoading @infinite="loadData" v-if="news.length != total"/>
                <!-- <div class="text-sky-400 bg-white p-3 w-32 mx-auto text-center rounded-lg" v-else>Thank You !!!</div> -->
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import TitleSection from '../TitleSection.vue'
import CardNews from '../CardNews.vue'
import InfiniteLoading from "v3-infinite-loading"

export default {
    name: 'Most-View-Page',
    components: {
        TitleSection,
        CardNews,
        InfiniteLoading
    },
    data() {
        return {
            total: 0,
            page: 1,
            last_page: 1,
            per_page: 6,
            errored: false,
            loading: true,
            news: [],
            baseUrl: 'https://api.z1platform.com/api/s59',
        }
    },
    methods: {
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
        loadData() {
            this.page++
            this.getAllNews()
        }
    },
    mounted() {
        this.getAllNews()
    },
}
</script>

<style scoped>

</style>