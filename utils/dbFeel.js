class DbFeel {
	constructor(arg) {
		this.db = wx.cloud.database()
	}

	// 插入记录
	addFeel(param, isUpdate) {
			const {
				feel,
				weather,
				talk,
				date,
				createTime
			} = param;
			return this.db.collection('day_feels').add({
				data: {
					feel,
					weather,
					talk,
					date,
					createTime: !isUpdate ? new Date().getTime() : createTime,
					updateTime: isUpdate ? Date.now() : ''
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
			// 更新时间
			param.updateTime = Date.now()
			// 先删除
			return this.db.collection('day_feels').where({
				_openid:openid,
				date
			}).remove().then(res => {
				return this.addFeel(param, true)
			})
		}
}


export default new DbFeel()
