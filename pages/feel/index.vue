<template>
	<view class="content">
		<u-form :model="form" ref="uForm" label-width="120">
			<u-form-item label="心情" prop="feel" left-icon="heart">
				<u-input v-model="form.feel" placeholder="请输入心情" />
			</u-form-item>
			<u-form-item label="天气" prop="weather">
				<u-input v-model="form.weather" placeholder="请输入天气" />
			</u-form-item>
			<u-form-item label="吐槽" prop="talk">
				<u-input v-model="form.talk" placeholder="请开始吐槽" />
			</u-form-item>
			<u-form-item label="日期">
				<u-input v-model="form.date" disabled />
			</u-form-item>
		</u-form>
		<u-button @click="submit" type="success">{{btnText}}</u-button>
		<u-top-tips ref="uTips"></u-top-tips>
	</view>
</template>

<script>
	import dateToString from '../../utils/dateUtil'
	import {
		mapActions
	} from 'vuex'
	const app = getApp()
	export default {
		data() {
			return {
				form: {
					feel: '',
					weather: '',
					talk: '',
					date: dateToString(new Date()),
				},
				rules: {}
			};
		},

		computed: {
			btnText() {
				return this.$store.state.buttonType === 0 ? '提交' : '重新提交'
			}
		},

		methods: {
			...mapActions(['getDayNote']),
			_genRules() {
				let trigger = ['change', 'blur'],
					filed2text = {
						feel: '请输入心情',
						weather: '请输入天气',
						talk: '请输入吐槽内容',
					},
					required = true,
					_rule = this.rules;
				for (let i in filed2text) {
					_rule[i] = [{
						required,
						message: filed2text[i],
						trigger
					}]
				}
			},

			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						const db = wx.cloud.database()
						const {
							feel,
							weather,
							talk,
							date
						} = this.form
						db.collection('day_feels').add({
							data: {
								feel,
								weather,
								talk,
								date
							},
							success: res => {
								// 在返回结果中会包含新创建的记录的 _id
								const isEdit = this.btnText === '重新提交' ? true : false
								this.$refs.uTips.show({
									title: isEdit ? '編輯成功' : '新增成功',
									type: 'success',
									duration: '2300'
								});
								!isEdit && this.$store.dispatch('setButtonType', 1)
								console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)

							},
							fail: err => {
								wx.showToast({
									icon: 'none',
									title: '新增记录失败'
								})
								console.error('[数据库] [新增记录] 失败：', err)
							}
						})
					} else {
						return console.log('验证失败');
					}
				});
			}
		},

		onShow() {
			this._genRules()
			this.getDayNote().then(d => {
				if (d) {
					this.form.feel = d.feel
					this.form.weather = d.weather
					this.form.talk = d.talk
				}
			})
		},

		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	};
</script>

<style>
	.content {
		padding: 10rpx 30rpx;
	}
</style>
