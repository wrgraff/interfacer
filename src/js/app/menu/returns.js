if ( md.mobile() ) {
	addReturns(document.querySelectorAll('.menu_dropdown'));
};

function addReturns(menus) {
	menus.forEach(menu => {
		let returnItem = addElement('li', 'menu__item menu__item_return');
		let returnButton = addElement('button', 'menu__return');
		returnButton.innerHTML = '<span class="visually-hidden">Вернуться</span>';

		returnButton.addEventListener('click', (evt) => {
			evt.preventDefault();
			returnButton.parentNode.parentNode.parentNode.classList.remove('menu__item_opened');
		});

		returnItem.append(returnButton);
		menu.prepend(returnItem);
	});
};
