import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
// import 'vant/lib/index.css'
import 'vant/lib/index.less'
import 'amfe-flexible'
import './styles/reset.less'
import { Lazyload } from 'vant';
import './styles/iconfont/iconfont.css'
import SearchCity from '@/components/SearchCity'
Vue.component(SearchCity.name, SearchCity)
Vue.use(Lazyload);
Vue.use(Vant)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
