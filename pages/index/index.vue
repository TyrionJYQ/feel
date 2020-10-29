<template>
	<view class="content bg-color m15">
		<view class="text-area">
		首页
		</view>
	</view>
</template>

<script>
	import { mapActions  } from 'vuex'
	import uCharts from '@/components/u-charts/u-charts.js';
	const app = getApp()
	export default {
		data() {
			return {
				
			}
		},
		
		onLoad() {
				this.getUserOpenId()
		},
		
		methods: {
			...mapActions(['getUserOpenId'])
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
