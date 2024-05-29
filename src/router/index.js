import { createRouter, createWebHistory } from 'vue-router';
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
import AtmPanel from "@/components/atm/views/AtmPanel.vue";
import AllTransactions from "../components/pages/AllTransactions.vue";
import { useAuthStore } from '@/stores/authStore';

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
    { path: '/transferfunds', component: TransferFunds },
    { path: '/alltransactions', component: AllTransactions },
    { path: '/register', component: Register },
    { path: '/atm', component: AtmPanel }, // Added ATM panel route
    { path: '/:catchAll(.*)', redirect: '/404' } // Redirect unknown routes to 404
  ]
});

router.beforeEach((to, from, next) => {
  const store = useAuthStore();
  const isLoggedIn = store.isLoggedIn;
  const userRole = store.role || localStorage.getItem('role');

  if (isLoggedIn && userRole === 'ATM' && to.path !== '/atm') {
    next('/atm'); // Redirect to /atm if logged in as ATM and trying to access other routes
  } else {
    next();
  }
});

export default router;
