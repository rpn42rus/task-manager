<script setup>
import { onMounted, ref, watch } from "vue"
import { useStore } from "vuex"

const $props = defineProps(["id"]),
	store = useStore(),
	_project_name = ref(""),
	_items = ref([])

onMounted(loadProject)

watch(() => $props.id, loadProject)

function loadProject() {
	_project_name.value = store.getters["projects/getProjectName"]($props.id)
	_items.value = store.dispatch("projects/loadProject", $props.id)
}

</script>

<template>
	<div class="project-container">
		<div class="header-container">
			<h1>{{ _project_name }}</h1>
		</div>
	</div>
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
