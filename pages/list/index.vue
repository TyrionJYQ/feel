<template>
	<view class="content">
		<view class="list-wrapper flex1">
			<template v-if="list.length > 0">
				<u-swipe-action :show="i.show" :index="index" v-for="(i, index) in list" :key="i._id" @click="click" @open="open"
				 :options="options" vibrate-short>
					<view class="u-border-bottom">
						<view class="item title-wrap">
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
	</view>
</template>

<script>
	import dbList from '../../utils/dbList.js'
	export default {
		data() {
			return {
				list: [],
				show: false,
				name: '',
				options: [
					{
						text: '删除',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				]
			}
		},
		methods: {
			// 获取清单列表
			getList() {
				dbList.getList(this.$store.openid).then(res => {
					console.log(res)
					if (res.errMsg === 'collection.get:ok') {
						this.list = res.data.map(i => {
							i.show = true;
							return i
						})
					}

				})
			},

			click(index, index1) {
				// 删除提示
				uni.showModal({
					title: '提示',
					content: `是否删除清单${this.list[index].name}`,
					success(res) {
						res.confirm &&  this._del(this.list[index])
					}
				})
				
				
			},
			
			// 删除
			_del(item) {
				
			},
			
			createNewItem() {
				this.show = true
			},

			open(index) {
				this.list[index].show = true;
				this.list.map((val, idx) => {
					if (index != idx) this.list[idx].show = false;
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

		},
		onShow() {
			this.getList()
		}
	}
</script>

<style scoped>
	.content {
		display: flex;
		flex-direction: column;
		height: 100vh;
		padding: 10rpx;
	}

	.flex1 {
		flex: 1;
	}

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
