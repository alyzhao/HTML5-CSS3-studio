<template>
	<div class="center-wrap" @mousemove="moveRotate($event)" @mouseup="msUpRotate()">
		<div class="center" ref="center_el" :style="'transform: translateZ(-200px) rotateX(60deg) rotateY(-30deg) rotateZ(' + rotateAngle + 'deg)'">
			<rotate-cell v-for="(item, index) in datas" :key="item.name" :name="item.name" :value="item.value" :style="'transform: rotateZ(' + anguleInterval * index + 'deg)'" @click.native="clickRotate(index, $event)" @mousedown.native="msDownRotate($event)"></rotate-cell>
		</div>
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
				}, {
					name: 6,
					value: 'qqq'
				}, {
					name: 7,
					value: 'rrr'
				}, {
					name: 8,
					value: 'ttt'
				}, {
					name: 9,
					value: 'yyy'
				}, {
					name: 10,
					value: 'iii'
				}, {
					name: 11,
					value: 'yyy'
				}, {
					name: 12,
					value: 'iii'
				}, {
					name: 13,
					value: '税务局'
				}, {
					name: 14,
					value: '人社厅'
				}, {
					name: 15,
					value: 'qqq'
				}],
				rotateAngle: 0,
				dragAble: false,
				mouseUp: false,
				coordinateStart: null,
				coordinateEnd: null,
				matrix: [[0.866, -0.433, 0.25, 0], [0, 0.5, 0.866, 0], [-0.5, -0.75, 0.433, 0], [0, 0, -870, 1]]
			}
		},
		mounted() {
			this.$nextTick(function() {

			})
		},
		methods: {
			clickRotate(index, e) {
				console.log('click');
				e.preventDefault();
				e.stopPropagation();
				let rotation = 90 - index * this.anguleInterval
				this.rotateAngle = rotation;
			},
			msDownRotate(e) {
				let x = e.clientX;
				let y = e.clientY;
				this.coordinateStart = [x, y, 0];
				console.log(this.coordinateStart);
				this.mouseUp = false;
				setTimeout(() => {
					if (!this.mouseUp)
						this.dragAble = true;
				}, 100)
				console.log('mousedown');
			},
			moveRotate(e) {
				if (this.dragAble) {
					console.log('move');

					let x = e.clientX;
					let y = e.clientY;

					this.coordinateEnd = [x, y, 0];

					// let rotateStart = 
					let origin = this.coordinateOrigin;

				}
			},
			msUpRotate() {
				this.dragAble = false;
				this.mouseUp = true;
				console.log('up');
				console.log(this.coordinateOrigin)
			},
			transformCoor([x, y, z]) {
				let m = this.matrix;
				
			}
		},
		computed: {
			anguleInterval() {
				return 360 / (this.datas.length || 1)
			},
			coordinateOrigin() {
				let center_el = this.$refs.center_el;
				console.log(center_el);
				let x = center_el.offsetLeft + center_el.offsetWidth / 2;
				let y = center_el.offsetTop + center_el.offsetHeight / 2;
				let origin = [x, y, 0];
				return origin;
			}
		},
		components: {
			RotateCell
		}
	}
</script>
<style lang="scss">
	.center-wrap {
		width: 100%;
		height: 100%;
	}
	.center {
		width: 100px;
		height: 100px;
		position: absolute;
		left: 50%;
		margin-left: -50px;
		top: 50%;
		margin-top: -50px;
		transition: all ease 2s;
	}
</style>