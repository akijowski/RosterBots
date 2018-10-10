const FIXED = 3;
const names = require('../model/names_base').names;
randomString = function() {
  let string = names[Math.floor(Math.random() * names.length)] + randomInt(10000000, 1);
  return string;
}

randomInt = function(max, min) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

randomFloat = function(max, min) {
  min = min || 1;
  return Number.parseFloat((Math.random() * (max - min) + min).toFixed(FIXED));
}

validate = function(bot, index) {
  if (seen.hasOwnProperty(bot.name)) {
    seenIndex[bot.name] = index;
    return true;
  }
  seen[bot.name] = bot;
  return false;
}

validateBots = function(botList) {
  let seenNames = {};
  let seenScores = {};
  let seenIndex = {};
  let count = 0;
  let hasDuplicates = botList.some((bot, index) => {
    if (seenNames.hasOwnProperty(bot.name) || seenScores.hasOwnProperty(bot.totalAttributeScore)) {
      seenIndex[bot.name] = index;
      count++;
      return true;
    }
    seenNames[bot.name] = bot.name;
    seenScores[bot.totalAttributeScore] = bot.totalAttributeScore;
    return false;
  });

  return {
    seenNames,
    seenScores,
    seenIndex,
    hasDuplicates,
    count
  };
}

generateBot = function(maxSpeed, maxStrength, maxAgility, name) {
  name = name || randomString();
  let speed = randomFloat(maxSpeed);
  let strength = randomFloat(maxStrength);
  let agility = randomFloat(maxAgility);
  let totalAttributeScore = Number.parseFloat((speed + strength + agility).toFixed(FIXED));
  return {
    name,
    speed,
    strength,
    agility,
    totalAttributeScore
  };
}

generateBotList = function(size, salaryCap) {
  let list = [];
  let iterations = 0;
  let maxAttribute = (salaryCap / size / 3);
  for (i = 0; i < size; i++) {
    let bot = generateBot(maxAttribute, maxAttribute, maxAttribute)
    list.push(bot);
  }
  let valid = validateBots(list);
  while (valid.hasDuplicates && iterations < 5) {
    // remove the duplicates by index
    let invalidIndex = Object.values(valid.seenIndex);
    invalidIndex.forEach(index => {
      list.splice(index, 1);
    });
    // add the new items
    for (i = 0; i < valid.count; i++) {
      let bot = generateBot(maxAttribute, maxAttribute, maxAttribute);
      list.push(bot);
    }
    // increment iterations
    iterations++;
    // validate
    valid = validateBots(list);
  }
  return list;
}

generateRoster = function(numberOfStarters, numberOfSubs, salaryCap) {
  let teamSize = numberOfStarters + numberOfSubs;
  let list = generateBotList(teamSize, salaryCap);
  let starters = list.slice(0, numberOfStarters);
  let substitutes = list.slice(numberOfStarters);
  return {
    starters,
    substitutes
  };
}

generateTeam = function(teamName, numberOfStarters, numberOfSubs, salaryCap) {
  let team = generateRoster(numberOfStarters, numberOfSubs, salaryCap);
  let starterScore = team.starters.reduce((acc, starter) => {
    return acc + starter.totalAttributeScore;
  }, 0);
  let subScore = team.substitutes.reduce((acc, sub) => {
    return acc + sub.totalAttributeScore;
  }, 0);
  let teamAttributeScore = Number.parseFloat((starterScore + subScore).toFixed(FIXED));
  return {
    teamName,
    team,
    teamAttributeScore
  };
}

module.exports = {
  generateTeam,
  generateRoster,
  generateBotList,
  generateBot
}
