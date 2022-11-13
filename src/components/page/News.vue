<template>
    <div>
        <div v-if="errored">
            Error
        </div>
        <div v-else>
            <TitleSection title="All News" />
            <div class="grid grid-cols-4 gap-4">

                <div class="max-w-sm bg-white rounded-lg" v-for="value in news" :key="value.id">
                    <div class="bg-center w-full bg-cover h-36 rounded-t-lg relative">
                        <img :src="value.slug" alt="">
                    </div>
                    <div class="p-5">
                        <div class="flex">
                            <p class="mb-1 font-normal text-gray-400"></p>
                            <p class="mb-1 font-semibold text-sky-400"></p>
                        </div>
                        <p class="mb-1 font-semibold text-gray-700">{{ value.title.rendered }}</p>
                        <div class="flex">
                            <p class="mb-1 font-normal text-gray-700">{{ value.modified }}</p>
                            <span class="mx-2 text-gray-400">|</span>
                            <p class="mb-1 font-normal text-sky-400">
                                <a v-bind:href="value.link" target="_blank">Z1 News</a>
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import TitleSection from '../TitleSection.vue'
// import CardSection from '../Card.vue'

export default {
    name: 'Most-View-Page',
    components: {
        TitleSection,
    },
    data() {
        return {
            errored: false,
            loading: true,
            news: [],
            baseUrl: 'https://z1news.net/wp-json/wp/v2/posts',
        }
    },
    methods: {
        async getAllNews() {
            await axios
                .get(this.baseUrl, {
                    params: {
                        categories: 204
                    }
                })
                .then((response) => {
                    this.news = response.data;
                    console.log(response);
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