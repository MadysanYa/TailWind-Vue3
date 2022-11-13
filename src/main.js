import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import Route from './route/index.js'

createApp(App)
    .use(Route)
    .mount('#app')
