<template>
	<div class="center">
		<rotate-cell v-for="(item, index) in datas" :name="item.name" :value="item.value" :style="'transform: rotateZ(' + anguleInterval * index + 'deg)'"></rotate-cell>
	</div>
</template>
<script>
	import RotateCell from '../components/RotateCell';

	export default {
		name: 'Home',
		data() {
			return {
				datas: [{
					name: 0,
					value: '公安局'
				}, {
					name: 1,
					value: '教育厅'
				}, {
					name: 2,
					value: '工商局'
				}, {
					name: 3,
					value: '国土局'
				}, {
					name: 4,
					value: '税务局'
				}, {
					name: 5,
					value: '人社厅'
				}]
			}
		},
		computed: {
			anguleInterval() {
				return 360 / (this.datas.length || 1)
			}
		},
		components: {
			RotateCell
		}
	}
</script>
<style lang="scss">
	.center {
		width: 100px;
		height: 100px;
		position: absolute;
		left: 50%;
		margin-left: -50px;
		top: 50%;
		margin-top: -50px;
	}
</style>