<template>
	<view class="content">
		<u-field v-model="text" label="待办" placeholder="请填写待办">
		</u-field>
		<u-field v-model="list" label="清单" placeholder="请选择清单">
		</u-field>
		<u-field v-model="date" label="日期" placeholder="请选择日期" @click="showCalendar = true">
		</u-field>
		<u-field v-model="remark" label="备注" placeholder="请输入备注">
		</u-field>
		
		<u-calendar v-model="showCalendar" mode="date" @change="change" :maxDate="maxDate" :minDate="minDate"></u-calendar>
		<u-top-tips ref="uTips"></u-top-tips>
		<u-button @click="submit" type="success">确定</u-button>
	</view>

</template>

<script>
	import dateToString from '../../utils/dateUtil'
	import dbTodo from '../../utils/dbTodo.js'
	import {
		mapActions
	} from 'vuex'
	const app = getApp()
	const _ = new Date()
	export default {
		data() {
			return {
				text: '',
				list: '',
				date: '',
				remark: '',
				showCalendar: false,
				maxDate: `${_.getFullYear()}-${_.getMonth() + 2}-${_.getDate()}`,
				minDate: `${_.getFullYear()}-${_.getMonth() + 1}-${_.getDate()}`
			}
		},

		
		methods: {
			change(e) {
				console.log(e)
				this.date =  e.result
			},
			submit(e) {
				dbTodo.addTodo({
						text: this.text,
						list: this.list,
						date: this.date,
						remark: this.remark,
						createTime: Date.now()
				}).then(res => {
					let title,type
					if (res && res.errMsg === "collection.add:ok") {
						type = 'success'
						title = '创建成功'
					} else {
						title = '未知异常'
						type = 'error'
					}
					this.$refs.uTips.show({
						title,
						type,
						duration: '2300'
					});
				}).then(() => {
					setTimeout(wx.navigateBack, 2000)
				})
			},
		}
	};
</script>

<style scoped>
	.content {
		padding: 10rpx 30rpx;
	}
</style>
