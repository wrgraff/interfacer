var modals = function() {
    // Get elements
    var modalButtons = document.querySelectorAll('[data-modal]');
    console.log(modalButtons);

    createModalWindow();

    var element, source, container;
    modalButtons.forEach((button) => {
        button.addEventListener('click', function() {
            element = button.tagName,
            source = button.dataset.modalSource || 'inline',
            container = document.querySelector('[data-modal-' + (button.dataset.modalContainer || 'window') + ']');

            console.log('element: ' + element + ', source: ' + source + ', container: ' + container);

            toggleModal(container);
            loadContent(button, element, source, container);

            var innerCloseButtons = container.querySelector('[data-modal-container]').querySelectorAll('[data-modal-close]');
            innerCloseButtons.forEach((innerCloseButton) => {
                innerCloseButton.addEventListener('click', () => {
                    toggleModal(container);
                }, false);
            });

        });
    });
};
var createModalWindow = function() {
    var modalWindow = addElement('div', 'modal-window'),
        modalMask = addElement('div', 'modal-mask');

    modalWindow.append(addElement('div', 'modal-window__container'));

    var modalClose = addElement('div', 'modal-modal-window__close');
    modalClose.innerHTML = '<button type="button" class="ico-button"><span class="ico"><img src="/img/ico/baseline-close-24px.svg" alt="Иконка закрытия" /></span></button>';
    modalWindow.append(modalClose);

    document.body.append(modalWindow);
    document.body.append(modalMask);
};

var callModal = function() {

};
var toggleActive = function(element) {
    element.classList.toggle(element.classList.item(0) + '_active');
};
var toggleModal = function(container) {
    console.log('toggle modal ' + container);
    toggleActive(container);
    toggleActive(modalMask);
};

    // modalCloseButtons = document.querySelectorAll('[data-modal-close]'),
    // modalAside = document.querySelector('[data-modal-aside]'),
    // modalContents = document.querySelector('[data-modal-contents]');


//
// // Show modal

//
// // Load content
// var closeModal = function(container, closeButton) {
//     setTimeout(function() {
//         container.querySelector('[data-modal-container]').innerHTML = '';
//     }, 250);
//     toggleModal(container);
// };
// var loadContent = function(button, element, source, container) {
//     // Get element id
//     if (element === 'A') {
//         var contentAddress = button.getAttribute('href');
//     } else {
//         var contentAddress = button.dataset.modal;
//     };
//     contentAddress = contentAddress.indexOf('#') == 0 ? contentAddress.substring(1) : contentAddress;
//     console.log('content address: ' + contentAddress);
//
//     if (source === 'inline') {
//         var content = document.querySelector('#' + contentAddress);
//
//         // Load content to container
//         var contentHtml = content.innerHTML;
//         container.querySelector('[data-modal-container]').innerHTML = contentHtml;
//     } else if (source === 'iframe') {
//         var containerInner = container.querySelector('[data-modal-container]');
//         containerInner.classList.add('modal-window__container_iframe');
//         var modalFrame = document.createElement('iframe');
//         modalFrame.onload = function() {
//             containerInner.style.width = modalFrame.contentWindow.document.body.clientWidth + 'px';
//             containerInner.style.height = modalFrame.contentWindow.document.body.clientHeight + 'px';
//         };
//         modalFrame.src = contentAddress;
//         modalFrame.classList.add('modal-iframe');
//
//         containerInner.innerHTML = '';
//         containerInner.append(modalFrame);
//     };
// };
//
// // Listen to events

// modalCloseButtons.forEach((closeButton) => {
//     closeButton.addEventListener('click', () => {
//         toggleModal(container);
//     }, false);
// });
// modalMask.addEventListener('click', function() {
//     toggleModal(container);
// }, false);

modals();
