import charts from './bicharts.vue'
import biRadio from './biRadio.vue'
export default {
    install:function (Vue) {
        Vue.component('biCharts',charts);
        Vue.component('biRadio',biRadio);
    }
};

