<template>
	<view class="content bg-color">
		<view class="text-area">
			首页
		</view>
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

		methods: {
			...mapActions(['getUserOpenId', 'setYearFeels', 'getTodoList', 'setListData'])
		}
	}
</script>

<style>
	page {
		height: 100%;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		padding: 15rpx;
		box-sizing: border-box;
		
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
