import {
  league,
  fightersAboveLevel, trainingHall
} from "./data.js";

export function calculator(leagueUser, barrackUser, trainingHallUser) {
  let leagueErrMIN = getLeagueMIN(leagueUser, trainingHallUser);
  if (leagueErrMIN.key) {
    return leagueErrMIN.text;
  } else {
    let fighters = setFighters(leagueUser, barrackUser);
    let result = balanceOfFighters(fighters, leagueUser, barrackUser).join(' ур ') + ' ур';

    return result;
  }
}

function getLeagueMIN(leagueUser, trainingHallUser) {
  if (trainingHall.minLeague[trainingHallUser] > leagueUser) {
    const stringErr = `Минимальная лига, в которой вы можете участвовать ${trainingHall.minLeague[trainingHallUser]}.
      Над формулировкай надо поработать`
    return {
      key: true,
      text: stringErr
    }
  }
  return {
    key: false,
    text: ''
  }
}

function setFighters(leagueUser, barrackUser) {
  let fighters = []
  if (fightersAboveLevel[barrackUser] > 0 && league.nextLeague[leagueUser] !== -1) {
    let countAboveLevel = fightersAboveLevel[barrackUser];
    let sumAboveLevel = 0;
    let countSimple = barrackUser - fightersAboveLevel[barrackUser];
    let simpleFighter;

    for (let i = 0; i < countAboveLevel; i++) {
      let fighterAboveLevel = league.nextLeague[leagueUser] + 1;
      fighters.push(fighterAboveLevel);
      sumAboveLevel += fighterAboveLevel;
    }

    simpleFighter = Math.floor((league.maxAmountForLeague[leagueUser][barrackUser] - sumAboveLevel) / countSimple);

    for (let i = 0; i < countSimple; i++) {
      fighters.push(simpleFighter)
    }

  } else {
    let fighter = Math.floor(league.maxAmountForLeague[leagueUser][barrackUser] / barrackUser);

    for (let i = 0; i < barrackUser; i++) {
      fighters.push(fighter)
    }
  }
  return fighters;
}

function balanceOfFighters(fighters, leagueUser, barrackUser) {
  let fightersNEW = fighters.slice();
  let sumLevel = fighters.reduce((sum, elem) => {
    sum += elem
    return sum
  }, 0);

  if (league.maxAmountForLeague[leagueUser][barrackUser] > sumLevel) {
    let difference = league.maxAmountForLeague[leagueUser][barrackUser] - sumLevel;
    fightersNEW[0] = fightersNEW[0] + difference;
  }

  let checkLevel = fightersNEW.reduce((sum, elem) => {
    sum += elem
    return sum
  }, 0);

  console.log(checkLevel);

  if (checkLevel > league.maxAmountForLeague[leagueUser][barrackUser]) {
    alert('Ошибка в вычеслениях');
    return fighters;
  }

  return fightersNEW;
}