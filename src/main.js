import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import App from './App.vue'
import Combo from './Combo.vue'
import Checkbox from './Checkbox.vue'
import Checkbox2 from './Checkbox2.vue'
import FileUpload from './FileUpload.vue'
import Grid from './Grid.vue'
import MacroTagGrid from './MacroTagGrid.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

Vue.use(BootstrapVue)
Vue.component('app-combo', Combo)
Vue.component('app-checkbox', Checkbox)
Vue.component('app-checkbox2', Checkbox2)
Vue.component('app-file-upload', FileUpload)
Vue.component('app-grid', Grid)
Vue.component('macro-tag-grid', MacroTagGrid)


new Vue({
  el: '#app',
  render: h => h(App)
})


