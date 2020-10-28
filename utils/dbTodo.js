class DbTodo {
	constructor(arg) {
		this.db = wx.cloud.database().collection('feel_todo')
	}

	// 插入记录
	addTodo (param) {
			const {
				text,
				list,
				date,
				remark,
				createTime,
			} = param;
			return this.db.add({
				data: {
					text,
					list,
					date,
					remark,
					createTime,
					isComplete: false
				}
			})
		}
		
		
		// 根据状态获取待办事项
		getTodos(openid) {
			return this.db.where({
				_openid: openid
			}).get()
		}
		
		// 改变待办
		changeTodo(i) {
			this.db.doc(i._id).update({
				data: {
					isComplete: i.isComplete,
					text: i.text,
					list: i.list,
					date: i.date,
					remark: i.remark,
					createTime: i.createTime
				},
				success(res) {
					console.log(res)
				}
			})
		}
		
		// 删除待办事项
		delTodoById(id) {
			this.db.doc(id).remove()
		}
}


export default new DbTodo()
