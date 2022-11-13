<template>
    <div>
        <div class="max-w-sm bg-white rounded-lg">
            <router-link :to="{ name: routeName, params: { id: paramId } }">
                <div class="bg-center w-full bg-cover h-36 rounded-t-lg relative"
                    :style="{ backgroundImage: 'url(' + proImage + ')' }">
                    <span class="bg-gray-100 font-light px-2 rounded-sm absolute bottom-4 left-4 text-sm">{{ proAddress
                    }}</span>
                    <span class="bg-black text-white font-medium px-2 rounded-sm absolute top-4 left-4 text-sm">
                        {{ dayFormat(new Date(createdDate)) }}
                        <span v-if="view > 1">| {{ view }} Views</span>
                        <span v-else>| {{ view }} View</span>
                    </span>
                </div>
                <div class="p-5">
                    <div class="flex">
                        <div class="mr-5" v-if="isSale">
                            <p class="mb-1 font-normal text-gray-400">{{ saleTitle }}</p>
                            <p class="mb-1 font-semibold text-sky-400">${{ salePrice ?? 0 }}</p>
                        </div>
                        <div class="ml-5" v-if="isRent">
                            <p class="mb-1 font-normal text-gray-400">{{ rentTitle }}</p>
                            <p class="mb-1 font-semibold text-sky-400">{{ rentPrice ?? 0 }} / month</p>
                        </div>
                    </div>
                    <p class="mb-1 font-semibold text-gray-700">{{ proType }}</p>
                    <div class="flex">
                        <p class="mb-1 font-normal text-gray-700">{{ landArea }} m²</p>
                        <span class="mx-2 text-gray-400">|</span>
                        <p class="mb-1 font-normal text-gray-400">Sale: ${{ perMeter }} / m²</p>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Card-Item',
    props: [
        'saleTitle',
        'salePrice',
        'isSale',
        'rentTitle',
        'rentPrice',
        'isRent',
        'proType',
        'proImage',
        'proAddress',
        'landArea',
        'perMeter',
        'createdDate',
        'view',
        'routeName',
        'paramId'
    ],
    data() {
        return {
            sale: 'Sale',
            rent: 'Rent',
            viewLabel: 'View'
        }
    },
    methods: {
        dayFormat(date) {
            var seconds = Math.floor((new Date() - date) / 1000);
            var interval = seconds / 31536000;

            if (interval > 1) {
                return Math.floor(interval) + " years";
            }
            interval = seconds / 2592000;
            if (interval > 1) {
                return Math.floor(interval) + " months";
            }
            interval = seconds / 86400;
            if (interval > 1) {
                return Math.floor(interval) + " days";
            }
            interval = seconds / 3600;
            if (interval > 1) {
                return Math.floor(interval) + " hours";
            }
            interval = seconds / 60;
            if (interval > 1) {
                return Math.floor(interval) + " minutes";
            }
            return Math.floor(seconds) + " seconds";
        }
    },
    mounted() {

    },
}
</script>

<style scoped>

</style>