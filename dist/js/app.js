// Site utils
const addElement = function(elTag, elClass) {
    var element = document.createElement(elTag);
    element.className = elClass;

    return element;
};


// Site apps
var showAlert = function(text, closeText) {
    var alertWindow = addElement('div', 'alert');

    var alertText = addElement('div', 'alert__text');
    alertText.innerHTML = text;

    var alertActions = addElement('div', 'alert__actions');
    var alertButton = addElement('button', 'button');
    alertButton.innerHTML = closeText || 'Close';
    alertActions.append(alertButton);

    alertWindow.append(alertText);
    alertWindow.append(alertActions);
    document.body.append(alertWindow);
    setTimeout(function() {
        alertWindow.classList.add('alert_faded');
    }, 10);

    alertButton.addEventListener('click', () => {
        alertWindow.classList.remove('alert_faded');
        setTimeout(function() {
            alertWindow.remove();
        }, 250);
    });
};

var labeledInputs = document.querySelectorAll('.input__field');

var listenLabeledInput = function(input) {
    input.parentElement.classList.add('input_floating');
    if (input.value) {
        input.classList.add('input__field_filled');
    };
    input.addEventListener("change", function( event ) {
        if (this.value == '') {
            this.classList.remove('input__field_filled');
        } else {
            this.classList.add('input__field_filled');
        }
    });
};

labeledInputs.forEach((input) => {
    listenLabeledInput(input);
});

// Get all forms
var validationForms = document.querySelectorAll('[data-validate]');
// console.log('Validation forms:' + validationForms);

// Validation RegExp patterns
var validationPatterns = {
    email: /.+@.+\..+/i,
    phone: /^[0-9-+() ]*$/,
    text: /^[A-Za-zА-Яа-я0-9_-]*$/
};

// Adding error message
var addError = function(input, text) {
    var inputParent = input.parentElement;
    var error = inputParent.querySelector('.input__error');
    error.innerHTML = text;
};

// Check requred status
var checkRequired = function(input) {
    if (input.required && (input.value == '')) {
        // console.log('Required field is false');
        addError(input, 'Необходимо заполнить это поле');
        return false;
    }
    // console.log('Required field is true');
    return true;
};
// Check matching with patterns
var checkPattern = function(input) {
    if (!input.dataset.validatePattern || (input.value == '')) { return true };

    var inputPattern = validationPatterns[input.dataset.validatePattern],
        inputValue = input.value;

    // console.log('Pattern is ' + inputPattern.test(inputValue));
    if (!inputPattern.test(inputValue)) {
        addError(input, 'Использованы недопустимые символы');
    }
    return inputPattern.test(inputValue);
};
// Check input length
var checkLength = function(input) {
    if (!input.dataset.validateLength || (input.value == '')) { return true };

    var inputSize = input.dataset.validateLength,
        inputLength = input.value.length;
    if (inputSize.includes('-')) {
        var inputSizeRanges = inputSize.split('-');
        // console.log('Input length is range from ' + inputSizeRanges[0] + ' to ' + inputSizeRanges[1]);

        if ((inputLength >= inputSizeRanges[0]) && (inputLength <= inputSizeRanges[1])) {
            // console.log('Input length in range from ' + inputSizeRanges[0] + ' to ' + inputSizeRanges[1]);
            return true;
        };
        if (inputLength < inputSizeRanges[0]) {
            addError(input, 'Значение слишком короткое. Минимальное количество символов: ' + inputSizeRanges[0]);
        } else if (inputLength > inputSizeRanges[1]) {
            addError(input, 'Значение слишком длинное. Максимальное количество символов: ' + inputSizeRanges[1]);
        };
        return false;
    };

    if (inputLength >= inputSize) {
        // console.log('Input length more than ' + inputSize);
        return true;
    };
    // console.log('Input length less than ' + inputSize);
    addError(input, 'Значение слишком короткое. Минимальное количество символов: ' + inputSize);
    return false;
};
// Check input range
var checkRange = function(input) {
    if (!input.dataset.validateRange || (input.value == '')) { return true };

    var inputRange = input.dataset.validateRange,
        inputValue = parseInt(input.value);
    if (inputRange.includes('-')) {
        var inputRangeRanges = inputRange.split('-');
        // console.log('Input range from ' + inputRangeRanges[0] + ' to ' + inputRangeRanges[1]);

        if ((inputValue >= inputRangeRanges[0]) && (inputValue <= inputRangeRanges[1])) {
            // console.log('Input value from ' + inputRangeRanges[0] + ' to ' + inputRangeRanges[1]);
            return true;
        };
        if (inputValue < inputRangeRanges[0]) {
            addError(input, 'Значение слишком маленькое. Минимальное значение: ' + inputRangeRanges[0]);
        } else if (inputValue > inputRangeRanges[1]) {
            addError(input, 'Значение слишком большое. Максимальное значение: ' + inputRangeRanges[1]);
        };
        return false;
    };

    if (inputValue >= inputRange) {
        // console.log('Input range more than ' + inputRange);
        return true;
    };
    // console.log('Input range less than ' + inputRange);
    addError(input, 'Значение слишком маленькое. Минимальное значение: ' + inputRange);
    return false;
};

