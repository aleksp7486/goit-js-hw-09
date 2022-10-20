'Use strict';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

const flatpickrOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const [date] = selectedDates;
    chooseDate(date);
  },
};

const calendar = flatpickr('input#datetime-picker', flatpickrOptions);

refs.btnStart.disabled = true;

refs.btnStart.addEventListener('click', timerStart);

function chooseDate(date) {
  if (date.getTime() < Date.now()) {
    Notiflix.Notify.failure('Please choose a date in the future');
    return;
  }
  refs.btnStart.disabled = false;
  refs.btnStart.classList.add('btnStart-active');
  Notiflix.Notify.success('Date set');
}

function timerStart(evt) {
  evt.preventDefault();
  if (refs.btnStart.disabled) {
    return;
  }
  setInterval(pushValue, 1000);
  Notiflix.Notify.success('Timer activated');
  refs.btnStart.disabled = true;
  refs.input.disabled = true;
  refs.input.style.cursor = 'default';
  refs.btnStart.classList.remove('btnStart-active');
}

function pushValue() {
  const selectedUnixDate = calendar.selectedDates[0].getTime();
  const { days, hours, minutes, seconds } = convertMs(
    selectedUnixDate - Date.now()
  );
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
