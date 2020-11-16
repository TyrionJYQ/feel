const getters = {
	listTodos(state) {
		return state.todoList.filter(todo => todo.list && todo.list._id === state.list._id)
	}
}
export default getters;
