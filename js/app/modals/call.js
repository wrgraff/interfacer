// Get elements
var modalButtons = document.querySelectorAll('[data-modal]'),
    modalCloseButtons = document.querySelectorAll('[data-modal-close]'),
    modalWindow = document.querySelector('[data-modal-window]'),
    modalAside = document.querySelector('[data-modal-aside]'),
    modalContents = document.querySelector('[data-modal-contents]'),
    modalMask = document.querySelector('[data-modal-mask]');

// Show modal
var toggleActive = function(element) {
    element.classList.toggle(element.classList.item(0) + '_active');
};
var toggleModal = function(container) {
    console.log('toggle modal ' + container);
    toggleActive(container);
    toggleActive(modalMask);
};

// Load content
var closeModal = function(container, closeButton) {
    setTimeout(function() {
        container.querySelector('[data-modal-container]').innerHTML = '';
    }, 250);
    toggleModal(container);
};
var loadContent = function(button, element, source, container) {
    // Get element id
    if (element === 'A') {
        var content = document.querySelector(button.getAttribute('href'));
    } else {
        var content = document.querySelector('#' + button.dataset.modal);
    };
    console.log('content id: ' + content);

    // Load content to container
    var contentHtml = content.innerHTML;
    container.querySelector('[data-modal-container]').innerHTML = contentHtml;
};

// Listen to events
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
modalCloseButtons.forEach((closeButton) => {
    closeButton.addEventListener('click', () => {
        toggleModal(container);
    }, false);
});
modalMask.addEventListener('click', function() {
    toggleModal(container);
}, false);
