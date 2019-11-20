import charts from './bicharts.vue'
import biRadio from './biRadio.vue'
import biBar from './biBar.vue'
export default {
    install:function (Vue) {
        Vue.component('biCharts',charts);
        Vue.component('biRadio',biRadio);
        Vue.component('biBar',biBar)
    }
};

