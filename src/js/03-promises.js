import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  delayEl: document.querySelector('[name="delay"]'),
  stepEl: document.querySelector('[name="step"]'),
  amountEl: document.querySelector('[name="amount"]'),
};

let timerId = null;
let counter = 0;

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  timerId = setInterval(() => {
    if (counter === Number(refs.amountEl.value)) {
      clearInterval(timerId);
      counter = 0;
      return;
    }

    counter += 1;

    createPromise(
      counter,
      Number(refs.delayEl.value) + (counter - 1) * Number(refs.stepEl.value)
    )
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  }, Number(refs.stepEl.value));
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
