<template>
	<view class="wrapper">
		<view class="header fr">
			<u-dropdown active-color="#19be6b" class="mb15 br10">
				<u-dropdown-item v-model="value" :title="list.name" :options="options" @change="changeList"></u-dropdown-item>
			</u-dropdown>
		</view>
		<feel-todo-list @todos="getTodos" class="f1 bg-white" ref="todos"/>
	</view>
</template>

<script>
	import {mapActions} from 'vuex'
	export default {
		data() {
			return {
				todos: [],
				value: this.$store.state.list._id,
				
			}
		},

		computed: {
			list() {
				return this.$store.state.list
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
			...mapActions(['setList']),
			
			getTodos(todos) {
				this.todos = todos
			},
			
			changeList(id) {
				this.setList(this.$store.state.listData.find(i => i._id === id))
				this.$refs.todos.getList()
			}
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
