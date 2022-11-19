<template>
    <div id="carouselExampleCrossfade" class="carousel slide carousel-fade relative" data-bs-ride="carousel" :class="[colSpan ? 'col-span-3' : '']">
        <div class="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
            <button type="button" data-bs-target="#carouselExampleCrossfade" v-for="val, index in data" :key="val.id"
                v-bind:data-bs-slide-to="index" :class="[
                    index == 0 ? 'active' : ''
                ]"></button>
        </div>
        <div class="carousel-inner relative w-full overflow-hidden rounded-lg">
            <div class="carousel-item float-left w-full" v-for="val, index in data" :key="val.id" :class="[
                index == 0 ? 'active' : '',
                fromDetail ? 'max-h-96' : 'h-max'
            ]">
                <img v-if="fromDetail" :src="val.large" class="block w-full" alt=""/>
                <img v-else :src="val.image.large" class="block w-full" alt=""/>

            </div>
        </div>
        
        <button v-if="fromDetail"
            class="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
            type="button" data-bs-target="#carouselExampleCrossfade" data-bs-slide="prev">
            <span class="carousel-control-prev-icon inline-block bg-no-repeat" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button v-if="fromDetail"
            class="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
            type="button" data-bs-target="#carouselExampleCrossfade" data-bs-slide="next">
            <span class="carousel-control-next-icon inline-block bg-no-repeat" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
</template>

<script>
export default {
    name: "Carousel-Component",
    props: [
        'data',
        'fromDetail',
        'colSpan',
    ],
    data() {
        return {
            
        }
    }
}
</script>

<style scoped>

</style>