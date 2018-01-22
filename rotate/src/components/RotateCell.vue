<template>
	<div class="rotate-cell">
		<div class="split"></div>
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
		.split {
			background-color: #55E2F9;
			width: 200px;
			height: 3px;
			border-radius: 100%;
			box-shadow: 0px 0px 20px 0px #55E2F9;
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
</style>