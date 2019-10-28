if ( md.mobile() ) {
	addTitles(document.querySelectorAll('.menu__item_dropdown'));
};

function addTitles(items) {
	items.forEach(item => {
		let titleItem = addElement('li', 'menu__item menu__item_title');
		titleItem.append(item.querySelector('a').cloneNode(true));
		item.querySelector('.menu').prepend(titleItem);
	});
};
