<template>
	<div class="extend" :style="'height: ' + height + 'px'">
		<div v-for="n in num" :key="n" class="grain" :style="'background-color: ' + color + '; transform: translateX(' + n * 2 + 'px); animation-delay: ' + n * 0.1 +'s'">
			
		</div>
	</div>
</template>
<script>
	// default width: 5px
	export default {
		props: {
			width: Number,	// the length of whole line
			height: {
				type: [Number, String],
				default: 5
			},
			delay: {
				type: Number,
				default: 0.3
			},
			color: {
				type: String,
				default: '#55E2F9'
			}
		},
		computed: {
			num() {
				return Math.floor(this.width / 2)
			}
		}
	}
</script>
<style lang="scss">
	.extend {
		position: absolute;
		width: 5px;
		top: 50%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);
		.grain {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			transform-origin: center center;
			animation: fade 20s linear 0s infinite  alternate;
			opacity: 0.1;
			box-shadow: 0px 0px 20px 0px #55E2F9;
		}
	}
	@keyframes fade {
		0% { opacity: 0; }
		50% { opacity: 0.5; }
		100% { opacity: 0; }
	}
</style>