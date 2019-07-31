// Prepare links for micromodal: get href to data-attribute
const microModalLinks = document.querySelectorAll('a[data-modal]');
microModalLinks.forEach((link) => {
    link.dataset.modal = link.getAttribute('href').replace('#', '');
});

MicroModal.init({
    // onShow: modal => console.info(`${modal.id} is shown`),
    // onClose: modal => console.info(`${modal.id} is hidden`),
    openTrigger: 'data-modal',
    closeTrigger: 'data-modal-close'
    // disableScroll: true,
    // disableFocus: false,
    // awaitCloseAnimation: false,
    // debugMode: true
});
