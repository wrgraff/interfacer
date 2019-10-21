window.addEventListener('mouseover', function onFirstHover() {
	window.USER_CAN_HOVER = true;
	window.removeEventListener('mouseover', onFirstHover, false);
}, false);
