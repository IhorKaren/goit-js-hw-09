import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  inputDate: document.querySelector('[id="datetime-picker"]'),
  startBtn: document.querySelector('[data-start]'),
  timerDays: document.querySelector('[data-days]'),
  timerHours: document.querySelector('[data-hours]'),
  timerMins: document.querySelector('[data-minutes]'),
  timerSec: document.querySelector('[data-seconds]'),
  dateValue: null,
  timerID: null,
};

refs.startBtn.addEventListener('click', onStartTimer);

const timer = {
  isActive: false,

  start(value) {
    if (this.isActive) {
      return;
    }

    const startTime = value;
    
    refs.timerID = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = currentTime - startTime;
      const time = convertMs(deltaTime);

      onTimerSetValue(time);
      onStopTimer();
    }, 1000);
  },
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onDateCheck(selectedDates[0]);
  },
};

flatpickr(refs.inputDate, options);
onDisableBtn();

function onDateCheck(value) {
  if (value.getTime() < Date.now()) {
    window.alert('Please choose a date in the future');
    onDisableBtn();
    return;
  }

  refs.startBtn.removeAttribute('disabled');
  return (refs.dateValue = value.getTime());
}

function onTimerSetValue({ days, hours, minutes, seconds }) {
  refs.timerDays.textContent = addLeadingZero(`${days}`.replace('-', '') - 1);
  refs.timerHours.textContent = addLeadingZero(`${hours}`.replace('-', '') - 1);
  refs.timerMins.textContent = addLeadingZero(
    `${minutes}`.replace('-', '') - 1
  );
  refs.timerSec.textContent = addLeadingZero(`${seconds}`.replace('-', ''));
}

function onStartTimer() {
  timer.start(refs.dateValue);
  timer.isActive = true;
}

function onStopTimer() {
  if (
    refs.timerDays.textContent === '00' &&
    refs.timerHours.textContent === '00' &&
    refs.timerMins.textContent === '00' &&
    refs.timerSec.textContent === '01'
  ) {
    clearInterval(refs.timerID);
    setTimeout(() => {
     return refs.timerSec.textContent = '00';
    }, 1000)
  }
}

function onDisableBtn() {
  refs.startBtn.setAttribute('disabled', 'disabled');
}

function addLeadingZero(value) {
  return String(value).padStart('2', '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));

  const hours = addLeadingZero(Math.floor((ms % day) / hour));

  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));

  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
