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
				<extend-line :width="180" :height="10"></extend-line>
			</div>
			<div class="left-line">
				<extend-line :width="220" :height="10"></extend-line>
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
			<!-- <div v-for="n in 40" class="scale" :style="'transform: translateY(-100px) translateX(-5px) translateZ(' + (-n * 5 - 150) + 'px)'"></div> -->
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
	    width: 380px;
	    height: 240px;
	    position: absolute;
	    top: 50%;
	    left: 50%;
	    margin-top: -110px;
	    margin-left: -190px;
		background: transparent url('../assets/img/center.png') no-repeat;
		background-size: 380px;
		z-index: 2;
		transform-style: preserve-3d;
	}
	.left-img {
		width: 200px;
		height: 100px;
		position: absolute;
		background: transparent url('../assets/img/left-img.png') no-repeat;
		background-size: 200px;
		top: -170px;
		left: -80px;
	}
	.left-board {
		border-radius: 5px;
		border: 2px solid #75f1ff;
		transform: translate3d(-200px, -115px, 0) rotateY(30deg) translateZ(-280px);
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
		width: 180px;
	    height: 170px;
	    position: absolute;
	    background: transparent url('../assets/img/right-img.png') no-repeat;
	    background-size: 170px;
	    top: -170px;
	    left: 330px;
	}
	.right-line {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateX(54px) translateY(-46px) rotateZ(-43deg);
	}
	.left-line {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateX(-34px) translateY(-56px) rotateZ(-135deg);
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
		    width: 1025px;
		    height: 644px;
		    transform: translate3d(-438px, -500px, 1px);
		    background: radial-gradient(ellipse at top left, rgba(222, 11, 70, 0.26) -160%, rgba(255, 255, 255, 0) 103%), -webkit-radial-gradient(center, ellipse cover, #0C1019 0%, #0B0B0E 100%);
		    border-radius: 50% 50% 0 0;
		}
		&.drag {
			transition-duration: 0 !important;
		}
		.scale {
			width: 20px;
		    height: 20px;
		    top: 50%;
		    left: 50%;
		    margin-top: -10px;
		    margin-left: -10px;
		    background-color: #00d9fd;
		    box-shadow: 0px 0px 55px 7px #00d9fd;
		    position: absolute;
		    border-radius: 50%;
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
			transform: translateZ(-380px) translateY(-140px);
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
	@keyframes delay {
		0% {opacity: 0;}
		65% {opacity: 0;}
		100% {opacity: 1;}
	}
</style>
