<script setup>
import TaskFilter from "@components/tasks/TaskFilter.vue"
import TaskItemForm from "@components/tasks/TaskItemForm.vue"
import TaskList from "@components/tasks/TaskList.vue"
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
	_filter = ref(""),
	_project_name = ref(""),
	_item = ref(taskService.getDefault()),
	_items = ref([])

onMounted(loadProject)

watch(() => $props.id, loadProject)

async function loadProject() {
	_project_name.value = store.getters["projects/getProjectName"]($props.id)
	_items.value = await store.dispatch("projects/loadProject", $props.id) || []
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
		console.log('new_item', new_item)
		console.log('_items.value', _items.value)
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

function toggleStatus(item) {
	item.status = taskService.toggleStatus(item.status)
	saveProject()
}

function saveProject() {
	store.dispatch("projects/saveProject", { id: $props.id, items: _items.value })
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

function deleteItem(item) {
	$modals.show("deleteItem").then(() => {
		let index = getIndex(item)
		if (index >= 0) {
			_items.value.splice(index, 1)
			saveProject()
		}
	}, () => { })
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
		<!-- Todo list -->
		<TaskList v-model="_items" :filter="_filter" @toggle="toggleStatus" @edit="showModal(false, $event)"
			@delete="deleteItem">
			<button @click="showModal(true)" class="w3-button w3-blue w3-round-xxlarge">
				<i class="fa-solid fa-square-plus"></i>
				New item
			</button>
		</TaskList>
	</div>

	<!-- Modals -->
	<Modal name="deleteProject" title="Delete the Project">
		<h3>Подтверждение удаления</h3>
		<p class="w3-pale-red w3-text-red w3-padding">Подтвердите удаление проекта.</p>
	</Modal>

	<Modal name="newEditItem" title="To Do Item">
		<TaskItemForm v-model="_item"></TaskItemForm>
	</Modal>

	<Modal name="deleteItem" title="Delete To-Do Item">
		<p>
			This action will delete the item:<br>
			<strong>{{ _item.text }}</strong>
		</p>
		<p class="w3-text-red w3-pale-red">
			This action cannot be undone.
		</p>
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
