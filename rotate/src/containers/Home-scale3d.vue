<template>
	<div class="center-wrap"
		@mousemove="moveRotate($event)"
		@mousedown="unShow()"
		@mouseup="msUpRotate($event)">
		<div class="center-img" style="transform: scale3d(.6, .6, .6)">
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
				<extend-line :width="439" :height="20"></extend-line>
			</div>
			<div v-if="centerShow" class="left-board cb">
				<div class="split-left"></div>
				<div class="con">
					<p><i class="icon icon-people"></i>{{centerContent.value}}</p>
					<p><i class="icon icon-company"></i>{{centerContent.value}}</p>
					<p><i class="icon icon-other"></i>{{centerContent.value}}</p>
				</div>
			</div>
		</div>
		<div class="center" style="transform: translateZ(-200px) rotateX(66deg) rotateY(-15deg) rotateZ(0deg);z-index: 1; scale3d(.7, .7, .7)">
			<div class="op"></div>
		</div>
		<div class="center" ref="center_el"
			:class="{ drag: dragAble }"
			:style="'transform: translateZ(-200px) rotateX(66deg) rotateY(-15deg) rotateZ(' + rotateAngle + 'deg)  scale3d(.7, .7, .7)'">
			<rotate-cell v-for="(item, index) in datas"
				:key="item.name"
				:name="item.name"
				:value="item.value"
				:style="'transform: translateY(-50%) rotateZ(' + anguleInterval * index + 'deg)'"
				:warning="item.warning"
				@click.native="clickRotate(index, $event)"
				@mousedown.native="msDownRotate($event)">
			</rotate-cell>
		</div>
		<div class="center"
			:style="'z-index: -1;transform: translateZ(-200px) rotateX(65deg) rotateY(-15deg) rotateZ(' + rotateBottomAngle + 'deg)  scale3d(.7, .7, .7)'">
			<div v-for="n in 230" class="scale" 
				:style="'transform: translateY(-100px) translateX(12px) translateZ(' + (-n * 2 - 150) + 'px)'">
			</div>
			<div class="bottom-round" :style="'transform: translateZ(-760px) translateY(-280px) rotateZ(' + bRotateAngle + 'deg)  scale3d(.7, .7, .7)'">
				<div class="rdb"></div>
				<bottom-rotate-cell v-for="(item, index) in bDatas"
					:key="item.name"
					:value="item.value"
					:warning="item.warning"
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
					value: '12345'
				}, {
					name: 1,
					value: '大调研'
				}, {
					name: 2,
					value: '渣土'
				}, {
					name: 3,
					value: '危化品'
				}, {
					name: 4,
					value: '群租'
				}, {
					name: 5,
					value: '大客流'
				}, {
					name: 6,
					value: ''
				}, {
					name: 7,
					value: '',
				}, {
					name: 8
				}, {
					name: 9,
					value: ''
				}],
				bDatas: [{
					name: 0,
					value: ''
				}, {
					name: 1,
					value: ''
				}, {
					name: 2,
					value: '',
					warning: false
				}, {
					name: 3,
					value: ''
				}, {
					name: 4,
					value: ''
				}, {
					name: 5,
					value: ''
				}, {
					name: 6,
					value: ''
				}, {
					name: 7,
					value: ''
				}],
				rotateAngle: 0,
				dragAble: false,
				mouseUp: false,
				coordinateStart: null,
				coordinateEnd: null,
				rotateBottomAngle: 0,
				centerShow: false,
				centerContent: null,
				bRotateAngle: 0
			}
		},
		mounted() {
			// this.$nextTick(function() {
			// 	setTimeout(() => {
			// 		this.bDatas[6].warning = true;
			// 		let _index = [];
			// 		let res = this.bDatas.filter((item, index) => {
			// 			if (item.warning) {
			// 				_index.push(index);
			// 				return true;
			// 			} else {
			// 				return false;
			// 			}
			// 		});
			// 		let deg = 90 - _index[0] * this.bAnguleInterval;
			// 		this.bRotateAngle = deg;
			// 		console.log(this.bDatas);


			// 		this.datas[7].warning = true;

			// 		this.rotateAngle = 90 - 7 * this.anguleInterval;
			// 	}, 5000)
			// })
		},
		methods: {
			clickRotate(index, e) {
				e.preventDefault();
				e.stopPropagation();
				let rotation = 90 - index * this.anguleInterval
				this.rotateAngle = rotation;
				this.centerShow = true;
				this.centerContent = this.datas[index];
				console.log(this.centerShow);
				console.log(this.centerContent);
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
		watch: {
			bDatas: function(value) {
				let _index = [];
				let res = this.bDatas.filter((item, index) => {
					if (item.warning) {
						_index.push(index);
						return true;
					} else {
						return false;
					}
				});
				console.log(res);
				console.log(_index);
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
		top: -305px;
		left: -135px;
	}
	.left-board {
		border-radius: 5px;
		border: 2px solid #75f1ff;
		transform: translate3d(-362px, -25px, 0) rotateY(5deg) translateZ(1px);
		user-select: none;
		width: 300px;
		&.cb {
			width: 300px;
			transform: translate3d(100px, 774px, 0) rotateY(11deg) translateZ(-150px);
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
			    padding: 10px 33px;
			    display: flex;
			    align-items: center;
			    justify-content: center;
			    width: 230px;
			    font-size: 22px;
			    .icon {
			    	flex-grow: .5;
			    	font-size: 30px;
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
			transition: all ease 0.3s;
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
