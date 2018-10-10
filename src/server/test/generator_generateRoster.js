const chai = require('chai');
const expect = chai.expect;

const generator = require('../generator');

describe('The Generator object', () => {

  describe('The GenerateRoster function', () => {

    describe('returns an object', () => {
      let roster;
      let starters = 10;
      let subs = 5;
      let salaryCap = 175;
      before(() => {
        roster = generator.generateRoster(starters, subs, salaryCap);
      });

      it('contains starters', () => {
        expect(roster).to.have.property('starters');
      });

      it('contains substitutes', () => {
        expect(roster).to.have.property('substitutes');
      });

      describe('the starters', () => {

        it('is an array', () => {
          expect(roster.starters).to.be.an('array');
        });

        it('has the correct number of bots', () => {
          expect(roster.starters).to.have.length(starters);
        });

        it('each item is an object', () => {
          roster.starters.forEach(starter => {
            expect(starter).to.be.an('object');
          });
        });
      });

      describe('the substitutes', () => {

        it('is an array', () => {
          expect(roster.substitutes).to.be.an('array');
        });

        it('has the correct number of bots', () => {
          expect(roster.substitutes).to.have.length(subs);
        });

        it('each item is an object', () => {
          roster.substitutes.forEach(sub => {
            expect(sub).to.be.an('object');
          });
        });
      });

      it('the total attribute score for staters and subs is less than the salary cap', () => {
        let starterScore = roster.starters.reduce((acc, current) => {
          return acc + current.totalAttributeScore;
        }, 0);
        let subScore = roster.substitutes.reduce((acc, current) => {
          return acc + current.totalAttributeScore;
        }, 0);
        expect(starterScore + subScore).to.be.lessThan(salaryCap);
      });
    });
  });
});
