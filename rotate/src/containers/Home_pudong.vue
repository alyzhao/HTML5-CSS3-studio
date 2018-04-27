<template>
	<div class="center-wrap"
		@mousemove="moveRotate($event)"
		@mousedown="unShow()"
		@mouseup="msUpRotate($event)">
		<div class="center-img">
			<p class="word left-word">{{leftWord}}</p>
			<p class="word center-word">{{centerWord}}</p>
			<p class="word right-word">{{rightWord}}</p>
			<div class="left-img">
				<p class="word top-left-word">{{topLeftWord}}</p>
				<div class="left-board">
					<div class="con">
						<p>政府决策科学化</p>
						<p>社会治理精准化</p>
						<p>公共服务高效化</p>
					</div>
					<div class="borad-split"></div>
				</div>
			</div>
			<div class="right-img">
				<p class="word top-right-word">{{topRightWord}}</p>
			</div>
			<div class="right-line">
				<extend-line :width="280" :height="20"></extend-line>
			</div>
			<div class="left-line">
				<extend-line :width="390" :height="20"></extend-line>
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
		</div>
		<div class="center" ref="center_el"
			:class="{ drag: dragAble }"
			:style="'transform: translateZ(-200px) rotateX(66deg) rotateY(-15deg) rotateZ(' + rotateAngle + 'deg)'">
			<rotate-cell v-for="(item, index) in datas"
				:key="index + 'ex'"
				:name="item.name"
				:value="item.value"
				:style="'transform: translateY(-50%) rotateZ(' + anguleInterval * index + 'deg)'"
				:warning="item.warning"
				@click.native="clickRotate(index, $event)"
				@mousedown.native="msDownRotate($event)">
			</rotate-cell>
		</div>
		<div class="center"
			:style="'z-index: -1;transform: translateZ(-200px) rotateX(65deg) rotateY(-15deg) rotateZ(' + rotateBottomAngle + 'deg)'">
			<div v-for="n in 230" class="scale" 
				:style="'transform: translateY(-100px) translateX(12px) translateZ(' + (-n * 2 - 150) + 'px)'">
			</div>
			<div class="bottom-round" :style="'transform: translateZ(-760px) translateY(-280px) rotateZ(' + bRotateAngle + 'deg)'">
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
					value: '12345热线'
				}, {
					name: 1,
					value: '大调研'
				}, {
					name: 2,
					value: '共享单车'
				}, {
					name: 3,
					value: '渣土治理'
				}, {
					name: 4,
					value: '食品安全'
				}, {
					name: 5,
					value: '河长制'
				}, {
					name: 6,
					value: '无违建村居创建'
				}, {
					name: 7,
					value: '智慧美丽家园'
				}, {
					name: 8,
					value: '群租治理'
				}, {
					name: 9,
					value: '节日保障'
				}, {
					name: 10,
					value: '重点区域大客流'
				}, {
					name: 11,
					value: '防台防汛'
				}, {
					name: 12,
					value: '应急管理'
				}, {
					name: 13,
					value: '危化品生产存储运输使用'
				}],
				bDatas: [{
					name: 0,
					value: '城市安全'
				}, {
					name: 1,
					value: '城市运维'
				}, {
					name: 2,
					value: '城市交通',
					warning: false
				}, {
					name: 3,
					value: '城市执法'
				}, {
					name: 4,
					value: '税务局'
				}, {
					name: 5,
					value: '城市设施'
				}],
				rotateAngle: 0,
				dragAble: false,
				mouseUp: false,
				coordinateStart: null,
				coordinateEnd: null,
				rotateBottomAngle: 0,
				centerShow: false,
				centerContent: null,
				bRotateAngle: 0,
				leftWord: "",
				centerWord: "",
				rightWord: "",
				topLeftWord: "",
				topRightWord: ""
			}
		},
		mounted() {
			this.$nextTick(function() {
				// setTimeout(() => {
				// 	this.bDatas[6].warning = true;
				// 	let _index = [];
				// 	let res = this.bDatas.filter((item, index) => {
				// 		if (item.warning) {
				// 			_index.push(index);
				// 			return true;
				// 		} else {
				// 			return false;
				// 		}
				// 	});
				// 	let deg = 90 - _index[0] * this.bAnguleInterval;
				// 	this.bDatas[_index[0]].value += '( 警告警告！！！！！！)'
				// 	this.bRotateAngle = deg;
				// 	console.log(this.bDatas);


				// 	this.datas[7].warning = true;

				// 	this.rotateAngle = 90 - 7 * this.anguleInterval;

				// 	this.datas[7].value += ' (警告警告！！！！！！)';

				// }, 5000)
			})
		},
		methods: {
			clickRotate(index, e) {
				console.log('click');
				e.preventDefault();
				e.stopPropagation();
				let rotation = 90 - index * this.anguleInterval
				this.rotateAngle = rotation;
				// this.centerShow = true;
				// this.centerContent = this.datas[index];
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
			loadData() {

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
		background: transparent url('../assets/img/center-empty.png') no-repeat;
		background-size: 1000px;
		z-index: 2;
		transform-style: preserve-3d;
		.word {
			color: #185759;
			font-size: 30px;
			font-weight: bold;
			margin: 0;
			position: absolute;
			text-align: center;
			&.left-word {
				bottom: 160px;
				left: 44px;
				width: 190px;
				transform: rotateZ(3deg);
			}
			&.center-word {
			    left: 303px;
			    top: 260px;
			    width: 300px;
			    font-size: 36px;				
			}
			&.right-word {
				right: 59px;
				top: 244px;
				width: 200px;
				transform: rotateZ(3deg);				
			}
			&.top-left-word {
			    top: 86px;
			    left: 45px;
			    width: 208px;
			    transform: rotateZ(3deg);				
			}
			&.top-right-word {
			    right: 18px;
			    top: 170px;
			    transform: rotateZ(-7deg);
			    width: 255px;				
			}
		}
	}
	.left-img {
		width: 400px;
		height: 200px;
		position: absolute;
		background: transparent url('../assets/img/left-img-empty.png') no-repeat;
		background-size: 195px;
		top: -305px;
		left: -52px;
	}
	.left-board {
		border-radius: 5px;
		border: 2px solid #75f1ff;
		transform: translate3d(-451px, -75px, 0) translateZ(1px);
		user-select: none;
		width: 400px;
		&.cb {
			width: 300px;
			transform: translate3d(67px, 1058px, 0) rotateY(11deg) translateZ(-150px);
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
		.borad-split {
			position: absolute;
			z-index: 11;
			right: 0;
			top: 50%;
			transform: translateY(-50%);
			width: 5px;
			height: 70px;
			background-color: #fff;
		}
		.con {
			background-color: #75daea;
			margin: 20px 20px;
			border-radius: 5px;
			box-shadow: 0px 0px 55px 7px #00d9fd;
			p {
			    margin: 0;
			    text-align: left;
			    padding: 25px 33px;
			    display: flex;
			    align-items: center;
			    justify-content: center;
			    font-size: 30px;
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
	    background: transparent url('../assets/img/right-img-empty.png') no-repeat;
	    background-size: 360px;
	    top: -340px;
	    left: 660px;
	}
	.right-line {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateX(94px) translateY(-139px) rotateZ(-50deg);
	}
	.left-line {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateX(-123px) translateY(-134px) rotateZ(-133deg);
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
				background-color: #fff;
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
