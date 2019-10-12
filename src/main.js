import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import iView from 'view-design';
import axios from 'axios';
import Vueaxios from 'vue-axios';
import 'view-design/dist/styles/iview.css';
import 'css/bi-charts-table.css'
import 'css/layout.css'
import layout from './components/common/layout'
import biCharts from 'assets/js/barOrcharts'
import echarts from "echarts"
import  tableOrcharts from 'components/tableAndcharts/index'
axios.defaults.headers.get['Auth-Token'] = 'FwBEGnh5bV7N2LpB';
Vue.config.productionTip = false;
Vue.prototype.$echarts=echarts;
Vue.prototype.$biCharts=biCharts;
Vue.use(iView);
Vue.use(Vueaxios, axios);
Vue.use(tableOrcharts);
router.beforeEach((to, from, next) => {
    let getLoginMsg=JSON.parse(localStorage.getItem('LoginMsg'));
   let currentTime=new Date().getTime();
      if(Boolean(localStorage.getItem("LoginMsg"))){
          if(getLoginMsg.lastTime>currentTime ){
             next()
              // console.log(to.path)
          }else {
             localStorage.removeItem('LoginMsg');
              next('/')
          }
      }else {
          if(to.path=='/'){
              next()
          }else {
            next('/')
          }



      }



});
Vue.component('layout',layout);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
