<script setup>
import { inject, onMounted, ref } from "vue"
import { useStore } from "vuex"

const
	store = useStore(),
	$modals = inject("$modals"),
	_project_name = ref("")

onMounted(() => {
	console.log('store', store)
})

function newProject() {
	_project_name.value = ""
}
</script>

<template>
	<div class="landing-wrapper">
		<h1 class="w3-bottombar">
			<i class="fa-solid fa-list-check w3-text-purple"></i>
			Landing page
		</h1>
		<p>
			You can create a new project or select one from the sidebar.
		</p>
		<p>
			This route was defined as static in our router.
		</p>
		<button @click="newProject()">
			New project
		</button>

		<!-- Modals -->
		<Modal name="#NewProject" title="Новый проект">
			<strong>Name</strong>
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