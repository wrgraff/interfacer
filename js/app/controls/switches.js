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
