import { createStore } from 'vuex'
import projects from './modules/projects'
import tasks from './modules/tasks'

export default createStore({
  modules: {
    projects,
    tasks
  },
})
