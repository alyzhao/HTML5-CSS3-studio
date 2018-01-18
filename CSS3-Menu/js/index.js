let element = document.querySelectorAll('.future_ui__piece');
let element_center = document.querySelector('.center');
console.log(element_center);

let t_start = 'translateY(-50%) translateZ(-870px) rotateX(69deg) rotateY(-26deg) scale(0.9)';




let centerDeg = [];

for (let i = 0, len = element.length; i < len; i++) {
	centerDeg.push(90 - i * 10);
	element[i].addEventListener('click', function() {
		let transform = element_center.style.transform;
		console.log(transform);
		console.log(this);
		let index = this.getAttribute('idx');
		console.log('index', index);
		if (transform == '') {
			element_center.style.transform = t_start + `rotateZ(${centerDeg[index]}deg)`
		} else {
			let rotate_now = /rotateZ\((\d+)deg\)/g.exec(transform)[1];
			// let rotate_r = (90 - index * 10 - rotate_now) % 360;
			let rotate_r = centerDeg[index];
			console.log('rotate_r', rotate_r);
			console.log('rotate_now', rotate_now);
			element_center.style.transform = t_start + ` rotateZ(${rotate_r}deg)`		
		}

	})
}


console.log(element);