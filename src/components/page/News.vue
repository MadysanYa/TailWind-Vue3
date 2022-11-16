<template>
    <div>
        <div v-if="errored">
            Error
        </div>
        <div v-else>
            <TitleSection title="All News" />
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
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import TitleSection from '../TitleSection.vue'
import CardNews from '../CardNews.vue'

export default {
    name: 'Most-View-Page',
    components: {
        TitleSection,
        CardNews
    },
    data() {
        return {
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
                        format: 'News'
                    }
                })
                .then((response) => {
                    this.news = response.data.data;
                })
                .catch((error) => {
                    console.log(error);
                    this.errored = true;
                })
                .finally(() => this.loading = false)
        },
    },
    mounted() {
        this.getAllNews()
    },
}
</script>

<style scoped>

</style>