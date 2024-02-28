const state = () => ({
	projects: [],
})
// getters
const getters = {
	getProjects: state => state.projects,
}
// actions
const actions = {
	loadProjectsManifest({ commit }) {
		let projects = localStorage.getItem('projects')

		if (!projects) {
			projects = { next_id: 0, list: [] }
		} else {
			projects = JSON.parse(projects)
		}
		return projects
	},

	async updateProjects({ commit }) {
		const projects = await dispatch('loadProjectsManifest')
		commit('SET_PROJECTS', projects.list)
	},
}
// mutations
const mutations = {
	SET_PROJECTS(state, projects) {
		state.projects = projects
	},
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
}
