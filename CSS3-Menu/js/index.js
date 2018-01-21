let element = document.querySelectorAll('.future_ui__piece');
let element_center = document.querySelector('.center');
let t_start = 'translateY(-50%) translateZ(-870px) rotateX(69deg) rotateY(-26deg) scale(0.9)';

let centerDeg = [];

let oldX = null;
let oldY = null;

let centerX = element_center.offsetLeft + element_center.offsetWidth / 2;
let centerY = element_center.offsetTop + element_center.offsetHeight / 2;

let body = document.querySelector('body');

let centerPoint = [centerX, centerY, -870];
let perspective = [body.offsetWidth / 2, - body.offsetHeight / 10, 800];

console.log("centerPoint", centerPoint);
console.log('perspective', perspective);

let y1 = centerPoint[1],
	z1 = centerPoint[2],
	y2 = perspective[1],
	z2 = perspective[2];

// k = (z1 - z2) / (y1 - y2)

// z = k y + b 

// z - z1 = [(z2 - z1) / (y2 - y1)](y - y1)

// y - y1 = [(y2 - y1) / (z2 - z1)](z - z1)

// y = [(y2 - y1) / (z2 - z1)](z - z1) + y1

// y = -z1 * [(y2 - y1) / (z2 - z1)] + y1

let y = -z1 * (y2 - y1) / (z2 - z1) + y1;	// right !

console.log(y);

let origin = { x: 929, y: 100 }
// console.log('origin', origin);
console.log(centerX, centerY);

let start_coor = { x: null, y: null};

let isDown = false;

for (let i = 0, len = element.length; i < len; i++) {
	centerDeg.push(90 - i * 10);
	// element[i].addEventListener('click', function() {
	// 	let transform = element_center.style.transform;
	// 	let index = this.getAttribute('idx');
	// 	if (transform == '') {
	// 		element_center.style.transform = t_start + `rotateZ(${centerDeg[index]}deg)`
	// 	} else {
	// 		let rotate_now = /rotateZ\((\d+)deg\)/g.exec(transform)[1];
	// 		// let rotate_r = (90 - index * 10 - rotate_now) % 360;
	// 		let rotate_r = centerDeg[index];
	// 		element_center.style.transform = t_start + ` rotateZ(${rotate_r}deg)`		
	// 	}

	// })

	element[i].onmousedown = function(e) {
		isDown = true;
		oldX = e.clientX;
		oldY = e.clientY;
		start_coor.x = oldX;
		start_coor.y = oldY;
		// console.log('start_coor', start_coor);
	}
}

let bodyElement = document.querySelector('body');

bodyElement.onmousemove = function(e) {
	if (!isDown) {
		return;
	}
	console.log('mousemove');
	let newX = e.clientX;
	let newY = e.clientY;

	let end_coor = {
		x: newX,
		y: newY
	}

	// console.log('end_coor', end_coor);

	let angle = vectorAngle(origin, start_coor, end_coor);

	// 旋转
	// let transform = element_center.style.transform;
	// if (transform == '') {
	// 	element_center.style.transform = t_start + `rotateZ(${angle}deg)`;
	// } else {
	// 	let rotate_now = /rotateZ\((\d+)deg\)/g.exec(transform)[1];
	// 	let rotate_r = (rotate_now + angle) % 360;		
	// 	element_center.style.transform = t_start + ` rotateZ(${rotate_r}deg)`		
	// }
}

function rotateCenter() {

}


function vector_mold(vector) {
	return Math.sqrt( Math.pow(vector.x, 2) + Math.pow(vector.y, 2) )
}

function vectorAngle(origin, start_coor, end_coor) {
	let vector_start = {
		x: start_coor.x - origin.x,
		y: start_coor.y - origin.y
	}
	let vector_end = {
		x: end_coor.x - origin.x,
		y: end_coor.y - origin.y
	}
	let vector_product = vector_start.x * vector_end.x + vector_start.y * vector_end.y;
	let vector_mold_product = vector_mold(vector_start) * vector_mold(vector_end);
	let cosAngle = vector_product / vector_mold_product;
	let angle = Math.acos(cosAngle); 
	angle = Math.floor(180 / Math.PI * angle); 
	return angle;
}

bodyElement.onmouseup = function(e) {

	let newX = e.clientX;
	let newY = e.clientY;

	let end_coor = {
		x: newX,
		y: newY
	}

	// console.log('mouseup');

	// console.log('end_coor', end_coor);

	let angle = vectorAngle(origin, start_coor, end_coor);
	// console.log('angle', angle);

	let transform = element_center.style.transform;
	if (transform == '') {
		element_center.style.transform = t_start + `rotateZ(${angle}deg)`;
	} else {
		let rotate_now = /rotateZ\((\d+)deg\)/g.exec(transform)[1];
		// console.log('re', parseInt(rotate_now) + parseInt(angle));
		let rotate_r = (parseInt(rotate_now) + parseInt(angle)) % 360;		
		element_center.style.transform = t_start + ` rotateZ(${rotate_r}deg)`		
	}

	isDown = false;
	start_coor.x = null,
	start_coor.y = null;
}


// s 1237 191

// e 1058 355
