<template>
	<div class="rotate-cell">
		<div class="split"><i class="ball" :style="'animation-delay: ' + Math.random().toFixed(2) * 4 + 's'"></i></div>
		<div class="tag" :name="name" :class="{ 'warning': warning}">{{value}}</div>
	</div>
</template>
<script>
	export default {
		props: ['name', 'value', 'warning']
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
		padding-left: 280px;
		user-select: none;
		cursor: pointer;
		.split {
			background-color: #55E2F9;
			width: 308px;
			height: 5px;
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
				animation: slippage 3s linear 0s infinite alternate; 
			}
		}
		.tag {
			color: #07313c;
			width: 190px;
			height: 80px;
			font-size: 16px;
			text-align: center;
			border: 4px solid #58dee9;
			background-color: #03afdf;
			margin-left: 15px;
			white-space: nowrap;
			font-weight: bold;
			line-height: 80px;
			overflow: hidden;
			&.warning {
				background-color: #ea4141;
			}
		}
	}
	@keyframes slippage {
		0% {transform: translateX(0);}
		25% {transform: translateX(77px);}
		50% {transform: translateX(154px);}
		75% {transform: translateX(231px);}
		100% {transform: translateX(308px);}
	}
</style>