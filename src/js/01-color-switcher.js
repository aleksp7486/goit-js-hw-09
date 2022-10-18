const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
};

const getRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const changeBackgroundColor = () => {
  document.body.style.backgroundColor = `${getRandomHexColor()}`;
};

let isOn = null;

let timerId;

const onStart = () => {
  if (isOn) {
    return;
  }
  isOn = true;
  timerId = setInterval(() => {
    changeBackgroundColor();
  }, 1000);
};

refs.btnStart.addEventListener('click', onStart);

const onStop = () => {
  if (!isOn) {
    return;
  }
  isOn = null;
  clearInterval(timerId);
};

refs.btnStop.addEventListener('click', onStop);
