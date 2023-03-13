import { createApp } from 'vue'
import { VuePageTransition } from 'vue-page-transition'
import App from './App.vue'
import router from './route'

createApp(App).use(router).use(VuePageTransition).mount('#app')
