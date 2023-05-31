const display = document.querySelector('#display');
const buttons = document.querySelectorAll('.button');

function handleClick(button) {
    switch (button) {
        case '=':
            calc();
            break;

        case 'C':
            reset();
            break;

        case 'DEL':
            del();
            break;

        default:
            display.value += button;
            break;
    }
}

function reset() {
    display.value = '';
}

function calc() {
    if (!display.value) {
        display.value = 'Digite algum valor!';
        return;
    }

    try {
        const result = eval(display.value);
        display.value = result;
    }
    catch (error) {
        display.value = 'Erro!';
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonValue = button.innerText;
        handleClick(buttonValue);
    });
});