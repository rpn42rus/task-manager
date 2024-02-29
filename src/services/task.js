const service = {
	/**
	 * Получение задачи по умолчанию с уникальным идентификатором, пустым текстом и статусом
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
	 * Получения списка статусов задач
	 */
	getStatusList() {
		return [
			{ id: 'not_started', label: 'Не начата' },
			{ id: 'in_progress', label: 'В процессе' },
			{ id: 'completed', label: 'Завершена' },
		]
	},
	/**
	 * Создание глубокой копии элемента задачи
	 */
	makeCopy(item) {
		return JSON.parse(JSON.stringify(item))
	},
	/**
	 * Переключение статуса задачи в зависимости от состояния
	 */
	toggleStatus(status) {
		switch (status) {
			case 'not_started':
				return 'in_progress'
			case 'in_progress':
				return 'completed'
			case 'completed':
				return 'not_started'
		}
	},
}

export default service
