addDropdowns(document.querySelectorAll('[data-dropdown]'));

function addDropdowns(menus) {
	menus.forEach(menu => {
		let submenus = menu.querySelectorAll('.menu');

		for (submenu of submenus) {
			submenu.classList.add('menu_dropdown');
			submenu.parentNode.classList.add('menu__item_dropdown');
		};
	});
};
