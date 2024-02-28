<script setup>
import TaskFilter from "@components/tasks/TaskFilter.vue"
import TaskSummary from "@components/tasks/TaskSummary.vue"
import { inject, onMounted, ref, watch } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import taskService from "../services/task"

const
	store = useStore(),
	$router = useRouter(),
	$props = defineProps(["id"]),
	$modals = inject("$modals"),
	_project_name = ref(""),
	_item = ref(taskService.getDefault()),
	_items = ref([])

onMounted(loadProject)

watch(() => $props.id, loadProject)

async function loadProject() {
	_project_name.value = await store.getters["projects/getProjectName"]($props.id)
	_items.value = await store.dispatch("projects/loadProject", $props.id)
}

function deleteProject() {
	$modals.show("deleteProject").then(() => {
		store.dispatch('projects/deleteProject', $props.id)
		$router.push({ name: "home" })
	}, () => { })
}

function showModal(new_item = true, item = {}) {
	if (new_item) {
		_item.value = taskService.getDefault()
	} else {
		_item.value = taskService.makeCopy(item)
	}

	$modals.show("newEditItem").then(() => {
		if (new_item) {
			_items.value.push(_item.value)
		} else {
			let index = getIndex(item)
			if (index >= 0) {
				_items.value[index] = _item.value
			} else {
				alert("Error updating the item")
			}
		}
		saveProject()
	}, () => { })
}

function saveProject() {
	taskService.saveProject($props.id, _items.value)
}

function getIndex(item) {
	let index = _items.value.findIndex(it => {
		return it.id == item.id
	})
	if (index == -1) {
		return false
	} else {
		return index
	}
}

</script>

<template>
	<div class="project-container">
		<!-- Project name -->
		<div class="header-container">
			<h1>{{ _project_name }}</h1>
			<button @click="deleteProject()">Удалить проект</button>
		</div>
		<!-- Summary -->
		<TaskSummary :items="_items" class="w3-margin-bottom"></TaskSummary>
		<!-- Filter bar -->
		<div class="w3-margin-bottom">
			<TaskFilter v-model="_filter" class="flex-grow"></TaskFilter>
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
