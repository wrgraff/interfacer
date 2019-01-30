var buttonCallModal = document.querySelector('[data-modal]'),
    pageModal = document.querySelector('.page-modal');

var mask = addElement('div', 'page-mask');
document.querySelector('.page-layout').append(mask);

function toggleModal() {
    pageModal.classList.toggle('page-modal_active');
    mask.classList.toggle('page-mask_active');
};
buttonCallModal.addEventListener('click', toggleModal, false);
mask.addEventListener('click', toggleModal, false);
