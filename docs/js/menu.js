const menu = document.querySelector('#menu');
const pageAddress = window.location.pathname;
const menuItems = [
    {
        name: 'Alerts',
        href: 'alerts'
    },{
        name: 'Controls',
        href: 'controls'
    },{
        name: 'Forms',
        href: 'forms'
    },{
        name: 'Form validation',
        href: 'form-validation'
    },{
        name: 'Icons',
        href: 'ico'
    },{
        name: 'Buttons',
        href: 'buttons'
    },{
        name: 'Button groups',
        href: 'button-groups'
    },{
        name: 'Ico buttons',
        href: 'ico-buttons'
    },{
        name: 'Lists',
        href: 'lists'
    },{
        name: 'Modals',
        href: 'micromodal'
    },{
        name: 'Headers',
        href: 'headers'
    },{
        name: 'Menu',
        href: 'menu'
    },{
        name: 'Breadcrumbs',
        href: 'breadcrumbs'
    },{
        name: 'Sections',
        href: 'sections'
    },{
        name: 'Grid',
        href: 'grid'
    }
];

menuItems.forEach((item) => {
    let itemContainer = addElement('li', 'menu__item');
    if ( pageAddress.replace(/\//g, '') == item.href ) {
        itemContainer.classList.add('menu__item_active');
    };
    let itemLink = addElement('a', 'menu__link');
    itemLink.setAttribute('href', '/' + item.href + '/');
    itemLink.innerHTML = item.name;
    itemContainer.append(itemLink);
    menu.append(itemContainer);
});
