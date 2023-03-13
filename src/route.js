import HomePage from './components/HomePage';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import {createRouter, createWebHistory} from 'vue-router';

const routes = [
    {
        name: 'login',
        component: LogIn,
        path: '/'
    },
    {
        name: 'home',
        component: HomePage,
        path: '/home'
    },
    {
        name: 'signup',
        component: SignUp,
        path: '/signup'
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;




