<template>
	<view class="wrapper">
		<view class="f1 mtb15 bg-white">
			<u-field v-model="text" label="待办" placeholder="请填写待办" required>
			</u-field>
			<u-field v-model="listItem.name" label="清单" 
					placeholder="请选择清单" 
					disabled right-icon="arrow-down-fill" 
					@click="showAction = true"
			 required>
			</u-field>
			<u-field v-model="date" label="日期" placeholder="请选择日期" @click="showCalendar = true" required>
			</u-field>
			<u-field v-model="remark" label="备注" placeholder="请输入备注">
			</u-field>
		</view>
		<view>
			<u-button @click="submit" type="success">确定</u-button>
		</view>

		<u-calendar v-model="showCalendar" mode="date" @change="change" :maxDate="maxDate" :minDate="minDate"></u-calendar>
		<u-top-tips ref="uTips"></u-top-tips>
		
		<u-action-sheet @click="clickItem" :list="list" v-model="showAction"></u-action-sheet>
	</view>

</template>

<script>
	import dateToString from '../../utils/dateUtil'
	import dbTodo from '../../utils/dbTodo.js'
	import dbList from '../../utils/dbList.js'
	import {
		mapActions
	} from 'vuex'
	const app = getApp()
	const _ = new Date()
	export default {
		data() {
			return {
				text: '',
				listItem: {
					name: ''
				},
				date: '',
				remark: '',
				showCalendar: false,
				showAction: false,
				list: [],
				maxDate: `${_.getFullYear()}-${_.getMonth() + 2}-${_.getDate()}`,
				minDate: `${_.getFullYear()}-${_.getMonth() + 1}-${_.getDate()}`
			}
		},
		
		onShow() {
			this.getList()
		},

		methods: {
			change(e) {
				console.log(e)
				this.date = e.result
			},
			
			getList() {
				dbList.getList(this.$store.openid).then(res => {
					console.log(res)
					if (res.errMsg === 'collection.get:ok') {
						this.list = res.data.map(i => {
							i.text = i.name
							return i
						})
					}
			
				})
			},

			check() {
				const checkItems = [{
						value: this.text,
						message: '请输入待办事项'
					},
					{
						value: this.listItem.name,
						message: '请输入或选择清单'
					},
					{
						value: this.date,
						message: '请选择日期'
					}
				]
				let l = checkItems.length,
					i = 0;
				for (; i < l; i++) {
					if (!checkItems[i].value) {
						uni.showToast({
							title: checkItems[i].message,
							duration: 2000,
							icon: 'none'
						});
						return false
					}
				}
				return true

			},
			
			clickItem(i) {
				this.listItem = this.list[i]
			},

			submit(e) {
				if (!this.check()) return;
				dbTodo.addTodo({
					text: this.text,
					list: this.listItem,
					date: this.date,
					remark: this.remark,
					createTime: Date.now()
				}).then(res => {
					let title, type
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
