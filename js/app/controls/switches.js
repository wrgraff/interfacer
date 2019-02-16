const switches = document.querySelectorAll('.switch');

switches.forEach((switchButton) => {
    switchButton.addEventListener('click', (e) => {
      let pressed = e.target.getAttribute('aria-checked') === 'true';
      e.target.setAttribute('aria-checked', String(!pressed));
    });
});
