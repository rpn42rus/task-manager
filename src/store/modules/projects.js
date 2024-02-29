const state = () => ({
	projects: [],
	next_id: 0,
})

const getters = {
	/**
	 * Получить проекты
	 */
	getProjects: state => state.projects,
	/**
	 * Получить имя проекта
	 */
	getProjectName: state => project_id => {
		const project = state.projects.find(p => p.id == project_id)
		return project ? project.name : ''
	},
}

const actions = {
	/**
	 * Загрузить проекты из локального хранилища
	 */
	loadProjects({ commit }) {
		let projects = JSON.parse(localStorage.getItem('projects')) || {
			next_id: 0,
			list: [],
		}
		commit('SET_PROJECTS', projects.list)
		commit('SET_NEXT_ID', projects.next_id)
	},
	/**
	 * Создать проект
	 */
	createProject({ commit }, name = '') {
		commit('CREATE_PROJECT', name)
	},
	/**
	 * Удалить проект
	 */
	deleteProject({ commit }, project_id) {
		commit('DELETE_PROJECT', project_id)
	},
	/**
	 * Загрузить проект из локального хранилища
	 */
	loadProject({ commit }, project_id) {
		return JSON.parse(localStorage.getItem(`project.${project_id}`))
	},
	/**
	 * Сохранить проект в локальное хранилище
	 */
	saveProject({ commit }, data) {
		localStorage.setItem(`project.${data.id}`, JSON.stringify(data.items))
	},
}

const mutations = {
	SET_PROJECTS(state, projects) {
		state.projects = projects
	},

	SET_NEXT_ID(state, next_id) {
		state.next_id = next_id
	},

	CREATE_PROJECT(state, name) {
		let project_id = state.next_id
		state.next_id++
		state.projects.push({ id: project_id, name })
		localStorage.setItem(
			'projects',
			JSON.stringify({ next_id: state.next_id, list: state.projects })
		)
		localStorage.setItem(`project.${project_id}`, '[]')
	},

	DELETE_PROJECT(state, project_id) {
		const projectIndex = state.projects.findIndex(p => p.id == project_id)
		if (projectIndex > -1) {
			state.projects.splice(projectIndex, 1)
			localStorage.setItem(
				'projects',
				JSON.stringify({ next_id: state.next_id, list: state.projects })
			)
			localStorage.removeItem(`project.${project_id}`)
		}
	},
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
}
