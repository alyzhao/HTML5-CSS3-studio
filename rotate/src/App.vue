<template>
	<div id="main">
		<router-view/>
	</div>
</template>
<script>
	export default {
		name: 'app'
	}
</script>
<style lang="scss">
	html, body {
		height: 100%;
	}
	#main {
		width: 100%;
		height: 100%;
		position: relative;
		background: rgba(0, 0, 0, 0);
		overflow: hidden;

		perspective: 800px;
		perspective-origin: 50% 50%;
		transform-style: preserve-3d;
		backface-visibility: hidden;
	}
</style>