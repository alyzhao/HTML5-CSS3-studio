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
		background: radial-gradient(ellipse at top left, rgba(222, 11, 70, 0.26) -160%, rgba(255, 255, 255, 0) 103%), -webkit-radial-gradient(center, ellipse cover, #0C1019 0%, #0B0B0E 100%);
		overflow: hidden;

		perspective: 800px;
		perspective-origin: 50% 50%;
		transform-style: preserve-3d;
		backface-visibility: hidden;
	}
</style>