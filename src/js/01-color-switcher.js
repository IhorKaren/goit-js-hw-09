const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]')
let timerId = null;

startBtn.addEventListener('click', onStartBtnClick)
stopBtn.addEventListener('click', onStopBtnClick)
stopBtn.setAttribute("disabled", "disabled")

function onStartBtnClick() {
    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor()
    }, 1000)

    startBtn.setAttribute("disabled", "disabled")
    stopBtn.removeAttribute("disabled")
}

function onStopBtnClick() {
    clearInterval(timerId)
    
    stopBtn.setAttribute("disabled", "disabled")
    startBtn.removeAttribute("disabled")   
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }