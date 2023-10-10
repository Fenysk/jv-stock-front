import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import('./views/HomeView.vue'),
    },
    {
        path: '/games',
        name: 'Games',
        component: () => import('./views/GamesView.vue'),
    },
    {
        path: '/games/add',
        name: 'AddGame',
        component: () => import('./views/Games/GameAddView.vue'),
    },
    {
        path: '/games/edit/:id',
        name: 'EditGame',
        component: () => import('./views/Games/GameEditView.vue'),
    },
    {
        path: '/purchases',
        name: 'Purchases',
        component: () => import('./views/PurchasesView.vue'),
    },
    {
        path: '/purchases/add/:id?',
        name: 'AddPurchase',
        component: () => import('./views/Purchases/PurchaseAddView.vue'),
    },
    {
        path: '/purchases/edit/:id',
        name: 'EditPurchase',
        component: () => import('./views/Purchases/PurchaseEditView.vue'),
    },
    {
        path: '/sales',
        name: 'Sales',
        component: () => import('./views/SalesView.vue'),
    },
    {
        path: '/sales/add/:id',
        name: 'AddSale',
        component: () => import('./views/Sales/SaleAddView.vue'),
    },
    {
        path: '/sales/edit/:id',
        name: 'EditSale',
        component: () => import('./views/Sales/SaleEditView.vue'),
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;