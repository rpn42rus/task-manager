<script setup>
import { inject, ref } from "vue"
import { useStore } from "vuex"

const
	store = useStore(),
	$modals = inject("$modals"),
	_project_name = ref("")

async function newProject() {
	_project_name.value = ""
	try {
		await $modals.show("#NewProject")
		if (_project_name.value !== "") {
			await store.dispatch("projects/createProject", _project_name.value)
			// await store.dispatch("projects/loadProjectsManifest");
		}
	} catch (error) {
		console.error(error)
	}
}
</script>

<template>
	<div class="landing-wrapper">
		<h1 class="w3-bottombar">
			<i class="fa-solid fa-list-check w3-text-purple"></i>
			Home Page
		</h1>
		<p>
			Вы можете создать новый проект или выбрать его из боковой панели.
		</p>
		<button @click="newProject()">
			Создать проект
		</button>

		<!-- Modals -->
		<Modal name="#NewProject" title="Новый проект">
			<strong>Имя</strong>
			<input type="text" class="w3-input w3-border" placeholder="Введите имя проекта..." v-model="_project_name">
		</Modal>
	</div>
</template>

<style scoped>
.landing-wrapper {
	padding: 10rem;
	margin: 0 auto;
	min-width: 40rem;
	max-width: 60rem;
}
</style>