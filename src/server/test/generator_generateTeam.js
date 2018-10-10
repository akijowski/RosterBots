const chai = require('chai');
const expect = chai.expect;

const generator = require('../generator');

describe('The Generator object', () => {

  describe('The GenerateTeam function', () => {

    let team;
    let salaryCap = 175;
    let teamName = 'MyCoolTeam';
    let maxStarters = 10;
    let maxSubs = 5;
    before(() => {
      team = generator.generateTeam(teamName, maxStarters, maxSubs, salaryCap);
    });

    describe('returns an object', () => {

      it('has a teamName with the correct value', () => {
        expect(team).to.have.property('teamName');
        expect(team.teamName).to.include(teamName);
      });

      describe('the team property', () => {

        it('exists', () => {
          expect(team).to.have.property('team');
        });

        describe('the starters', () => {

          it('exists', () => {
            expect(team.team).to.have.property('starters');
          });

          it('is an array of objects', () => {
            expect(team.team.starters).to.be.an('array');
            team.team.starters.forEach(starter => {
              expect(starter).to.be.an('object');
            });
          });
        });

        describe('the substitutes', () => {

          it('exists', () => {
            expect(team.team).to.have.property('substitutes');
          });

          it('is an array of objects', () => {
            expect(team.team.substitutes).to.be.an('array');
            team.team.substitutes.forEach(sub => {
              expect(sub).to.be.an('object');
            });
          });
        });

        describe('the teamAttributeScore', () => {

          it('exists', () => {
            expect(team).to.have.property('teamAttributeScore');
          });

          it('is less than the salary cap', () => {
            expect(team.teamAttributeScore).to.be.lessThan(salaryCap);
          });
        });

      });
    });
  });
});