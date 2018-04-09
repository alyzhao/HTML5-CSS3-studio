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
		padding-left: 225px;
		user-select: none;
		cursor: pointer;
		.split {
			background-color: #55E2F9;
			width: 222px;
			height: 3px;
			border-radius: 100%;
			box-shadow: 0px 0px 20px 0px #55E2F9;
			display: flex;
			align-items: center;
			.ball {
				display: inline-block;
				border-radius: 50%;
				width: 7px;
				height: 7px;
				background-color: #03afdf;
				animation: slippage 3s linear 0s infinite alternate; 
			}
		}
		.tag {
		    color: #07313c;
		    width: 145px;
		    height: 55px;
		    font-size: 14px;
		    text-align: center;
		    border: 4px solid #58dee9;
		    background-color: #03afdf;
		    margin-left: 8px;
		    white-space: nowrap;
		    font-weight: bold;
		    line-height: 50px;
		    overflow: hidden;
	        white-space: normal;
			&.warning {
				background-color: #ea4141;
			}
		}
	}
	@keyframes slippage {
		0% {transform: translateX(0);}
		25% {transform: translateX(55px);}
		50% {transform: translateX(111px);}
		75% {transform: translateX(166px);}
		100% {transform: translateX(222px);}
	}
</style>