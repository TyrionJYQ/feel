<script>
	import {env} from './config.json'
	export default {
		onLaunch: function() {
			console.log('App Launch')
			wx.cloud.init({  
			  env 
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";
	@import "./static/iconfont.css";
	@import "./static/common.css";
</style>
