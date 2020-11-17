import * as types from './mutation-types'
import dateToString from '../utils/dateUtil'

export default {
	getUserOpenId({
		commit,
		state
	}) {
		return new Promise((resolve, reject) => {
			if (state.openid) return resolve(state.openid)
			wx.cloud.callFunction({
				name: 'login',
			}).then(res => {
				if (res.errMsg === "cloud.callFunction:ok") {
					const {
						openid
					} = res.result
					commit(types.SET_OPEN_ID, openid)
					resolve(openid)
				}
			})

		})
	},
	// 获取當前心情記錄
	async getDayNote({
		commit,
		state
	}) {
		let cdayNote = null
		const db = wx.cloud.database()
		return await db.collection('day_feels').where({
			_openid: state.openid,
			date: dateToString(new Date())
		}).get().then(res => {
			if (res.data && res.data.length > 0) {
				cdayNote = res.data[0]
				commit(types.SET_BUTTON_TYPE, 1)
			} else {
				commit(types.SET_BUTTON_TYPE, 0)
			}
			return cdayNote
		})
	},

	// 設置按鈕狀態
	setButtonType({
		commit
	}, type) {
		commit(types.SET_BUTTON_TYPE, type)
	},
	
	// 设置当前清单详情id
	setList({commit}, list) {
		commit(types.SET_LIST, list)
	},
	
	// 设置当前清单列表
	setListData({commit}, list) {
		commit(types.SET_LIST_DATA, list)
	},
	
	// 获取待办列表
	// 设置当前清单列表
	getTodoList({commit}, list) {
		commit(types.GET_TODO_LIST, list)
	},
	
	async delTodoItem({commit}, i) {
		commit(types.DEL_TODO_ITEM, i)
	},
	
	// 设置年度待办
	setYearFeels({commit}, data) {
		commit(types.SET_YEARS_FEEL, data)
	}
}
