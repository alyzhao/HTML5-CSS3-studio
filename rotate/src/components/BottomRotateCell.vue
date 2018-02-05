<template>
	<div class="bottom-cell" style="">
		<div class="b-split"></div>
		<i class="b-ball" :style="'animation-delay: ' + Math.random().toFixed(2) * 4 + 's'"></i>
		<div class="b-tag" :class="{ 'warning': warning}" :name="name">{{value}}</div>
	</div>
</template>
<script>
	export default {
		props: ['name', 'value', 'warning', 'rotateDeg']
	}
</script>
<style lang="scss">
	.bottom-cell {
		position: absolute;
		left: 50%;
		perspective-origin: left center;
		display: flex;
		align-items: center;
		justify-content: center;
		transform-origin: left center;
		top: 50%;
		user-select: none;
		padding-left: 200px;
		height: 50px;
		margin-top: -25px;
		.b-split {
			background-color: #55E2F9;
			width: 360px;
			height: 6px;
			border-radius: 100%;
			box-shadow: 0px 0px 20px 0px #55E2F9;
			display: flex;
			align-items: center;
			opacity: 0.3;
		}
		.b-ball {
			display: inline-block;
		    border-radius: 50%;
		    width: 15px;
		    height: 15px;
		    background-color: #74feff;
		    animation: bslippage 5s linear 0s infinite alternate;
		    position: absolute;
		    left: 200px;
		}
		.b-tag {
			color: #333;
		    opacity: .8;
		    font-size: 30px;
		    text-align: center;
		    background-color: #9de0f3;
		    margin-left: 5px;
		    white-space: nowrap;
		    font-weight: bold;
		    border-radius: 50%;
		    width: 140px;
		    height: 140px;
		    line-height: 140px;
		    &.warning {
		    	background-color: #ea4141;
		    }
		}
	}
	@keyframes bslippage {
		0% {transform: translateX(0);}
		25% {transform: translateX(90px);}
		50% {transform: translateX(180px);}
		75% {transform: translateX(270px);}
		100% {transform: translateX(360px);}
	}
</style>
