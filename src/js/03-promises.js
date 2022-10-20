'Use strict';

import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('form'),
  button: document.querySelector('form > button'),
};
const {
  amount: formAmount,
  delay: formDelay,
  step: formStep,
} = refs.form.elements;

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onClick(evt) {
  evt.preventDefault();
  let delay = Number(formDelay.value);
  let position = 0;
  for (let i = 0; i < Number(formAmount.value); i++) {
    position += 1;
    createPromise(position, delay)
      .then(({ position, delay }) =>
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`)
      )
      .catch(({ position, delay }) =>
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`)
      );
    delay += Number(formStep.value);
  }
}

refs.button.addEventListener('click', onClick);
