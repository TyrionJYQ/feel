const getters = {
	todosCompleted(state) {
		debugger
		return state.todoList.filter(todo => todo.isComplete)
	},

	todosUnCompleted(state) {
		debugger
		return state.todoList.filter(todo => !todo.isComplete)
	}
}
export default getters;
