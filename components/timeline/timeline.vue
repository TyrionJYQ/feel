<template>
	<view class="timetime-wrapper">
		<u-time-line>
			<u-time-line-item v-for="(item,index) in list" :key="index">
				<template v-slot:node>
					<view class="u-node" style="background: #19be6b;">
						<!-- 此处为uView的icon组件 -->
						<u-icon name="pushpin-fill" color="#fff" :size="24"></u-icon>
					</view>
				</template>
				<template v-slot:content>
					<view>
						<view class="u-order-desc">{{item[valueKey]}}</view>
						<!-- <view class="u-order-time">2019-12-06 22:30</view> -->
					</view>
				</template>
			</u-time-line-item>
		</u-time-line>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: () => []
			},

			valueKey: {
				type: String,
				default: () => 'feel'
			}
		},

		created() {
			console.log(this.list)
		},

		watch: {
			list: {
				deep: true,
				handler(val) {
					console.log('val', val)
				}
			}
		}
	}
</script>

<style scoped>
	.u-order-title {
		color: #333333;
		font-weight: bold;
		font-size: 32rpx;
	}

	.u-order-desc {
		color: rgb(150, 150, 150);
		font-size: 28rpx;
		margin-bottom: 6rpx;
	}

	.u-order-time {
		color: rgb(200, 200, 200);
		font-size: 26rpx;
	}
</style>
