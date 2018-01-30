<template>
	<div class="center-wrap"
		@mousemove="moveRotate($event)"
		@mousedown="unShow()"
		@mouseup="msUpRotate($event)">
		<div class="center-img">
			<div class="left-img">
				<div class="left-board">
					<div class="split-left"></div>
					<div class="con">
						<p><i class="icon icon-people"></i>群众</p>
						<p><i class="icon icon-company"></i>企业</p>
						<p><i class="icon icon-other"></i>其他</p>
					</div>
				</div>
			</div>
			<div class="right-img"></div>
			<div class="right-line">
				<extend-line :width="320" :height="20"></extend-line>
			</div>
			<div class="left-line">
				<extend-line :width="480" :height="20"></extend-line>
			</div>
			<div v-if="centerShow && centerContent.name" class="left-board cb">
				<div class="split-left"></div>
				<div class="con">
					<p><i class="icon icon-people"></i>{{centerContent.value}}</p>
					<p><i class="icon icon-company"></i>{{centerContent.value}}</p>
					<p><i class="icon icon-other"></i>{{centerContent.value}}</p>
				</div>
			</div>
		</div>
		<div class="center" style="transform: translateZ(-200px) rotateX(66deg) rotateY(-15deg) rotateZ(0deg);z-index: 1;">
			<div class="op"></div>
		</div>
		<div class="center" ref="center_el"
			:class="{ drag: dragAble }"
			:style="'transform: translateZ(-200px) rotateX(66deg) rotateY(-15deg) rotateZ(' + rotateAngle + 'deg)'">
			<rotate-cell v-for="(item, index) in datas"
				:key="item.name"
				:name="item.name"
				:value="item.value"
				:style="'transform: translateY(-50%) rotateZ(' + anguleInterval * index + 'deg)'"
				@click.native="clickRotate(index, $event)"
				@mousedown.native="msDownRotate($event)">
			</rotate-cell>
		</div>
		<div class="center"
			:style="'z-index: -1;transform: translateZ(-200px) rotateX(65deg) rotateY(-15deg) rotateZ(' + rotateBottomAngle + 'deg)'">
			<div v-for="n in 230" class="scale" 
				:style="'transform: translateY(-100px) translateX(12px) translateZ(' + (-n * 2 - 150) + 'px)'">
			</div>
			<div class="bottom-round">
				<div class="rdb"></div>
				<bottom-rotate-cell v-for="(item, index) in bDatas"
					:key="item.name"
					:value="item.value"
					:style="'transform: rotateZ(' + bAnguleInterval * index + 'deg)'">
				</bottom-rotate-cell>
			</div>
		</div>
	</div>
</template>
<script>
	import RotateCell from '../components/RotateCell';
	import BottomRotateCell from '../components/BottomRotateCell';
	import ExtendLine from '../components/ExtendLine';
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
				rotateBottomAngle: 0,
				centerShow: false,
				centerContent: null
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
				this.centerShow = true;
				this.centerContent = this.datas[index];
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
					this.rotateAngle = this.rotateAngle + direct * 5;
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
			unShow() {
				this.centerShow = false;
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
			BottomRotateCell,
			ExtendLine
		}
	}
</script>
<style lang="scss">
	.center-wrap {
		width: 100%;
		height: 100%;
	}
	.center-img {
	    width: 1000px;
	    height: 580px;
	    position: absolute;
	    top: 50%;
	    left: 50%;
	    margin-top: -290px;
	    margin-left: -500px;
		background: transparent url('../assets/img/center.png') no-repeat;
		background-size: 1000px;
		z-index: 2;
		transform-style: preserve-3d;
	}
	.left-img {
		width: 400px;
		height: 200px;
		position: absolute;
		background: transparent url('../assets/img/left-img.png') no-repeat;
		background-size: 400px;
		top: -340px;
		left: -160px;
	}
	.left-board {
		border-radius: 5px;
		border: 2px solid #75f1ff;
		transform: translate3d(-655px, -180px, 0) rotateY(10deg) translateZ(-255px);
		user-select: none;
		&.cb {
			width: 300px;
			transform: translate3d(101px, 403px, 0) rotateY(48deg) translateZ(-330px);
			animation: delay 3s linear;
		}
		.split-left {
			width: 56px;
		    height: 5px;
		    box-shadow: 0px 0px 55px 7px #00d9fd;
		    background-color: #75daea;
		    position: absolute;
		    right: -57px;
		    top: 50%;
		    margin-top: -2px;

		}
		.con {
			background-color: #75daea;
			margin: 20px 20px;
			border-radius: 5px;
			box-shadow: 0px 0px 55px 7px #00d9fd;
			p {
				margin: 0;
			    text-align: left;
			    padding: 5px 33px;
			    display: flex;
			    align-items: center;
			    justify-content: center;
			    .icon {
			    	flex-grow: .5;
			    	font-size: 18px;
			    }
			}
		}
	}
	.right-img {
		width: 360px;
	    height: 340px;
	    position: absolute;
	    background: transparent url('../assets/img/right-img.png') no-repeat;
	    background-size: 360px;
	    top: -340px;
	    left: 660px;
	}
	.right-line {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateX(83px) translateY(-139px) rotateZ(-43deg);
	}
	.left-line {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateX(-151px) translateY(-122px) rotateZ(-135deg);
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
		.op {
			opacity: 0.8;
		    filter: blur(58px);
		    width: 2050px;
		    height: 1288px;
		    transform: translateX(-1000px) translateY(-1200px);
		    background: #000;
		    border-radius: 50% 50% 0 0;
		}
		&.drag {
			transition-duration: 0 !important;
		}
		.scale {
			width: 5px;
		    height: 5px;
		    top: 50%;
		    left: 50%;
		    margin-top: -10px;
		    margin-left: -10px;
		    background-color: #00d9fd;
		    box-shadow: 0px 0px 55px 7px #00d9fd;
		    position: absolute;
		    border-radius: 50%;
		    opacity: .3;
		    animation: btfade 2s linear 0s infinite alternate;
		}
		.bottom-round {
			border-radius: 50%;
			background-color: #77d0e8;
			width: 400px;
			height: 400px;
			position: absolute;
			top: 50%;
			left: 50%;
			margin-top: -200px;
			margin-left: -200px;
			transform: translateZ(-760px) translateY(-280px);
			.rdb {
				width: 330px;
				height: 330px;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translateX(-50%) translateY(-50%);
				background-color: #000;
				border-radius: 50%;
			}
		}
	}
	@keyframes btfade {
		from { opacity: 0.3 }
		to { opacity: .8 }
	}
	@keyframes delay {
		0% {opacity: 0;}
		65% {opacity: 0;}
		100% {opacity: 1;}
	}
</style>
