import dbTodo from './dbTodo.js'
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
		async delTodoById({_id, _openid}) {
			// 查询是否关联待办任务
			debugger
			let res = await dbTodo.db.where(
				{
					list: {
						_openid,
						_id
					}
				}
			).get()
			console.log(res);
			if(res && res.data && res.data.length > 0) {
				return {
					errMsg: '当前清单已关联待办事项，无法删除'
				}
			}
			return this.db.doc(_id).remove()
		}
}


export default new DbTodo()
