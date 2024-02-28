import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Modals from './plugins/modals'
import styles from './assets/styles.css'

createApp(App).use(router).use(Modals).mount('#app')