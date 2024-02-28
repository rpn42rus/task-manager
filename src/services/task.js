const service = {
	/**
	 * Создает task по умолчанию с уникальным идентификатором, пустым текстом и состоянием, установленным на 'not_started'.
	 * @returns {Object} task по умолчанию.
	 */
	getDefault() {
		return {
			id:
				Date.now().toString(16) +
				'_' +
				Math.ceil(Math.random() * 1000).toString(16),
			text: '',
			status: 'not_started',
		}
	},
	/**
	 * Возвращает массив объектов состояния с их идентификаторами и лейблами.
	 * @returns {Array} Список статусов.
	 */
	getStatusList() {
		return [
			{ id: 'not_started', label: 'Not started' },
			{ id: 'in_progress', label: 'In progress' },
			{ id: 'completed', label: 'Completed' },
		]
	},
	/**
	 * Создание глубокой копии элемента task с использованием сериализации и десериализации JSON
	 * @param {Object} item - Task, который нужно скопировать
	 * @returns {Object} Копия task.
	 */
	makeCopy(item) {
		return JSON.parse(JSON.stringify(item))
	},
}

export default service
