var labeledInputs = document.querySelectorAll('.input__field');

labeledInputs.forEach((item) => {
    item.parentElement.classList.add('input_floating');
    if (item.value) {
        item.classList.add('input__field_filled');
    };
    item.addEventListener("blur", function( event ) {
        if (this.value == '') {
            this.classList.remove('input__field_filled');
        } else {
            this.classList.add('input__field_filled');
        }
    });
});
