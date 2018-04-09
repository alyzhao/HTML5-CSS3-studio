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
				<extend-line :width="439" :height="20"></extend-line>
			</div>
			<div v-if="centerShow && centerContent.orgName" class="left-board cb">
				<div class="split-left"></div>
				<div class="con">
					<p><i class="icon icon-people"></i>{{centerContent.dataElementCount}}</p>
					<p><i class="icon icon-company"></i>{{centerContent.dataUseCount}}</p>
					<p><i class="icon icon-other"></i>{{centerContent.dataSupplyCount}}</p>
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
				:key="index + 'ex'"
				:name="item.orgName"
				:value="item.orgName"
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
				datas: [],
				bDatas: [{
					name: 0,
					value: '贵阳市'
				}, {
					name: 1,
					value: '遵义市'
				}, {
					name: 2,
					value: '六盘水市',
					warning: false
				}, {
					name: 3,
					value: '安顺市'
				}, {
					name: 4,
					value: '毕节市'
				}, {
					name: 5,
					value: '铜仁市'
				}, {
					name: 6,
					value: '黔东南州'
				}, {
					name: 7,
					value: '黔南州'
				}, {
					name: 8,
					value: '黔西南州'
				}, {
					name: 9,
					value: '贵安新区'
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
			this.$nextTick(function() {
				this.loadData();

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
				this.centerShow = false;
				// this.centerShow = true;
				this.centerContent = this.datas[index];
				console.log(this.datas);
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
			loadData() {
				var proxy = 'http://service.datav.aliyun.com/transparentProxy/proxy?url=';

				this.axios.get(proxy + 'http://datam.youlishu.com/dataset/json?oid=1406').then(res => {
					let exData = res.data;
					this.axios.get('http://58.16.66.150:90/data/api/dataset/view2017/dataDirectory.html').then(res => {
						let dirData = res.data.data;
						exData.forEach((item, index) => {
							let indexDir = dirData.findIndex(dir => dir.orgName == item.orgName);
							console.log(indexDir);
							if (indexDir >= 0) {
								exData[index].dataElementCount = dirData[indexDir].dataElementCount;
							}
						})
						exData = exData.slice(0, 20);
						this.datas = exData;
					})
				})
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
	    width: 600px;
	    height: 380px;
	    position: absolute;
	    top: 50%;
	    left: 50%;
	    margin-top: -190px;
	    margin-left: -300px;
		background: transparent url('../assets/img/center.png') no-repeat;
		background-size: 600px;
		z-index: 2;
		transform-style: preserve-3d;
	}
	.left-img {
		width: 260px;
		height: 130px;
		position: absolute;
		background: transparent url('../assets/img/left-img.png') no-repeat;
		background-size: 260px;
		top: -215px;
		left: -75px;
	}
	.left-board {
		border-radius: 5px;
		border: 2px solid #75f1ff;
		transform: translate3d(-260px, -25px, 0) rotateY(5deg) translateZ(1px);
		user-select: none;
		width: 180px;
		// &.cb {
		// 	width: 300px;
		// 	transform: translate3d(67px, 1058px, 0) rotateY(11deg) translateZ(-150px);
		// 	animation: delay 3s linear;
		// }
		&.cb {
			width: 300px;
			transform: translate3d(45px, 1349px, -21px) rotateY(11deg) translateZ(-165px);
			animation: delay 3s linear;
		}
		.split-left {
			width: 45px;
		    height: 3px;
		    box-shadow: 0px 0px 55px 7px #00d9fd;
		    background-color: #75daea;
		    position: absolute;
		    right: -57px;
		    top: 50%;
		    margin-top: -2px;

		}
		.con {
			background-color: #75daea;
			margin: 10px;
			border-radius: 5px;
			box-shadow: 0px 0px 55px 7px #00d9fd;
			p {
				margin: 0;
			    text-align: left;
			    padding: 2px 20px;
			    display: flex;
			    align-items: center;
			    justify-content: center;
			    width: 170px;
			    font-size: 16px;
			    .icon {
			    	flex-grow: .5;
			    	font-size: 20px;
			    }
			}
		}
	}
	.right-img {
		width: 240px;
	    height: 225px;
	    position: absolute;
	    background: transparent url('../assets/img/right-img.png') no-repeat;
	    background-size: 240px;
	    top: -310px;
	    left: 590px;
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
