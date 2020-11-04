const getters ={
    todosCompleted(state){
       	return state.todoList.filter(todo => todo.isComplete)
    },
		
		todosUnCompleted(state){
		   	return state.todoList.filter(todo => !todo.isComplete)
		}
}
export default getters;