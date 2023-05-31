function renderCurrentValue(value) {
  const counterElement = document.querySelector("#counter-container > span");
  counterElement.innerHTML = value;
}

function getCurrentValue() {
  const counterElement = document.querySelector("#counter-container > span");
  const counter = Number(counterElement.innerHTML);

  if(isNaN(counter))
    return 0;

  return counter;
}

function increment() {
  const currentValue = getCurrentValue();
  renderCurrentValue(currentValue + 1);
}

function decrement() {
  const currentValue = getCurrentValue();
  renderCurrentValue(currentValue - 1);
}

function main() {
  const decrementButton = document.querySelector("#counter-container > button:first-child");
  const incrementButton = document.querySelector("#counter-container > button:last-child");

  decrementButton.addEventListener("click", decrement);
  incrementButton.addEventListener("click", increment);
}

main()