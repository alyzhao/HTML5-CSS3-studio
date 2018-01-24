<template>
	<div class="center-wrap" @mousemove="moveRotate($event)" @mouseup="msUpRotate($event)">
		<div class="center" ref="center_el" :class="{ drag: dragAble }" :style="'transform: translateZ(-200px) rotateX(60deg) rotateY(-30deg) rotateZ(' + rotateAngle + 'deg)'">
			<rotate-cell v-for="(item, index) in datas" :key="item.name" :name="item.name" :value="item.value" :style="'transform: rotateZ(' + anguleInterval * index + 'deg)'" @click.native="clickRotate(index, $event)" @mousedown.native="msDownRotate($event)"></rotate-cell>
		</div>
		<div class="center" :style="'z-index: -1;transform: translateZ(-200px) rotateX(60deg) rotateY(-30deg) rotateZ(' + rotateBottomAngle + 'deg)'">
			<div class="bottom-round">
				<div class="rdb"></div>
				<bottom-rotate-cell v-for="(item, index) in bDatas" :key="item.name" :value="item.value" :style="'transform: rotateZ(' + bAnguleInterval * index + 'deg) rotateY(80deg)'"></bottom-rotate-cell>
			</div>          
		</div>
	</div>
</template>
<script>
	import RotateCell from '../components/RotateCell';
	import BottomRotateCell from '../components/BottomRotateCell';

// 'transform: rotateY(70deg) rotateZ(' + bAnguleInterval * index + 'deg)'
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
				bDatas: [{
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
				}],
				rotateAngle: 0,
				dragAble: false,
				mouseUp: false,
				coordinateStart: null,
				coordinateEnd: null,
				// matrix: [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, -200], [0, 0, 0, 1]]
				matrix: [[0.866, 0, -0.5, 0], [-0.433, 0.5, -0.75, 0], [0.25, 0.866, 0.433, -200], [0, 0, 0, 1]],
				rotateBottomAngle: 0
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
			flatCoor(x, y) {
				let center_el = this.$refs.center_el;
				let _x = x - center_el.offsetLeft - center_el.offsetWidth / 2;
				let _y = y - center_el.offsetTop - center_el.offsetHeight / 2;
				return [_x, _y, 0];
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

					let direct = e.clientX < this.coordinateStart[0] ? 1 : -1;
					this.rotateAngle = this.rotateAngle + direct * 2;
				}
			},
			msUpRotate(e) {
				if (this.dragAble) {
					this.dragAble = false;
					let direct = e.clientX < this.coordinateStart[0] ? 1 : -1;
					this.rotateAngle = this.rotateAngle + direct * 10;
				}
				this.mouseUp = true;
				console.log('up');
				console.log(this.coordinateOrigin)
			},
			transformCoor(arrCoor) {

			}
		},
		computed: {
			anguleInterval() {
				return 360 / (this.datas.length || 1)
			},
			coordinateOrigin() {
				return origin;
			},
			bAnguleInterval() {
				return 360 / (this.bDatas.length || 1)
			}
		},
		components: {
			RotateCell,
			BottomRotateCell
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
		transform-style: preserve-3d;
		backface-visibility: hidden;
		&.drag {
			transition-duration: 0 !important;
		}
		.bottom-round {
			border-radius: 50%;
			background-color: #77d0e8;
			width: 200px;
			height: 200px;
			position: absolute;
			top: 50%;
			left: 50%;
			margin-top: -100px;
			margin-left: -100px;
			transform: translateZ(-100px);
			.rdb {
				width: 165px;
				height: 165px;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translateX(-50%) translateY(-50%);
				background-color: #0B0B0E;
				border-radius: 50%;
			}
		}
	}
</style>