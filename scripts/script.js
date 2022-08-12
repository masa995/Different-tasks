import { calculator } from "./calculator.js";

window.onload = function () {
  const formElem = document.querySelector('.js-form');
  const arenaLeagueElem = document.querySelector('.js-league');
  const barrackElem = document.querySelector('.js-barrack');
  const trainingHallElem = document.querySelector('.js-training-hall');
  const btnSubmitElem = document.querySelector('.js-btn-submit');
  const answerElem = document.querySelector('.js-answer');

  formElem.addEventListener('submit', (e) => {
    e.preventDefault();

    const arenaLeagueVal = Number.parseInt(arenaLeagueElem.value);
    const barrackVal = Number.parseInt(barrackElem.value);
    const trainingHallVal = Number.parseInt(trainingHallElem.value);

    if (isNaN(arenaLeagueVal) || isNaN(barrackVal) || isNaN(trainingHallVal)) {
      alert('Вы неверно заполнили поля. Нужно вводить целые числа');

      arenaLeagueElem.value = '';
      barrackElem.value = '';
      trainingHallElem.value = '';
    } else {
      const textAnswer = calculator(arenaLeagueVal, barrackVal, trainingHallVal);

      answerElem.innerHTML = `<div class="answer__block">${textAnswer.fighters}. Общая сумма уровней бойцов равна ${textAnswer.sumLevelFighters}.</div>`;

      // arenaLeagueElem.value = '';
      // barrackElem.value = '';
      // trainingHallElem.value = '';
    }
  })
}