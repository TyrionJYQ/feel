import {
	yearTime
} from './dateUtil.js'
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
		} = param;
		return this.db.collection('day_feels').add({
			data: {
				feel,
				weather,
				talk,
				date,
				createTime: Date.now()
			}
		})
	}

	updateFeel(param) {
		const {
			date,
			openid
		} = param;
		// 先删除
		return this.db.collection('day_feels').where({
			_openid: openid,
			date
		}).remove().then(res => {
			return this.addFeel(param, true)
		})
	}
	
	/**
	 * 获取年度心情
	 * @param {string} openid  
	 */
	getFeels({openid}) {
		const _ = this.db.command
		return this.db.collection('day_feels').where({
			_openid: openid,
			createTime: _.gte(yearTime.startTime).and(_.lte(yearTime.endTime))
		}).get()
	}


}


export default new DbFeel()
