var dropdownMenus = document.querySelectorAll('.menu_dropdown');

dropdownMenus.forEach(menu => {
    menu.parentElement.classList.add('menu__item_has_dropdown');
});
