<template>
	<div class="bottom-cell">
		<div class="b-split"><i class="b-ball" :style="'animation-delay: ' + Math.random().toFixed(2) + 's'"></i></div>
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
			width: 500px;
			height: 3px;
			border-radius: 100%;
			box-shadow: 0px 0px 20px 0px #55E2F9;
			display: flex;
			align-items: center;
			.b-ball {
				display: inline-block;
				border-radius: 50%;
				width: 13px;
				height: 13px;
				background-color: #03afdf;
				animation: bslippage 2s linear 0s infinite alternate;
			}
		}
	}
	@keyframes slippage {
		0% {transform: translateX(0);}
		25% {transform: translateX(50px);}
		50% {transform: translateX(100px);}
		75% {transform: translateX(150px);}
		100% {transform: translateX(200px);}
	}
</style>