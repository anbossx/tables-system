import Vue from 'vue'
import Router from 'vue-router'
import commom from './common'
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: resolve => require(['../components/login.vue'], resolve),
        },
        {
            path:'/company/*',
            component:resolve=>require(['../components/common/layout.vue'],resolve)
        },
        {
            path:'/market/*',
            component:resolve=>require(['../components/common/layout.vue'],resolve)
        },
        commom


    ]
})