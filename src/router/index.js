import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/pages/Home.vue';
import PageNotFound from "@/components/pages/PageNotFound.vue";
import ProductList from '../components/products/ProductList.vue';
import CreateProduct from '../components/products/CreateProduct.vue';
import EditProduct from '../components/products/EditProduct.vue';
import Register from '../components/pages/Register.vue';
import Login from '../components/pages/Login.vue';
import EmployeePanelPage from "../components/pages/EmployeePanelPage.vue";
import CustomerPanelPage from "@/components/pages/CustomerPanelPage.vue";
import AtmPanel from "@/components/atm/views/AtmPanel.vue";
import TransactionMenu from "@/components/atm/components/TransactionMenu.vue"; 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/404', component: PageNotFound },
    { path: '/products', component: ProductList },
    { path: '/login', component: Login },
    { path: '/createproduct', component: CreateProduct },
    { path: '/editproduct/:id', component: EditProduct, props: true, meta: { requiresAuth: true, role: 'Employee' } },
    { path: '/employeepanel', component: EmployeePanelPage, meta: { requiresAuth: true, role: 'Employee' } },
    { path: '/customerpanel/:id', component: CustomerPanelPage, props: true, meta: { requiresAuth: true, role: 'Customer' } },
    { path: '/register', component: Register },
    { path: '/atm', component: AtmPanel }, // Added ATM panel route
    { path: '/:catchAll(.*)', redirect: '/404' } // Redirect unknown routes to 404
  ]
})

export default router
