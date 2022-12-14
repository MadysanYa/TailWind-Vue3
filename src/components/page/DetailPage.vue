<template>
    <div>
        <TitleSection title="Preview Detail" listingType="preview-detail"/>
        <!-- Carousel Section -->
        <CarouselSection
            :data="listingDetail.gallery"
            :fromDetail="true"
            :colSpan="true"
        />
        

        <!-- Property Price Section -->
        <div class="py-5">
            <div class="grid grid-cols-3">
                <div v-if="listingDetail.is_sale">
                    <p class="mb-2 text-gray-400">Sale</p>
                    <p class="mb-2 font-semibold text-sky-400">${{ listingDetail.sale_list_price }}</p>
                </div>
                <div class="col-span-2" v-if="listingDetail.is_rent">
                    <p class="mb-2 font-normal text-gray-400">Rent</p>
                    <p class="mb-2 font-semibold text-sky-400">${{ listingDetail.rent_list_price }}</p>
                </div>
            </div>
            <div class="grid grid-cols-1">
                <p class="mb-2 font-bold text-gray-700">{{ listingDetail.type }}</p>
            </div>
            <div class="grid grid-cols-3">
                <div>
                    <p class="mb-2 font-semibold text-gray-700">{{ listingDetail.land_area }} m²</p>
                    <p class="mb-2 font-normal text-gray-400">Total Size</p>
                </div>
                <div class="border-l pl-4">
                    <p class="mb-2 font-semibold text-gray-700">${{ listingDetail.sale_list_price_per_square }}</p>
                    <p class="mb-2 font-normal text-gray-400">Sale Price / m²</p>
                </div>
                <div class="border-l pl-4">
                    <p class="mb-2 font-semibold text-gray-700">{{ listingDetail.shape_types }}</p>
                    <p class="mb-2 font-normal text-gray-400">Shape</p>
                </div>
            </div>
            <div class="flex grid-flow-row items-center">
                <img class="mb-2 mr-3" src="@/assets/icon/location.svg" alt="">
                <p class="mb-2 font-normal text-gray-700">
                    {{ listingDetail.address }}
                </p>
            </div>
            <div class="flex flex-row">
                <p class="font-normal text-gray-700">Listed on <span class="font-semibold">Z1 4 months</span></p>
                <p class="mx-2 font-normal text-gray-700">|</p>
                <p class="font-normal text-gray-700">Book <span class="font-semibold">5</span></p>
                <span class="mx-2 font-normal text-gray-700">|</span>
                <p class="font-normal text-gray-700">View <span class="font-semibold">10</span></p>
            </div>
        </div>

        <!-- Property Information Section -->
        <hr>
        <div class="py-5">
            <div class="grid grid-cols-1">
                <p class="mb-2 font-bold text-gray-700">Property Information</p>
            </div>
            
            <div class="flex items-center mb-2">
                <img class="mr-2" src="@/assets/icon/land.svg" alt="">
                <span class="font-semibold text-gray-700">Land</span>
            </div>
            <div class="grid grid-cols-3">
                <IconLabel
                    Label="Width (m)"
                    :Value="listingDetail.land_width"
                    marginBottom="true"
                />
                <IconLabel
                    Label="Length (m)"
                    :Value="listingDetail.land_length"
                    marginBottom="true"
                />
                <IconLabel
                    Label="Total (m²)"
                    :Value="listingDetail.land_area"
                    marginBottom="true"
                />
            </div>
        </div>

        <!-- Basic Information Section -->
        <hr>
        <div class="py-5">
            <div class="grid grid-cols-1">
                <p class="mb-2 font-bold text-gray-700">Basic Information</p>
            </div>
            <div class="grid grid-cols-3">
                <IconLabel
                    Label="ID"
                    iconName="id.svg"
                    :Value="listingDetail.listing_code"
                />
                <IconLabel
                    Label="Zoning"
                    iconName="zone.svg"
                    :Value="listingDetail.zoning"
                />
                <IconLabel
                    Label="Property Type"
                    iconName="land.svg"
                    :Value="listingDetail.type"
                />
                <IconLabel
                    Label="Site Position"
                    iconName="site-position.svg"
                    :Value="listingDetail.site_position"
                />
                <IconLabel
                    Label="Direction / Facing"
                    iconName="directions.svg"
                    :Value="listingDetail.facing_type"
                />
                <IconLabel
                    Label="Title Deed"
                    iconName="tile-deed.svg"
                    :Value="listingDetail.title_deed_type"
                />
                <IconLabel
                    Label="Listing Date"
                    iconName="listing-date.svg"
                    :Value="listingDetail.created_at"
                />
                <IconLabel
                    Label="Last Checked by z1"
                    iconName="check.svg"
                    :Value="listingDetail.updated_at"
                />
            </div>
        </div>
    </div>
</template>

<script>
import TitleSection from '../TitleSection.vue'
import IconLabel from '../IconLabel.vue'
import CarouselSection from '../Carousel.vue'
import axios from 'axios'

export default {
    name: 'Detail-Page',
    components: {
        TitleSection,
        IconLabel,
        CarouselSection
    },
    data() {
        return {
            listingID: this.$route.params.id,
            loading: true,
            listingDetail: {},
            baseUrl: 'https://api.z1platform.com/api/s59',
        }
    },
    methods: {
        async getDetailProperty() {
            await axios
                .get(`${this.baseUrl}/api/v2/listings/${this.listingID}`)
                .then((response) => {
                    this.listingDetail = response.data;
                })
                .catch((error) => {
                    console.log(error)
                })
                .finally(() => this.loading = false)
        },
    },
    mounted() {
        this.getDetailProperty()
    },

}
</script>

<style scoped>

</style>