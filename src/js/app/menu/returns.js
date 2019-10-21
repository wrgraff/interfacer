addReturns(document.querySelectorAll('.menu_dropdown'));

function addReturns(menus) {
	menus.forEach(menu => {
		let returnItem = addElement('li', 'menu__item menu__item_return');
		let returnButton = addElement('button', 'menu__return');
		returnButton.textContent = '< Вернуться';

		returnButton.addEventListener('click', () => {
			// find parent link to focus it if button in more then 2 level of menu:
			// Focus that link cause focus on it make submenu visible
			let childrenOfParent = menu.parentNode.parentNode.parentNode.children;
			let parentLink;
			for (child of childrenOfParent) {
				if (child.classList.contains('menu__link')) {
					parentLink = child;
					break;
				}
			}
			if (parentLink) {
				parentLink.focus();
				parentLink.removeEventListener('click', onFirsTap);
			} else {
				menu.parentNode.querySelector('a').blur();
			}
		});

		returnItem.append(returnButton);
		menu.prepend(returnItem);
	});
};
