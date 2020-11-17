<template>
	<view class="content bg-color">
		<view>
			<u-tabs-swiper ref="uTabs" :list="list" :current="current" @change="tabsChange" :is-scroll="false" swiperWidth="750"
			 class="tabs" active-color="#19be6b"></u-tabs-swiper>
		</view>
		<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" class="swiper-wrapper">
			<swiper-item class="swiper-item" v-for="(item, index) in list" :key="index">
				<view class="swiper-item uni-bg-red">{{item.name}}</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import {
		mapActions
	} from 'vuex'
	import dbFeel from '../../utils/dbFeel'
	import dbTodo from '../../utils/dbTodo'
	import dbList from '../../utils/dbList.js'
	import uCharts from '@/components/u-charts/u-charts.js';

	const app = getApp()

	export default {
		async onLoad() {
			const openid = await this.getUserOpenId()
			// 心情
			const feelRes = await dbFeel.getFeels({
				openid
			})
			this.setYearFeels(feelRes.errMsg === "collection.get:ok" ? feelRes.data : [])
			// 待办
			const todoRes = await dbTodo.getTodos(openid)
			const todos = todoRes.data && todoRes.data.map(i => {
				i.show = false
				return i
			})
			this.getTodoList(todos)
			// 清单
			const listRes = await dbList.getList(openid)
			if (listRes.errMsg === 'collection.get:ok') {
				listRes.data = listRes.data.map(i => {
					i.show = false;
					return i
				})
				this.setListData(listRes.data)
			}
		},

		data() {
			return {
				list: [{
					name: '心情'
				}, {
					name: '待办'
				}, {
					name: '清单'
				}],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
			};
		},


		methods: {
			...mapActions(['getUserOpenId', 'setYearFeels', 'getTodoList', 'setListData']),
			tabsChange(index) {
				this.current = index
				this.swiperCurrent = index;
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			// scroll-view到底部加载更多
			onreachBottom() {

			}
		}
	}
</script>

<style scoped less>
	page {
		height: 100%;
	}

	.content {
		display: flex;
		flex-direction: column;

		height: 100vh;
		padding: 15rpx;
		box-sizing: border-box;

	}

	.swiper-wrapper {
		flex: 1;

		background-color: #FFFFFF;
		margin-top: 15rpx;
		border-radius: 5rpx;

	}

	/deep/ .swiper-item {
		display: flex;
		/* align-items: center; */
		justify-content: center;
	}

	/deep/ .u-tabs {
		border-radius: 5rpx;
	}


	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
