import { createApp } from 'vue'
import App from './App.vue'
import Modals from './plugins/modals'
import router from './router'
import store from './store'

createApp(App).use(router).use(store).use(Modals).mount('#app')