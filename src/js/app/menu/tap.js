listenTapDropdowns(document.querySelectorAll('.menu__item_dropdown a'));

function listenTapDropdowns(items) {
	items.forEach(item => {
		item.addEventListener('click', onFirsTap);
	});
}

function onFirsTap(evt) {
	if (window.USER_CAN_HOVER !== true) {
		console.log('prevent default');
		evt.preventDefault();
		this.removeEventListener('click', onFirsTap);
		this.focus();

		this.addEventListener('blur', () => {
			this.addEventListener('click', onFirsTap);
		});
	};
};
