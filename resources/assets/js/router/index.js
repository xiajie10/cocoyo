import Vue from 'vue';
import iView from 'iview';
import Util from '../libs/util';
import VueRouter from 'vue-router';
import Cookies from 'js-cookie';
import {routers, otherRouter, appRouter} from './router';

Vue.use(VueRouter);

const RouterConfig = {
    // mode: 'history',
    routes: routers
};

export const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();

    // if (!Cookies.get('user') && to.name !== 'login') { // 判断是否已经登录且前往的页面不是登录页
    //     next({
    //         name: 'login'
    //     });
    // } else if (Cookies.get('user') && to.name === 'login') { // 判断是否已经登录且前往的是登录页
    //     next({
    //         name: 'home_index'
    //     });
    // }
    Util.toDefaultPage([otherRouter, ...appRouter], to.name, router, next);
});

router.afterEach((to) => {
    console.log(to.name)
    Util.openNewPage(router.app, to.name, to.params, to.query);
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});