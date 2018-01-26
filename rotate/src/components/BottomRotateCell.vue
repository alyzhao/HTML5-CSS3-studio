<template>
	<div class="bottom-cell">
		<div class="b-split"></div>
		<i class="b-ball" :style="'animation-delay: ' + Math.random().toFixed(2) * 4 + 's'"></i>
		<div class="b-tag" :name="name">{{value}}</div>
	</div>
</template>
<script>
	export default {
		props: ['name', 'value']
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
		padding-left: 100px;
		height: 50px;
		margin-top: -25px;
		.b-split {
			background-color: #55E2F9;
			width: 250px;
			height: 3px;
			border-radius: 100%;
			box-shadow: 0px 0px 20px 0px #55E2F9;
			display: flex;
			align-items: center;
			opacity: 0.3;
		}
		.b-ball {
			display: inline-block;
		    border-radius: 50%;
		    width: 10px;
		    height: 10px;
		    background-color: #74feff;
		    animation: bslippage 5s linear 0s infinite alternate;
		    position: absolute;
		    left: 100px;
		}
		.b-tag {
			color: #333;
		    opacity: .8;
		    font-size: 14px;
		    text-align: center;
		    background-color: #9de0f3;
		    margin-left: 5px;
		    white-space: nowrap;
		    font-weight: bold;
		    border-radius: 50%;
		    width: 70px;
		    height: 70px;
		    line-height: 70px;
		}
	}
	@keyframes bslippage {
		0% {transform: translateX(0);}
		25% {transform: translateX(62px);}
		50% {transform: translateX(125px);}
		75% {transform: translateX(188px);}
		100% {transform: translateX(250px);}
	}
</style>
