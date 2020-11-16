<template>
	<view class="wrapper">
		<view class="header fr">
			<u-dropdown active-color="#19be6b" class="mb15 br10">
				<u-dropdown-item v-model="value" :title="list.name" :options="options" @change="changeList"></u-dropdown-item>
			</u-dropdown>
		</view>
		<feel-todo-list class="f1 fc" @todo-refresh="refreshTodo" :current="current" :todos="listData" />
	</view>
</template>

<script>
	import {mapActions, mapGetters} from 'vuex'
	import dbTodo from '../../utils/dbTodo.js'
	export default {
		data() {
			return {
				value: this.$store.state.list._id,
				current: 0,
			}
		},

		computed: {
			...mapGetters(['listTodos']),
			list() {
				return this.$store.state.list
			},
			
			todos() {
				
			},
			
			listData() {
				switch (this.current) {
					case 0:
						return this.listTodos
					case 1:
						return this.listTodos
					case 2:
						return this.listTodos
				}
			},
			
			options() {
				let copyListData = JSON.parse(JSON.stringify(this.$store.state.listData))
				return copyListData.map( i => {
					this.$set(i, 'label', i.name)
					this.$set(i, 'value', i._id)
					return i
				})
			}
		},

		methods: {
			...mapActions(['setList', 'getTodoList']),
			
			refreshTodo(index) {
				dbTodo.getTodos(this.$store.state.openid, this.listId).then(res => {
					const todos = res.data.map(i => {
						i.show = false
						return i
					})
					this.getTodoList(todos)
				})
			},
			
			getTodos(todos) {
				this.todos = todos
			},
			
			changeList(id) {
				this.setList(this.$store.state.listData.find(i => i._id === id))
			}
		},
		
		onShow() {
			dbTodo.getTodos(this.$store.state.openid).then(res => {
				const todos = res.data.map(i => {
					i.show = false
					return i
				})
				this.getTodoList(todos)
			})
		}
	}
</script>

<style scoped>
	.header {
		display: flex;
	}
	
	/deep/.u-dropdown__menu__item__text.u-dropdown__menu__item__text {
		color: #19be6b !important;
	}
	
	/deep/.u-dropdown__menu__item.u-dropdown__menu__item.u-icon__icon {
		color:  #19be6b !important;
	}
	
	/deep/.u-dropdown {
		background-color: #FFF;
		border-radius: 6rpx;
	}
	
</style>
