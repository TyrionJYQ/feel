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
	}
}