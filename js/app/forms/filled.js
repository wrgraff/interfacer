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
