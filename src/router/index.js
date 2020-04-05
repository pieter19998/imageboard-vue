import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/authentication/login.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/authentication/register.vue')
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/user', component: () => import('../views/user/user'),
        children: [
            {path: 'update', name: 'userUpdate', component: () => import('../views/user/userUpdate')},
        ]
    },
    {
        path: '/board', component: () => import('../views/board/board'),
        children: [
            {path: '', name: 'boardList', component: () => import('../views/board/boardList')},
            {path: 'create', name: 'boardCreate', component: () => import('../views/board/boardCreate')},
            {path: 'update/:id', name: 'boardUpdate', component: () => import('../views/board/boardUpdate')},
            {path: ':id', name: 'boardView', component: () => import('../views/board/boardDetail')}
        ]
    },
    {
        path: '/thread', component: () => import('../views/thread/thread'),
        children: [
            {path: ':id', name: 'threadView', component: () => import('../views/thread/threadDetail')},
            {path: 'create/:board', name: 'threadCreate', component: () => import('../views/thread/threadCreate')},
            {path: 'update/:id', name: 'threadUpdate', component: () => import('../views/thread/threadUpdate')},
        ]
    },
    {
        path: '/comment', component: () => import('../views/thread/thread'),
        children: [
            {path: ':id', name: 'commentView', component: () => import('../views/thread/threadDetail')},
            {path: 'create/:thread', name: 'commentCreate', component: () => import('../views/comment/commentCreate')},
            {path: 'update/:id', name: 'commentUpdate', component: () => import('../views/comment/commentUpdate')},
        ]
    }
];

const router = new VueRouter({
    routes
});

export default router
