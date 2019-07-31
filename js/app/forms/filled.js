findlabeledInputs(document);

function findlabeledInputs(target) {
    // Find inputs
    const labeledInputs = target.querySelectorAll('.input__field');
    // Add classes
    addLabeledInputsClass(labeledInputs);
    // Listen to changes
    listenLabeledInputs(labeledInputs);
};

function addLabeledInputsClass(inputs) {
    inputs.forEach((input) => {
        input.parentElement.classList.add('input_floating');
    });
};

function listenLabeledInputs(inputs) {
    inputs.forEach((input) => {
        listenLabeledInput(input);
    });
};

function listenLabeledInput(input) {
    // Update loaded inputs classes
    changeLabeledInput(input);
    // Update classes if input changes
    input.addEventListener('change', () => {
        changeLabeledInput(input);
    });
};

function changeLabeledInput(input) {
    if (input.value == '') {
        input.classList.remove('input__field_filled');
    } else {
        input.classList.add('input__field_filled');
    };
};
