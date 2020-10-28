class DbFeel {
	constructor(arg) {
		this.db = wx.cloud.database()
	}

	// 插入记录
	addFeel(param) {
			const {
				feel,
				weather,
				talk,
				date
			} = param;
			return this.db.collection('day_feels').add({
				data: {
					feel,
					weather,
					talk,
					date
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
			return this.db.collection('day_feels').where({
				_openid:openid,
				date
			}).remove().then(res => {
				return this.addFeel(param)
			})
		}
}


export default new DbFeel()
