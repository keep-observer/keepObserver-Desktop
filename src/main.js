 // The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'

Vue.config.productionTip = false
Vue.use(ElementUI);

router.beforeEach((to,from,next) => {
	document.title = to.meta.title;
	next();
})

var vue = new Vue({
  	el: '#app',
  	router,
  	template: '<App/>',
  	components: { App }
})

    