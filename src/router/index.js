import { createRouter, createWebHistory } from 'vue-router'
import MainComponent from '../view/Main.vue'

const routes = [
    {
        path: '/',
        component: MainComponent
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router