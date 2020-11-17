<template>
	<view class="wrapper">
		<feel-todo-list class="f1 fc" @todo-refresh="refreshTodo" :current="current" :todos="listData" />
		<view>
			<u-button type="success" @click="goToNewPage">新建</u-button>
		</view>
	</view>
</template>

<script>
	import dbTodo from '../../utils/dbTodo.js'
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	// import dbTodo from '../../utils/dbTodo.js'
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
				current: 0,
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				options: [{
						text: '编辑',
						style: {
							backgroundColor: '#19be6b'
						}
					},
					{
						text: '删除',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				]
			}

		},

		computed: {
			todos() {
				return this.$store.state.todoList
			},
			listData() {
				switch (this.current) {
					case 0:
						return this.todos
					case 1:
						return this.todosCompleted
					case 2:
						return this.todosUnCompleted
				}
			}
		},
		methods: {
			...mapActions(['getTodoList']),
			
			refreshTodo(index) {
				dbTodo.getTodos(this.$store.state.openid, this.listId).then(res => {
					const todos = res.data.map(i => {
						i.show = false
						return i
					})
					this.getTodoList(todos)
				})
			},

			goToNewPage() {
				wx.navigateTo({
					url: '/pages/new-todo/index'
				})
			},

			goToList() {
				wx.navigateTo({
					url: '/pages/list/index'
				})
			},

			onConfirm() {
				this.listData[this.editIndex].text = this.content
				dbTodo.changeTodo(this.listData[this.editIndex])
				this.listData[this.editIndex].show = false
			}
		},

		
	}
</script>

<style scoped>
	/deep/ .u-scroll-view {
		box-shadow: 0px 7px 7px -7px #BDBDBD;
	}

	page {
		height: 100%;
	}




	.list {
		flex: 1;
		align-items: center;
		overflow-y: auto;
		/* padding: 20rpx; */
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

	title {
		text-align: left;
		font-size: 28rpx;
		color: $u-content-color;
		margin-top: 20rpx;
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

	.flex {
		display: flex;
	}

	.flex1 {
		flex: 1;
	}

	.mr10 {
		margin-right: 10rpx;
	}

	.ml10 {
		margin-left: 10rpx;
	}
</style>
