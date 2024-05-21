import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/pages/Home.vue';
import PageNotFound from "@/components/pages/PageNotFound.vue";
import ProductList from '../components/products/ProductList.vue';
import CreateProduct from '../components/products/CreateProduct.vue';
import EditProduct from '../components/products/EditProduct.vue';
import Register from '../components/pages/Register.vue';
import Login from '../components/pages/Login.vue';
import TransferFunds from '../components/pages/TransferFunds.vue';
import EmployeePanelPage from "../components/pages/EmployeePanelPage.vue";
import CustomerPanelPage from "@/components/pages/CustomerPanelPage.vue";
import AllTransactions from "../components/pages/AllTransactions.vue"


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/404', component: PageNotFound },
    { path: '/products', component: ProductList },
    { path: '/login', component: Login },
    { path: '/createproduct', component: CreateProduct },
    { path: '/editproduct/:id', component: EditProduct, props: true },
    { path: '/employeepanel', component: EmployeePanelPage },
    { path: '/customerpanel/:id', component: CustomerPanelPage, props: true },
    { path: '/register', component: Register },
    { path: '/transferfunds', component: TransferFunds },
    {path: '/alltransactions', component: AllTransactions},
  ]
})

export default router
