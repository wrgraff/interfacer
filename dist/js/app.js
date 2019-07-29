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

var dropdownMenus = document.querySelectorAll('.menu_dropdown');

dropdownMenus.forEach(menu => {
    menu.parentElement.classList.add('menu__item_has_dropdown');
});

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
    var error = input.parentElement.querySelector('.input__error');
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
        input.parentElement.append( addElement('span', 'input__error') );
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


(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.MicroModal = factory());
}(this, (function () { 'use strict';

  var version = "0.3.2";

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  var MicroModal = function () {

    var FOCUSABLE_ELEMENTS = ['a[href]', 'area[href]', 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', 'select:not([disabled]):not([aria-hidden])', 'textarea:not([disabled]):not([aria-hidden])', 'button:not([disabled]):not([aria-hidden])', 'iframe', 'object', 'embed', '[contenteditable]', '[tabindex]:not([tabindex^="-"])'];

    var Modal = function () {
      function Modal(_ref) {
        var targetModal = _ref.targetModal,
            _ref$triggers = _ref.triggers,
            triggers = _ref$triggers === undefined ? [] : _ref$triggers,
            _ref$onShow = _ref.onShow,
            onShow = _ref$onShow === undefined ? function () {} : _ref$onShow,
            _ref$onClose = _ref.onClose,
            onClose = _ref$onClose === undefined ? function () {} : _ref$onClose,
            _ref$openTrigger = _ref.openTrigger,
            openTrigger = _ref$openTrigger === undefined ? 'data-micromodal-trigger' : _ref$openTrigger,
            _ref$closeTrigger = _ref.closeTrigger,
            closeTrigger = _ref$closeTrigger === undefined ? 'data-micromodal-close' : _ref$closeTrigger,
            _ref$disableScroll = _ref.disableScroll,
            disableScroll = _ref$disableScroll === undefined ? false : _ref$disableScroll,
            _ref$disableFocus = _ref.disableFocus,
            disableFocus = _ref$disableFocus === undefined ? false : _ref$disableFocus,
            _ref$awaitCloseAnimat = _ref.awaitCloseAnimation,
            awaitCloseAnimation = _ref$awaitCloseAnimat === undefined ? false : _ref$awaitCloseAnimat,
            _ref$debugMode = _ref.debugMode,
            debugMode = _ref$debugMode === undefined ? false : _ref$debugMode;
        classCallCheck(this, Modal);

        // Save a reference of the modal
        this.modal = document.getElementById(targetModal);

        // Save a reference to the passed config
        this.config = { debugMode: debugMode, disableScroll: disableScroll, openTrigger: openTrigger, closeTrigger: closeTrigger, onShow: onShow, onClose: onClose, awaitCloseAnimation: awaitCloseAnimation, disableFocus: disableFocus

          // Register click events only if prebinding eventListeners
        };if (triggers.length > 0) this.registerTriggers.apply(this, toConsumableArray(triggers));

        // prebind functions for event listeners
        this.onClick = this.onClick.bind(this);
        this.onKeydown = this.onKeydown.bind(this);
      }

      /**
       * Loops through all openTriggers and binds click event
       * @param  {array} triggers [Array of node elements]
       * @return {void}
       */


      createClass(Modal, [{
        key: 'registerTriggers',
        value: function registerTriggers() {
          var _this = this;

          for (var _len = arguments.length, triggers = Array(_len), _key = 0; _key < _len; _key++) {
            triggers[_key] = arguments[_key];
          }

          triggers.filter(Boolean).forEach(function (trigger) {
            trigger.addEventListener('click', function () {
              return _this.showModal();
            });
          });
        }
      }, {
        key: 'showModal',
        value: function showModal() {
          this.activeElement = document.activeElement;
          this.modal.setAttribute('aria-hidden', 'false');
          this.modal.classList.add('is-open');
          this.setFocusToFirstNode();
          this.scrollBehaviour('disable');
          this.addEventListeners();
          this.config.onShow(this.modal);
        }
      }, {
        key: 'closeModal',
        value: function closeModal() {
          var modal = this.modal;
          this.modal.setAttribute('aria-hidden', 'true');
          this.removeEventListeners();
          this.scrollBehaviour('enable');
          if (this.activeElement) {
            this.activeElement.focus();
          }
          this.config.onClose(this.modal);

          if (this.config.awaitCloseAnimation) {
            this.modal.addEventListener('animationend', function handler() {
              modal.classList.remove('is-open');
              modal.removeEventListener('animationend', handler, false);
            }, false);
          } else {
            modal.classList.remove('is-open');
          }
        }
      }, {
        key: 'closeModalById',
        value: function closeModalById(targetModal) {
          this.modal = document.getElementById(targetModal);
          if (this.modal) this.closeModal();
        }
      }, {
        key: 'scrollBehaviour',
        value: function scrollBehaviour(toggle) {
          if (!this.config.disableScroll) return;
          var body = document.querySelector('body');
          switch (toggle) {
            case 'enable':
              Object.assign(body.style, { overflow: '', height: '' });
              break;
            case 'disable':
              Object.assign(body.style, { overflow: 'hidden', height: '100vh' });
              break;
            default:
          }
        }
      }, {
        key: 'addEventListeners',
        value: function addEventListeners() {
          this.modal.addEventListener('touchstart', this.onClick);
          this.modal.addEventListener('click', this.onClick);
          document.addEventListener('keydown', this.onKeydown);
        }
      }, {
        key: 'removeEventListeners',
        value: function removeEventListeners() {
          this.modal.removeEventListener('touchstart', this.onClick);
          this.modal.removeEventListener('click', this.onClick);
          document.removeEventListener('keydown', this.onKeydown);
        }
      }, {
        key: 'onClick',
        value: function onClick(event) {
          if (event.target.hasAttribute(this.config.closeTrigger)) {
            this.closeModal();
            event.preventDefault();
          }
        }
      }, {
        key: 'onKeydown',
        value: function onKeydown(event) {
          if (event.keyCode === 27) this.closeModal(event);
          if (event.keyCode === 9) this.maintainFocus(event);
        }
      }, {
        key: 'getFocusableNodes',
        value: function getFocusableNodes() {
          var nodes = this.modal.querySelectorAll(FOCUSABLE_ELEMENTS);
          return Array.apply(undefined, toConsumableArray(nodes));
        }
      }, {
        key: 'setFocusToFirstNode',
        value: function setFocusToFirstNode() {
          if (this.config.disableFocus) return;
          var focusableNodes = this.getFocusableNodes();
          if (focusableNodes.length) focusableNodes[0].focus();
        }
      }, {
        key: 'maintainFocus',
        value: function maintainFocus(event) {
          var focusableNodes = this.getFocusableNodes();

          // if disableFocus is true
          if (!this.modal.contains(document.activeElement)) {
            focusableNodes[0].focus();
          } else {
            var focusedItemIndex = focusableNodes.indexOf(document.activeElement);

            if (event.shiftKey && focusedItemIndex === 0) {
              focusableNodes[focusableNodes.length - 1].focus();
              event.preventDefault();
            }

            if (!event.shiftKey && focusedItemIndex === focusableNodes.length - 1) {
              focusableNodes[0].focus();
              event.preventDefault();
            }
          }
        }
      }]);
      return Modal;
    }();

    /**
     * Modal prototype ends.
     * Here on code is reposible for detecting and
     * autobinding event handlers on modal triggers
     */

    // Keep a reference to the opened modal


    var activeModal = null;

    /**
     * Generates an associative array of modals and it's
     * respective triggers
     * @param  {array} triggers     An array of all triggers
     * @param  {string} triggerAttr The data-attribute which triggers the module
     * @return {array}
     */
    var generateTriggerMap = function generateTriggerMap(triggers, triggerAttr) {
      var triggerMap = [];

      triggers.forEach(function (trigger) {
        var targetModal = trigger.attributes[triggerAttr].value;
        if (triggerMap[targetModal] === undefined) triggerMap[targetModal] = [];
        triggerMap[targetModal].push(trigger);
      });

      return triggerMap;
    };

    /**
     * Validates whether a modal of the given id exists
     * in the DOM
     * @param  {number} id  The id of the modal
     * @return {boolean}
     */
    var validateModalPresence = function validateModalPresence(id) {
      if (!document.getElementById(id)) {
        console.warn('MicroModal v' + version + ': \u2757Seems like you have missed %c\'' + id + '\'', 'background-color: #f8f9fa;color: #50596c;font-weight: bold;', 'ID somewhere in your code. Refer example below to resolve it.');
        console.warn('%cExample:', 'background-color: #f8f9fa;color: #50596c;font-weight: bold;', '<div class="modal" id="' + id + '"></div>');
        return false;
      }
    };

    /**
     * Validates if there are modal triggers present
     * in the DOM
     * @param  {array} triggers An array of data-triggers
     * @return {boolean}
     */
    var validateTriggerPresence = function validateTriggerPresence(triggers) {
      if (triggers.length <= 0) {
        console.warn('MicroModal v' + version + ': \u2757Please specify at least one %c\'micromodal-trigger\'', 'background-color: #f8f9fa;color: #50596c;font-weight: bold;', 'data attribute.');
        console.warn('%cExample:', 'background-color: #f8f9fa;color: #50596c;font-weight: bold;', '<a href="#" data-micromodal-trigger="my-modal"></a>');
        return false;
      }
    };

    /**
     * Checks if triggers and their corresponding modals
     * are present in the DOM
     * @param  {array} triggers   Array of DOM nodes which have data-triggers
     * @param  {array} triggerMap Associative array of modals and thier triggers
     * @return {boolean}
     */
    var validateArgs = function validateArgs(triggers, triggerMap) {
      validateTriggerPresence(triggers);
      if (!triggerMap) return true;
      for (var id in triggerMap) {
        validateModalPresence(id);
      }return true;
    };

    /**
     * Binds click handlers to all modal triggers
     * @param  {object} config [description]
     * @return void
     */
    var init = function init(config) {
      // Create an config object with default openTrigger
      var options = Object.assign({}, { openTrigger: 'data-micromodal-trigger' }, config);

      // Collects all the nodes with the trigger
      var triggers = [].concat(toConsumableArray(document.querySelectorAll('[' + options.openTrigger + ']')));

      // Makes a mappings of modals with their trigger nodes
      var triggerMap = generateTriggerMap(triggers, options.openTrigger);

      // Checks if modals and triggers exist in dom
      if (options.debugMode === true && validateArgs(triggers, triggerMap) === false) return;

      // For every target modal creates a new instance
      for (var key in triggerMap) {
        var value = triggerMap[key];
        options.targetModal = key;
        options.triggers = [].concat(toConsumableArray(value));
        new Modal(options); // eslint-disable-line no-new
      }
    };

    /**
     * Shows a particular modal
     * @param  {string} targetModal [The id of the modal to display]
     * @param  {object} config [The configuration object to pass]
     * @return {void}
     */
    var show = function show(targetModal, config) {
      var options = config || {};
      options.targetModal = targetModal;

      // Checks if modals and triggers exist in dom
      if (options.debugMode === true && validateModalPresence(targetModal) === false) return;

      // stores reference to active modal
      activeModal = new Modal(options); // eslint-disable-line no-new
      activeModal.showModal();
    };

    /**
     * Closes the active modal
     * @param  {string} targetModal [The id of the modal to close]
     * @return {void}
     */
    var close = function close(targetModal) {
      targetModal ? activeModal.closeModalById(targetModal) : activeModal.closeModal();
    };

    return { init: init, show: show, close: close };
  }();

  return MicroModal;

})));

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


