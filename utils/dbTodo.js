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
					status: 0
				}
			})
		}

		updateFeel(param) {
			const {
				feel,
				weather,
				talk,
				date,
				openid
			} = param;
			// 先删除
			return this.db.where({
				_openid:openid,
				date
			}).remove().then(res => {
				return this.addFeel(param)
			})
		}
		
		// 根据状态获取待办事项
		getTodosByStatus() {
			
		}
}


export default new DbTodo()
