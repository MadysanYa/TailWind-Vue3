<template>
    <nav class="bg-gray-800 sticky top-0">
        <div class="mx-auto px-2 sm:px-6 lg:px-8">
            <div class="relative flex h-16 items-center justify-between">
                <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    <!-- Mobile menu button-->
                    <button type="button" class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                    <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    </button>
                </div>
                <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <div class="flex flex-shrink-0 items-center">
                        
                        <div v-if="loading">
                            <SkeletonLogo/>
                        </div>
                        <div v-else>
                            <img class="block h-8 w-auto lg:hidden" v-bind:src="logo" alt="Your Company">
                            <img class="hidden h-8 w-auto lg:block" v-bind:src="logo" alt="Your Company">
                        </div>
                    </div>
                    <div class="hidden sm:ml-6 sm:block">
                        <div class="flex space-x-4">
                            <router-link :to="{name: 'Home'}" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</router-link>
                            <router-link :to="{name: 'BuySale'}" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" :class="[$route.name == 'BuySaleShow' ? 'bg-gray-900' : '']">Buy/Sell</router-link>
                            <router-link :to="{name: 'IndicationPlus'}" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Indication Plus</router-link>
                            <router-link :to="{name: 'News'}" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">News</router-link>
                        </div>
                    </div>
                </div>
                <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <button type="button" class="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span class="sr-only">View notifications</span>
                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                    </svg>
                    </button>

                    <!-- Profile dropdown -->
                    <div class="relative ml-3">
                        <div>
                            <button type="button" class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                            <span class="sr-only">Open user menu</span>
                            <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>    
    </nav>
</template>

<script>
    import axios from 'axios'
    import SkeletonLogo from './loading/SkeletonLogo.vue'

    export default {
        name: 'Header-Section',
        components: {
            SkeletonLogo
        },
        data() {
            return {
                loading: true,
                logo: '',
                baseUrl: 'https://api.z1platform.com/api/s59',
            }
        },
        methods: {
            async getLogo() {
                await axios
                    .get(`${this.baseUrl}/api/v2/settings/setting`)
                    .then((response) => {
                        return this.logo = response.data.z1_logo_home_screen
                    })
                    .catch((error) => {
                        console.log(error);
                        this.errored = true;
                    })
                    .finally(() => this.loading = false);
            },
        },
        mounted() {
            this.getLogo()
        },
    }
</script>

<style scoped>
    
</style>