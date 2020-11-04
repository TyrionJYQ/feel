<template>
	<view class="fc f1">
		<u-tabs :list="classify" :is-scroll="false" :current="current" @change="change" active-color="#19be6b" class="tab"></u-tabs>
		<view class="mtb15 bg-white over-auto br10 f1">
			<template v-if="listData.length > 0">
				<u-swipe-action :show="i.show" :index="index" v-for="(i, index) in listData" :key="i._id" @click="click" @open="open"
				 :options="options">
					<view class="u-border-bottom">
						<view class="item title-wrap" @click="onClickItem(index)">
							<u-checkbox v-model="i.isComplete" shape="circle" active-color="#19be6b"></u-checkbox>
							<text class="title line-1" :class="{'line': i.isComplete}">{{i.text}}</text>
						</view>
					</view>
				</u-swipe-action>
			</template>
			<u-empty text="没有数据" mode="list" v-else icon-color="#19be6b" color="#19be6b" count="acount"></u-empty>
		</view>

		<u-modal v-model="show" :title-style="{color: 'red'}" show-cancel-button @confirm="onConfirm" title="编辑">
			<view class="slot-content">
				<u-input v-model="content"></u-input>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import dbTodo from '../../utils/dbTodo.js'
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	export default {
		props: {
			todos: {
				type: Array,
				default () {
					return []
				}
			},
		},
		data() {
			return {
				show: false,
				classify: [{
					name: '全部',


				}, {
					name: '已完成',

				}, {
					name: '待办',

				}],
				current:0,
				content: '',
				editIndex: 0,
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
			...mapGetters(['todosCompleted', 'todosUnCompleted']),
			listData() {
				switch (this.current) {
					case 0:
						return this.todos
					case 1:
						return this.todosCompleted
					default: 
						return this.todosUnCompleted
				}
			},

			listId() {
				return this.$store.state.list._id
			}
		},
		methods: {
			change(index) {
				this.current = index
				this.$emit('tab-change', index)
			},

			goToNewPage() {
				wx.navigateTo({
					url: '/pages/newTodo/index'
				})
			},

			goToList() {
				wx.navigateTo({
					url: '/pages/list/index'
				})
			},

			click(index, index1) {
				if (index1 == 1) {
					this._del(this.listData[index])
				} else {
					this._edit(index)
				}
			},

			// 编辑
			_edit(i) {
				this.editIndex = i
				this.content = this.listData[i].text
				this.show = true
			},


			// 删除
			_del(item) {
				const i = this.todos.findIndex(t => t._id === item._id)
				// 从服务端删除
				dbTodo.delTodoById(this.listData[i]._id)
				// 物理删除
				this.todos.splice(i, 1)

			},




			onClickItem(i) {
				let _ = this.listData[i]
				dbTodo.changeTodo(this.listData[i]).then(res => {
					if (res && res.errMsg === "document.update:ok") {
						_.isComplete = !_.isComplete
					}
				}).then(() => {
					// 重新获取数据
					this.$emit('todo-refresh')
				})
			},

			// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
			open(index) {
				this.listData[index].show = true;
				this.listData.map((val, idx) => {
					if (index != idx) this.listData[idx].show = false;
				})
			},



			onConfirm() {
				this.listData[this.editIndex].text = this.content
				dbTodo.changeTodo(this.listData[this.editIndex])
				this.listData[this.editIndex].show = false
			},

			_setCount() {
				const allCount = this.todos.length,
					nCount = this.todosUnCompleted.length,
					yCount = this.todosCompleted.length;
				this.$set(this.classify[0], 'count', allCount)
				this.$set(this.classify[1], 'count', yCount)
				this.$set(this.classify[2], 'count', nCount)
			},

			
		},

		watch: {
			todos: {
				deep: true,
				handler(val) {
					this._setCount()
				}
			}
		},

		created() {
			this._setCount()
			// this.getList()
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




	.list {
		flex: 1;
		/* align-items: center; */
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
