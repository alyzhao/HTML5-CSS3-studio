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
		width: 500px;
		perspective-origin: left center;
		.split {
			float: left;
			background-color: #55E2F9;
			width: 200px;
			height: 3px;
			border-radius: 100%;
			box-shadow: 0px 0px 20px 0px #55E2F9;
			margin-top: 20px;
		}
		.tag {
			float: left;
			color: #333;
			opacity: .8;
			padding: 10px 30px;
			font-size: 16px;
			text-align: center;
			border: 3px solid #53e3fa;
			background-color: #1e9baf;
			margin-left: 15px;
		}
	}
</style>