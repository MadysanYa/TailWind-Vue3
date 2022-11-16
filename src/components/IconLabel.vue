<template>
    <div class="flex items-center">
        <div class="mr-3 mb-5" v-if="iconName">
            <img v-if="iconName" class="ml-1" :src="getImgUrl()" :alt="iconName">
        </div>
        <div>
            <p class="mb-2 font-normal text-gray-400">{{ Label }}</p>
            <p class="font-normal text-gray-700" :class="[marginBottom ? 'mb-2' : 'mb-5']">{{ Value }}</p>
        </div>
    </div>
</template>
 
<script>
export default {
    name: 'Icon-Label',
    props: [
        'iconName',
        'Label',
        'Value',
        'marginBottom',
    ],
    methods: {
        getImgUrl() {
            return require('../assets/icon/'+this.iconName)
        }
    }
}
</script>

<style scoped>

</style>