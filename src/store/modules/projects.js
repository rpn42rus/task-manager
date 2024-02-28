const state = () => ({
  projects: [],
  next_id: 0,
	current_project: {}
});

const getters = {
  getProjects: state => state.projects,

	getProjectName: (state) => (project_id) => {
    const project = state.projects.find(p => p.id == project_id);
    return project ? project.name : '';
  },
};

const actions = {
  loadProjectsManifest({ commit }) {
    let projects = JSON.parse(localStorage.getItem('projects')) || { next_id: 0, list: [] };
    commit('SET_PROJECTS', projects.list);
    commit('SET_NEXT_ID', projects.next_id);
  },

  updateProjects({ commit }) {
    commit('loadProjectsManifest');
  },

  createProject({ commit }, name = '') {
    commit('CREATE_PROJECT', name);
  },

	loadProject({ commit }, project_id) {
    const projectData = JSON.parse(localStorage.getItem(`project.${project_id}`));
    commit('SET_PROJECT', projectData);
  },

	deleteProject({ commit }, project_id) {
    commit('DELETE_PROJECT', project_id);
  },
};

const mutations = {
  SET_PROJECTS(state, projects) {
    state.projects = projects;
  },

	SET_PROJECT(state, projectData) {
    state.current_project = projectData;
  },

  SET_NEXT_ID(state, next_id) {
    state.next_id = next_id;
  },

  CREATE_PROJECT(state, name) {
    let project_id = state.next_id;
    state.next_id++;
    state.projects.push({ id: project_id, name });
    localStorage.setItem('projects', JSON.stringify({ next_id: state.next_id, list: state.projects }));
    localStorage.setItem(`project.${project_id}`, '[]');
  },

	DELETE_PROJECT(state, project_id) {
    const projectIndex = state.projects.findIndex(p => p.id == project_id);
    if (projectIndex > -1) {
      state.projects.splice(projectIndex, 1);
      localStorage.setItem('projects', JSON.stringify({ next_id: state.next_id, list: state.projects }));
      localStorage.removeItem(`project.${project_id}`);
    }
  },
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
}
