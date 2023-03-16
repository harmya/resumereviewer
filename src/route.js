import HomePage from './components/HomePage';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import ResResult from './components/ResResult';

import {createRouter, createWebHistory} from 'vue-router';

const routes = [
    {
        name: 'login',
        component: LogIn,
        path: '/',
        meta: {
            transition: 'fade'
        }

    },
    {
        name: 'home',
        component: HomePage,
        path: '/home',
        meta: {
            transition: 'fade'
        }
    },
    {
        name: 'signup',
        component: SignUp,
        path: '/signup',
        meta: {
            transition: 'fade'
        }
    },
    {
        name: 'resresult',
        component: ResResult,
        path: '/result',
        meta: {
            transition: 'fade'
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});



export default router;




