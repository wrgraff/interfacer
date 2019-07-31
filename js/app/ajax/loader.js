findAjaxLinks(document);

function findAjaxLinks(target) {
    const ajaxLinks = target.querySelectorAll('[data-ajax]');
    listenAjaxLinks(ajaxLinks);
};

function listenAjaxLinks(links) {
    // console.log(links);
    links.forEach(link => {
        let params = getLinkParams(link);
        let onloadActions = getLinkOnloadActions(link);
        link.addEventListener('click', (e) => {
            e.preventDefault();
            addAjaxContent(params.containerId, params.targetAddress, params.targetElement, onloadActions);
        });
    });
};

function addAjaxContent(containerId, targetAddress, targetElement, onloadActions) {
    if (!containerId) {
        showAlert('Container id is empty');
        return;
    };
    let container = document.querySelector('#' + containerId);

    if (!container) {
        showAlert('Container with id "' + containerId + '" not found');
        return;
    };
    if (!targetAddress) {
        showAlert('Target address is empty');
        return;
    };
    if (!targetElement) {
        showAlert('Target element id is empty');
        return;
    };

    getDocument(targetAddress, function(data) {
        let target = data.querySelector('#' + targetElement);
        if (!target) {
            showAlert('Element with id "' + targetElement + '" not found on page "' + targetAddress + '"');
            return;
        };

        container.innerHTML = '';
        container.append(target);

        if (onloadActions) {
            ajaxOnloadActions(container, onloadActions);
        };
    });
};

function getLinkParams(link) {
    let params = {};

    params.containerId = link.dataset.ajax;
    let target = link.dataset.ajaxLink || link.getAttribute('href');
    if (target) {
        params.targetAddress = target.split('#')[0];
        params.targetElement = target.split('#')[1];
    };

    // console.log(params);
    return params;
};

function getDocument(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'document';
    xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                callback(this.responseXML);
            } else {
                showAlert('Address "' + url + '" is unavailable');
            };
        };
    };
    xhr.send(null);
};

function getLinkOnloadActions(link) {
    if (link.dataset.ajaxOnload) {
        return link.dataset.ajaxOnload.split(',');
    };
};
function ajaxOnloadActions(target, actions) {
    if (actions.includes('floatedInputs')) {
        findlabeledInputs(target);
    };
};
