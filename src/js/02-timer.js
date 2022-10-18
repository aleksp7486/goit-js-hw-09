import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('input#datetime-picker'),
  btnStart: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

let selectedUnixDate;
let countdownId = null;

refs.btnStart.disabled = true;
refs.btnStart.classList.add('btnStart-active');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    chooseDate(selectedDates);
  },
};

flatpickr('input#datetime-picker', options);

refs.btnStart.addEventListener('click', countdownStart);

function chooseDate(dates) {
  if (dates[0].getTime() < Date.now()) {
    Notiflix.Notify.failure('Please choose a date in the future');
    return;
  }
  selectedUnixDate = dates[0].getTime();
  refs.btnStart.disabled = false;
  refs.btnStart.classList.remove('btnStart-active');
  Notiflix.Notify.success('Date set');
}

function countdownStart(evt) {
  evt.preventDefault();
  if (countdownId) {
    return;
  }
  countdownId = setInterval(pushValue, 1000);
  Notiflix.Notify.success('Timer activated');
  refs.btnStart.classList.add('btnStart-active');
}

function pushValue() {
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
