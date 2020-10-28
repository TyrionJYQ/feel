class DbTodo {
	constructor(arg) {
		this.db = wx.cloud.database().collection('feel_list')
	}

	// 插入记录
	addListItem (param) {
			const {
				name
			} = param;
			return this.db.add({
				data: {
					name
				}
			})
		}
		
		
		// 根据状态获取待办事项
		getList(openid) {
			return this.db.where({
				_openid: openid
			}).get()
		}
		
		
		
		// 删除待办事项
		delTodoById(id) {
			this.db.doc(id).remove()
		}
}


export default new DbTodo()
