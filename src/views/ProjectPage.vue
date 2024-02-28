<script setup>
import { inject, onMounted, ref, watch } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"

const

	store = useStore(),
	$router = useRouter(),
	$props = defineProps(["id"]),
	$modals = inject("$modals"),
	_project_name = ref(""),
	_items = ref([])

onMounted(loadProject)

watch(() => $props.id, loadProject)

function loadProject() {
	_project_name.value = store.getters["projects/getProjectName"]($props.id)
	_items.value = store.dispatch("projects/loadProject", $props.id)
}

function deleteProject() {
	$modals.show("deleteProject").then(() => {
		store.dispatch('projects/deleteProject', $props.id)
		$router.push({ name: "home" })
	}, () => { })
}

</script>

<template>
	<div class="project-container">
		<div class="header-container">
			<h1>{{ _project_name }}</h1>
			<button @click="deleteProject()">Delete project</button>
		</div>
	</div>

	<Modal name="deleteProject" title="Delete the Project">
		<h3>Подтверждение удаления</h3>
		<p class="w3-pale-red w3-text-red w3-padding">Подтвердите удаление проекта.</p>
	</Modal>
</template>

<style scoped>
.header-container {
	display: flex;
	justify-content: space-between;
	align-content: center;
	align-items: center;
}

.project-container {
	max-width: 56rem;
	padding: 1rem;
	margin: 0 auto;
}
</style>
