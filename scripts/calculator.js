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
    let result = fighters.join(' - ');
    let sumLevelFighters = fighters.reduce((sum, elem) => {
      sum += elem
      return sum
    }, 0);

    return {
      fighters: result,
      sumLevelFighters: sumLevelFighters
    }
  }
}

function getLeagueMIN(leagueUser, trainingHallUser) {
  if (trainingHall.minLeague[trainingHallUser] > leagueUser) {
    const stringErr = `Минимальная лига, в которой вы можете участвовать ${trainingHall.minLeague[trainingHallUser]}.`
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
  let fightersMAX = [];
  let fightersMIN = [];
  let fighters = []

  if (fightersAboveLevel[barrackUser] > 0 && league.nextLeague[leagueUser] !== -1) {
    let countAboveLevel = fightersAboveLevel[barrackUser];
    let countSimple = barrackUser - fightersAboveLevel[barrackUser];
    let simpleFighter;

    for (let i = 0; i < countAboveLevel; i++) {
      let fighterAboveLevel = league.nextLeague[leagueUser];
      fighters.push(fighterAboveLevel);
      fightersMAX.push(fighterAboveLevel);
    }

    simpleFighter = league.minLevel[leagueUser];

    for (let i = 0; i < countSimple; i++) {
      fighters.push(simpleFighter);
      fightersMIN.push(simpleFighter);
    }

    fighters = {
      fighters: fighters,
      fightersMAX: fightersMAX,
      fightersMIN: fightersMIN
    }
    let result = balanceOfFighters(fighters, leagueUser, barrackUser);

    return result;

  } else {
    let fighter = Math.floor(league.maxAmountForLeague[leagueUser][barrackUser] / barrackUser);

    for (let i = 0; i < barrackUser; i++) {
      fighters.push(fighter)
    }
    return fighters;
  }
}

function balanceOfFighters(fighters, leagueUser, barrackUser) {
  const differenceMax = 14;
  let defaultSumLevel = league.maxAmountForLeague[leagueUser][barrackUser];

  let sumLevel = fighters.fighters.reduce((sum, elem) => {
    sum += elem
    return sum
  }, 0);

  if (sumLevel !== defaultSumLevel) {
    if (sumLevel < defaultSumLevel) {
      let difference = defaultSumLevel - sumLevel;
      let term = Math.floor(difference / fighters.fightersMIN.length);

      for (let i = 0; i < fighters.fightersMIN.length; i++) {
        fighters.fightersMIN[i] = fighters.fightersMIN[i] + term;
      }
    } else if (sumLevel > defaultSumLevel) {
      let difference = sumLevel - defaultSumLevel;

      if (difference < differenceMax) {
        let lengthArr = fighters.fightersMAX.length;
        fighters.fightersMAX[lengthArr - 1] = fighters.fightersMAX[lengthArr - 1] - difference;
      } else {
        let deduction = Math.ceil(difference / fighters.fightersMAX.length);

        for (let i = 0; i < fighters.fightersMAX.length; i++) {
          fighters.fightersMAX[i] = fighters.fightersMAX[i] - deduction;
        }
      }
    }
  }

  //Check Answer

  let fightersNEW = [...fighters.fightersMAX, ...fighters.fightersMIN];

  let checkLevel = fightersNEW.reduce((sum, elem) => {
    sum += elem
    return sum
  }, 0);

  if (checkLevel > defaultSumLevel) {
    alert('Ошибка в вычеслениях');
  } else if (checkLevel < defaultSumLevel) {
    let difference = defaultSumLevel - checkLevel;
    fighters.fightersMIN[0] = fighters.fightersMIN[0] + difference;
  }

  fightersNEW = [...fighters.fightersMAX, ...fighters.fightersMIN];

  return fightersNEW;
}