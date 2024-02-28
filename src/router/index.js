import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [],
	router = createRouter({
		history: createWebHashHistory(),
		routes,
		scrollBehavior(to, from, savedPosition) {
			return { top: 0 }
		},
	})

export default router
