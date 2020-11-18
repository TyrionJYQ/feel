<template>
	<view class="wrapper">
		<view class="bg-white p20 f1 mb15 br10">
			<u-form :model="form" ref="uForm" label-width="120">
				<u-form-item label="心情" prop="feel" left-icon="heart" :left-icon-style="leftIconStyle">
					<u-input v-model="form.feel" type="select" placeholder="请选择心情" @click="show = true" />
				</u-form-item>
				<u-form-item label="天气" prop="weather" left-icon="moments" :left-icon-style="leftIconStyle">
					<u-input v-model="form.weather" placeholder="请输入天气" />
				</u-form-item>
				<u-form-item label="吐槽" prop="talk" left-icon="chat" :left-icon-style="leftIconStyle">
					<u-input v-model="form.talk" placeholder="请开始吐槽" />
				</u-form-item>
				<u-form-item label="日期" left-icon="calendar" :left-icon-style="leftIconStyle">
					<u-input v-model="form.date" disabled />
				</u-form-item>
			</u-form>
		</view>

		<u-button @click="submit" type="success" class="btn">{{btnText }}</u-button>
		<u-top-tips ref="uTips"></u-top-tips>
		<u-action-sheet :list="feelList" v-model="show" @click="actionSheetCallback"></u-action-sheet>
	</view>
</template>

<script>
	import dateToString from '../../utils/dateUtil'
	import dbFeel from '../../utils/dbFeel.js'
	import {
		mapActions
	} from 'vuex'
	const app = getApp()
	export default {
		data() {
			return {
				feelList: [{
						text: '开心'
					},
					{
						text: '悲伤'
					},
					{
						text: '激动'
					},
					{
						text: '烦躁'
					},
					{
						text: '纠结'
					},
					{
						text: '厌恶'
					},
					{
						text: '焦虑'
					}
				],
				show: false,
				form: {
					feel: '',
					weather: '',
					talk: '',
					feel: '',
					date: dateToString(new Date()),

				},
				rules: {},
				leftIconStyle: {
					color: '#19be6b'
				}
			};
		},

		computed: {
			btnText() {
				return this.$store.state.buttonType === 0 ? '提交' : '重新提交'
			}
		},

		methods: {
			...mapActions(['getDayNote', 'setButtonType']),

			_initStyle() {
				this.leftIconStyle = {
					color: '#19be6b'
				}
			},

			_initPage() {
				this._genRules()

			},
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
			_isInfoChange() {

			},

			actionSheetCallback(index) {
				this.form.feel = this.feelList[index].text;
			},

			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						let db = dbFeel.db,
							title, type
						const {
							feel,
							weather,
							talk,
							date
						} = this.form
						// 获取方法
						const reqMethodName = this.btnText === '提交' ? 'addFeel' : 'updateFeel'
						dbFeel[reqMethodName]({
							feel,
							weather,
							talk,
							date,
							openid: this.$store.state.openid
						}).then(res => {
							if (res && res.errMsg === "collection.add:ok") {
								type = 'success'
								title = '提交成功'
								this.setButtonType(1)
							} else {
								title = '未知异常'
								type = 'error'
							}
							this.$refs.uTips.show({
								title,
								type,
								duration: '2300'
							});

						})
					} else {
						return console.log('验证失败');
					}
				});
			}
		},

		onShow() {
			this.getDayNote().then(d => {
				if (d) {
					this.form.feel = d.feel
					this.form.weather = d.weather
					this.form.talk = d.talk
				}
			})
			
			dbFeel.getFeels({
				openid: this.$store.state.openid
			})
		},

		onReady() {
			this._initPage()
			this.$refs.uForm.setRules(this.rules);
		}
	};
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		height: 100vh;
		justify-items: flex-end;
	}
	
	.jl {
		justify-content: left;
	}
</style>
