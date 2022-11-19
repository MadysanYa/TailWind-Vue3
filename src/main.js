import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import Route from './route/index.js'
import InfiniteLoading from "v3-infinite-loading"
import "v3-infinite-loading/lib/style.css"

createApp(App)
    .use(InfiniteLoading)
    .use(Route)
    .mount('#app')
