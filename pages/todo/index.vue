<template>
	<view class="content">
		<u-tabs :list="list" :is-scroll="false" :current="current" @change="change" active-color="#19be6b" class="tab"></u-tabs>
		<view class="list">
		
		</view>
		<u-button  type="success" @click="goToNewPage">新建</u-button>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: '全部'
				}, {
					name: '已完成'
				}, {
					name: '待办'
				}],


				current: 0,
			
				scrollTop: 0,
				old: {
					scrollTop: 0
				}
			}
		},
		methods: {
			change(index) {
				this.current = index;
				this.curNow = index;
			},
			
			goToNewPage() {
				wx.navigateTo({
				  url: '/pages/newTodo/index'
				})
			}
		}
	}
</script>

<style scoped>
	/deep/ .u-scroll-view {
		box-shadow: 0px 7px 7px -7px #BDBDBD;
	}
	page {
		height: 100%;
	}
	.content {
		display: flex;
		flex-direction: column;
		height: 100vh;
		padding: 10rpx;
	}

	.list {
		flex: 1;
		/* height: 300px; */
		overflow-y: auto;
		padding: 20rpx;
	}
</style>
