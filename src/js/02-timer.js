import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  inputDate: document.querySelector('[id="datetime-picker"]'),
  startBtn: document.querySelector('[data-start]'),
  timerDays: document.querySelector('[data-days]'),
  timerHours: document.querySelector('[data-hours]'),
  timerMins: document.querySelector('[data-minutes]'),
  timerSec: document.querySelector('[data-seconds]'),
};

let dateValue = null;
let timerID = null;

refs.startBtn.addEventListener('click', onStartTimer);

const timer = {
  isActive: false,

  start(value) {
    if (this.isActive) {
      return;
    }

    const startTime = value;
    this.isActive = true;

    timerID = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = Math.abs(currentTime - startTime);
      const time = convertMs(deltaTime);

      onTimerSetValue(time);
      onStopTimer(deltaTime);
    }, 1000);
  },
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDates]) {
    onDateCheck(selectedDates);
  },
};

flatpickr(refs.inputDate, options);
onDisableBtn();

function onDateCheck(value) {
  if (value.getTime() < Date.now()) {
    Notiflix.Notify.failure('Please choose a date in the future');
    timer.isActive = false;
    clearInterval(timerID);
    onTimerSetValue({ days: '00', hours: '00', minutes: '00', seconds: '00' });
    onDisableBtn();
    return;
  }

  timer.isActive = false;
  clearInterval(timerID);
  onTimerSetValue({ days: '00', hours: '00', minutes: '00', seconds: '00' });
  refs.startBtn.removeAttribute('disabled');
  return (dateValue = value.getTime());
}

function onStartTimer() {
  timer.start(dateValue);
}

function onStopTimer(time) {
  if (time < 1000) {
    timer.isActive = false;
    clearInterval(timerID);
  }
}

function onTimerSetValue({ days, hours, minutes, seconds }) {
  refs.timerDays.textContent = addLeadingZero(days);
  refs.timerHours.textContent = addLeadingZero(hours);
  refs.timerMins.textContent = addLeadingZero(minutes);
  refs.timerSec.textContent = addLeadingZero(seconds);
}

function onDisableBtn() {
  refs.startBtn.setAttribute('disabled', 'disabled');
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
