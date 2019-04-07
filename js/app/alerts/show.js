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
