<script setup>
import { computed, onMounted } from "vue"
import { useStore } from "vuex"

const store = useStore()
const projects = computed(() => store.getters["projects/getProjects"])

onMounted(() => store.dispatch('projects/loadProjectsManifest'))

// onBeforeUnmount(() => {
// 	eventBus.off("#UpdateProjects", updateProjects)
// })

// function updateProjects() {
// 	let projects = todoService.loadProjectsManifest()
// 	_projects.value = projects.list
// }

</script>

<template>
	<section class="w3-blue ">
		<h4 class="w3-row-padding">Projects</h4>

		<RouterLink :to="{ name: 'home' }" class="w3-padding" active-class="w3-yellow">
			Home
		</RouterLink>

		<!-- Projecs -->
		<div v-for="project in projects" :key="project.id">
			<RouterLink :to="{ name: 'project', params: { id: project.id } }" active-class="w3-yellow" class="w3-padding">
				{{ project.name }}
			</RouterLink>
		</div>

	</section>
</template>

<style scoped> a {
 	text-decoration: none;
 	display: block;
 	padding: 4px;
 }
</style>