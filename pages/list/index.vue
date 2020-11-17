<template>
	<view class="wrapper">
		<view class="list-wrapper f1 mtb15 p20 bg-white over-auto br10">
			<template v-if="listData.length > 0">
				<u-swipe-action :show="i.show" :index="index" v-for="(i, index) in listData" :key="i._id" @click="click" @open="open"
				 :options="options" vibrate-short>
					<view class="u-border-bottom">
						<view class="item title-wrap" @click="goDetail(index)">
							<text class="title line-1">{{i.name}}</text>
						</view>
					</view>
				</u-swipe-action>
			</template>
			<u-empty text="没有数据" mode="list" v-else icon-color="#19be6b" color="#19be6b"></u-empty>
		</view>
		<u-button type="success" @click="createNewItem">创建</u-button>
		<u-modal v-model="show" :title-style="{color: 'red'}" show-cancel-button @confirm="addListItem" title="创建清单">
			<view class="slot-content">
				<u-input v-model="name" placeholder="请输入"></u-input>
			</view>
		</u-modal>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import dbList from '../../utils/dbList.js'
	import {mapActions, mapState} from 'vuex'
	
	export default {
		data() {
			return {
				show: false,
				name: '',
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}]
			}
		},
		
		computed:{
			...mapState(['listData'])
		},
		
		methods: {
			...mapActions(['setList', 'setListData']),
			// 获取清单列表
			getList() {
				dbList.getList(this.$store.openid).then(res => {
					console.log(res)
					if (res.errMsg === 'collection.get:ok') {
						res.data = res.data.map(i => {
							i.show = false;
							return i
						})
						this.setListData(res.data)
					}
					

				})
			},

			click(index, index1) {
				// 删除提示
				const _this = this
				uni.showModal({
					title: '提示',
					content: `是否删除清单${this.listData[index].name}`,
					success(res) {
						res.confirm && _this._del(_this.listData[index])
					}
				})


			},
			
			goDetail(i) {
				this.setList(this.listData[i])
				wx.navigateTo({
					url: '/pages/list-detail/index'
				})
			},

			// 删除
			_del(item) {
				dbList.delTodoById({_id:item._id,_openid: this.$store.state.openid}).then(res => {
					console.log(res);
					if (res && res.errMsg === 'document.remove:ok') {
						this.$refs.uToast.show({
							title: '删除成功',
							type: 'success',
						})
					} else {
						this.$refs.uToast.show({
							title: res.errMsg,
							type: 'warning',
						})
					}
				}).then(() => {
					this.getList()
				})
			},

			createNewItem() {
				this.show = true
			},

			open(index) {
				this.listData[index].show = true;
				this.listData.map((val, idx) => {
					if (index != idx) this.listData[idx].show = false;
				})
			},
			// 创建清单
			addListItem() {
				if (!this.name) {
					return uni.showToast({
						icon: 'none',
						title: '请输入清单名'
					})
				}
				dbList.addListItem({
					name: this.name
				}).then(res => {
					console.log(res)
					if (res.errCode === 'collection.add:ok') {
						uni.showLoading({
							title: '创建成功'
						})
					}
				}).then(() => {
					this.getList()
				})

			},

			// 删除清单
			delListItem() {

			}
		}
		
	}
</script>

<style scoped>
	.slot-content {
		font-size: 14rpx;
		color: $u-content-color;
		padding: 30rpx;
	}

	.list {
		flex: 1;
		align-items: center;
		overflow-y: auto;
		padding: 20rpx;
	}

	.item {
		display: flex;
		padding: 20rpx;
	}

	.line-1 {
		overflow: hidden;
		word-break: break-all;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1
	}
</style>
