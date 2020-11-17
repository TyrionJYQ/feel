import * as types from './mutation-types'

export default {
	// 设置openId
	[types.SET_OPEN_ID](state, openid) {
		state.openid = openid
	},
	// 设置新增页面按钮状态
	// 0: 新增 1: 编辑 2:禁用
	[types.SET_BUTTON_TYPE](state, type) {
		state.buttonType = type
	},
	
	[types.SET_LIST](state, list) {
		state.list = list
	},
	
	// 设置清单列表
	[types.SET_LIST_DATA](state, listData) {
		state.listData = listData
	},
	
	// 设置清单列表
	[types.SET_CURRENT_LIST](state, currentList) {
		state.currentList = currentList
	},
	
	// 获取待办事项
	[types.GET_TODO_LIST](state, todoList) {
		state.todoList = todoList
	},
	
	// 刪除待办事项
	[types.DEL_TODO_ITEM](state, i) {
		state.todoList.splice(i, 1)
	},
	
	// 设置年度心情
	[types.SET_YEARS_FEEL](state, list) {
		state.feelList = list
	}
}