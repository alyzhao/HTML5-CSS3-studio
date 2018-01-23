<template>
	<div class="rotate-cell" @click="">
		<div class="split"><i class="ball" :style="'animation-delay: ' + Math.random().toFixed(2) + 's'"></i></div>
		<div class="tag" :name="name">{{value}}</div>
	</div>
</template>
<script>
	export default {
		props: ['name', 'value']
	}
</script>
<style lang="scss">
	.rotate-cell {
		position: absolute;
		left: 50%;
		perspective-origin: left center;
		display: flex;
		align-items: center;
		justify-content: center;
		transform-origin: left center;
		top: 50%;
		padding-left: 125px;
		margin-top: -25px;
		user-select: none;
		.split {
			background-color: #55E2F9;
			width: 200px;
			height: 3px;
			border-radius: 100%;
			box-shadow: 0px 0px 20px 0px #55E2F9;
			display: flex;
			align-items: center;
			.ball {
				display: inline-block;
				border-radius: 50%;
				width: 13px;
				height: 13px;
				background-color: #03afdf;
				animation: slippage 2s linear 0s infinite alternate; 
			}
		}
		.tag {
			color: #056f97;
			opacity: .8;
			padding: 10px 30px;
			font-size: 16px;
			text-align: center;
			border: 3px solid #58dee9;
			background-color: #03afdf;
			margin-left: 15px;
			white-space: nowrap;
			font-weight: bold;
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