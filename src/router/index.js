import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'

const routes = [
	{
		path: '/',
		name: 'home',
		component: HomePage,
	},
	{
		path: '/project/:id',
		name: 'project',
		component: () => import('../views/ProjectPage.vue'),
		props: true,
	},
],
	router = createRouter({
		history: createWebHashHistory(),
		routes,
		scrollBehavior(to, from, savedPosition) {
			return { top: 0 }
		},
	})

export default router
