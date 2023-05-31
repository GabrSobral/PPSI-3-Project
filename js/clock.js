// const dateElement = document.querySelector('#date');
const clock = document.querySelector('#clock');

function getHour() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // const completeDate = `${date.getDay().toString().padStart(2, '0')}/${date.getMonth().toString().padStart(2, '0')}/${date.getFullYear()}`;
    const completeHour = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

    clock.innerText = completeHour;
}

setInterval(getHour, 1000);
getHour();