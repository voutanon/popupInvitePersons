import { createApp } from 'vue'
import App from './App.vue'
import { vfmPlugin } from 'vue-final-modal'
import VueClickAway from "vue3-click-away";

createApp(App)
  .use(vfmPlugin())
  .use(VueClickAway)
  .mount('#app')
