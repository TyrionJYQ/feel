<template>
	<view class="content">
		<u-tabs :list="classify" :is-scroll="false" :current="current" @change="change" active-color="#19be6b" class="tab"></u-tabs>
		<view class="list">
			<ul v-if="listData.length > 0">
				<li v-for="(i, index) in listData" :key="i._id" class="list-item">
					<u-checkbox v-model="i.isComplete" shape="circle" active-color="#19be6b"></u-checkbox>
					<span class="text" @click="onClickItem(index)" :class="{'line': i.isComplete}">{{i.text}}</span>
					<u-button size="mini" type="success" @click="edit(index)">编辑</u-button>
				</li>
			</ul>
			<u-empty text="没有数据" mode="list" v-else icon-color="#19be6b" color="#19be6b"></u-empty>
		</view>
		<u-button type="success" @click="goToNewPage">新建</u-button>
		<u-modal v-model="show" :title-style="{color: 'red'}" show-cancel-button @confirm="onConfirm" title="编辑">
			<view class="slot-content">
				<u-input v-model="content"></u-input>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import dbTodo from '../../utils/dbTodo.js'
	export default {
		data() {
			return {
				show: false,
				classify: [{
					name: '全部'
				}, {
					name: '已完成'
				}, {
					name: '待办'
				}],
				
				content: '',
				editIndex: 0,
				todos: [],
				current: 0,
				scrollTop: 0,
				old: {
					scrollTop: 0
				}
			}
		},
		
		computed: {
			listData() {
				switch(this.current) {
					case 0:
						return this.todos
					case 1:
						return this.todos.filter(todo => todo.isComplete)
					case 2:
						return this.todos.filter(todo => !todo.isComplete)
				}
			}
		},
		methods: {
			change(index) {
				this.current = index;
			},

			goToNewPage() {
				wx.navigateTo({
					url: '/pages/newTodo/index'
				})
			},

			onClickItem(i) {
				let _ = this.listData[i]
				_.isComplete = !_.isComplete
				dbTodo.changeTodo(this.listData[i])
			},

			edit(i) {
				this.editIndex = i
				this.content = this.listData[i].text
				this.show = true
			},
			
			onConfirm() {
				this.listData[this.editIndex].text = this.content
				dbTodo.changeTodo(this.listData[this.editIndex])
			}
		},

		onShow() {
			dbTodo.getTodos(this.$store.openid).then(res => {
				console.log(res.data)
				this.todos = res.data
			})
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

	.list .list-item {
		display: flex;
		padding: 15rpx;
		margin-bottom: 25rpx;
		border-radius: 3px;
		box-shadow: 0px 0px 4px #212121;
	}

	.text {
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;

	}

	.line {
		text-decoration: line-through;
		color: #19be6b;
	}
	
	.slot-content {
			font-size: 14rpx;
			color: $u-content-color;
			padding: 30rpx;
		}
</style>
