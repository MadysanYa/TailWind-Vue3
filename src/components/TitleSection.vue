<template>
    <div class="py-5 flex justify-between">
        <p class="font-bold">{{ title }}</p>
        <p class="font-normal flex text-sky-400" v-if="isSeeMore">
            {{ label ?? 'See More'  }}
            <img  class="ml-1" src="@/assets/icon/arrow-right-circle.svg" alt="">
        </p>
    </div>
</template>

<script>
    export default {
        name: 'Title-Section',
        props: [
            'title',
            'label',
            'isSeeMore'
        ],
        data() {
            return {
            }
        },
    }
</script>

<style lang="stylus" scoped>

</style>