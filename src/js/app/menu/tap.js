if ( md.mobile() ) {
	listenTapDropdowns(document.querySelectorAll('.menu__item_dropdown a'));
};

function listenTapDropdowns(items) {
	items.forEach(item => {
		item.addEventListener('click', (evt) => {
			if ( !item.parentNode.classList.contains('menu__item_opened') ) {
				evt.preventDefault();
				item.parentNode.classList.add('menu__item_opened');
			};
		});
	});
};
