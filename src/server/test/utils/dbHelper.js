const Roster = require('../../model/roster');
const generator = require('../../generator');

function saveTeamToDB(teamName) {
  return new Promise((resolve, reject) => {
    let team = generator.generateTeam(teamName, 3, 3, 150);
    Roster.create(team, (err, team) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(team);
      }
    });
  });
}

function clearRosterCollection() {
  return new Promise((resolve, reject) => {
    Roster.deleteMany({}, err => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

module.exports = { saveTeamToDB, clearRosterCollection }