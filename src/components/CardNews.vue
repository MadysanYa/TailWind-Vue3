<template>
    <div class="flex justify-center h-60">
        <div class="flex flex-col md:flex-row rounded-lg bg-white">
            <img class="w-full h-60 object-cover rounded-t-lg md:rounded-none md:rounded-l-lg"
                :src="newsImage" alt="" />
            <div class="p-6 flex flex-col justify-start relative">
                <h5 class="text-gray-700 font-medium mb-2 line-clamp-2">{{ newsTitle }}</h5>
                <p class="text-gray-400 text-base mb-4 line-clamp-4">{{ newsDescription }}</p>
                <div class="flex items-center absolute bottom-6 left-6">
                    <span class="text-gray-400 text-xs">{{ newsUpdateDate }}</span>
                    <span class="mx-2 text-gray-400">|</span>
                    <p class="text-sky-400 text-xs">
                        <a v-bind:href="newsLink" target="_blank">Z1 News</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Card-Item',
    props: [
        'routeName',
        'paramId',
        'newsImage',
        'newsTitle',
        'newsDescription',
        'newsUpdateDate',
        'newsLink',
    ],
    data() {
        return {

        }
    },
    computed: {
        
    }
}
</script>

<style scoped>

</style>