// Validate input
var validateInput = function(input, isHardCheck) {
    // console.log('input on check');
    // Check all validate parameters
    var isInputValid = checkRequired(input) && checkPattern(input) && checkLength(input) && checkRange(input),
        isNotEmpty = input.value || false;

    // Adding classes to inputs
    if (isInputValid && isNotEmpty) {
        input.classList.add('input__field_status_valid');
        input.classList.remove('input__field_status_invalid');
        // console.log('input soft checked ok');
        return true;
    } else if (!isInputValid && isHardCheck) {
        input.classList.remove('input__field_status_valid');
        input.classList.add('input__field_status_invalid');
        // console.log('input hard checked not ok');
        return false;
    } else if (!isInputValid) {
        input.classList.remove('input__field_status_valid');
        // console.log('input soft checked not ok');
        return true;
    };
    return true;
};

// Validate form
var validateForm = function(form) {
    var inputs = form.querySelectorAll('.input__field');
    // console.log(inputs);

    inputs.forEach((input) => {
        // console.log(input);
        input.addEventListener('keyup', function() {
            validateInput(input, false);
        });
        input.addEventListener('click', function() {
            validateInput(input, false);
        });
        input.addEventListener('change', function() {
            validateInput(input, true);
        });
        input.addEventListener('blur', function() {
            validateInput(input, true);
        });
    });

    // Catch submit action
    form.onsubmit = function(e) {
        var isFormValid = true;
        inputs.forEach((input) => {
            if (!validateInput(input, true)) {
                isFormValid = isFormValid && validateInput(input, true);
            }
        });
        return isFormValid;
    };
};
validationForms.forEach((form) => {
    validateForm(form);
});

const switches = document.querySelectorAll('.switch');

var listenSwitch = function(switchButton) {
    switchButton.addEventListener('click', (e) => {
      let pressed = e.target.getAttribute('aria-checked') === 'true';
      e.target.setAttribute('aria-checked', String(!pressed));
    });
};

switches.forEach((switchButton) => {
    listenSwitch(switchButton);
});

var modalCloseButton = '<button type="button" class="ico-button"><span class="ico"><img src="/img/ico/baseline-close-24px.svg" alt="Иконка закрытия" /></span></button>';

var closeWindow = function(modalWindow, modalMask) {
    modalWindow.classList.add('modal-window_closed');
    modalMask.classList.add('modal-mask_closed');

    setTimeout(function() {
        modalWindow.remove();
        modalMask.remove();
    }, 500);
};
var createModalWindow = function(windowContent) {
    var modalWindow = addElement('div', 'modal-window'),
        modalMask = addElement('div', 'modal-mask'),
        modalClose = addElement('div', 'modal-window__close');

    modalClose.innerHTML = modalCloseButton;
    if (windowContent) {
        modalWindow.innerHTML = windowContent;
    } else {
        showAlert('Content for modal window not found');
        return false;
    }
    modalWindow.append(modalClose);

    document.body.append(modalWindow);
    document.body.append(modalMask);

    modalWindow.classList.add('modal-window_opened');
    modalMask.classList.add('modal-mask_opened');
    validateForm(modalWindow);

    modalClose.addEventListener('click', function() {
        closeWindow(modalWindow, modalMask);
    });
    modalMask.addEventListener('click', function() {
        closeWindow(modalWindow, modalMask);
    });
};

var modalButtons = document.querySelectorAll('[data-modal]');
// console.log(modalButtons);
modalButtons.forEach((button) => {
    if (button.tagName === 'A') {
        var contentAddress = button.getAttribute('href');
    } else {
        var contentAddress = button.dataset.modal;
    };
    contentAddress = contentAddress.indexOf('#') == 0 ? contentAddress.substring(1) : contentAddress;
    // console.log('contentAddress: ' + contentAddress);
    var windowContent = document.querySelector('#' + contentAddress) || false;
    // console.log('windowContent: ' + windowContent);
    var windowContentHTML = windowContent.innerHTML;
    // console.log('windowContentHTML: ' + windowContentHTML);

    button.addEventListener('click', function() {
        createModalWindow(windowContentHTML);
    });
});

// var modals = function() {
//     // Get elements
//     var modalButtons = document.querySelectorAll('[data-modal]');
//     console.log(modalButtons);
//
//     createModalWindow();
//
//     var element, source, container;
//     modalButtons.forEach((button) => {
//         button.addEventListener('click', function() {
//             element = button.tagName,
//             source = button.dataset.modalSource || 'inline',
//             container = document.querySelector('[data-modal-' + (button.dataset.modalContainer || 'window') + ']');
//
//             console.log('element: ' + element + ', source: ' + source + ', container: ' + container);
//
//             toggleModal(container);
//             loadContent(button, element, source, container);
//
//             var innerCloseButtons = container.querySelector('[data-modal-container]').querySelectorAll('[data-modal-close]');
//             innerCloseButtons.forEach((innerCloseButton) => {
//                 innerCloseButton.addEventListener('click', () => {
//                     toggleModal(container);
//                 }, false);
//             });
//
//         });
//     });
// };

//
// var callModal = function() {
//
// };
// var toggleActive = function(element) {
//     element.classList.toggle(element.classList.item(0) + '_active');
// };
// var toggleModal = function(container) {
//     console.log('toggle modal ' + container);
//     toggleActive(container);
//     toggleActive(modalMask);
// };

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

// modals();
//

