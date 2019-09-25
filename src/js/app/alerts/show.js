var showAlert = function(text, closeText) {
    var activeElement = document.activeElement;

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
        alertButton.focus();
    }, 10);

    alertButton.addEventListener('click', () => {
        alertWindow.classList.remove('alert_faded');
        setTimeout(function() {
            alertWindow.remove();
            activeElement.focus();
        }, 250);
    });
};
