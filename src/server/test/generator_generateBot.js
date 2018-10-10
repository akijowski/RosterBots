const chai = require('chai');
const expect = chai.expect;

const generator = require('../generator');

describe('The Generator object', () => {

  describe('The GenerateBot function', () => {

    describe('returns an object', () => {
      let bot;
      let maxSpeed = 11.5;
      let maxStrength = 11;
      let maxAgility = 10;
      before(() => {
        bot = generator.generateBot(maxSpeed, maxStrength, maxAgility);
      });

      it('contains a unique name', () => {
        expect(bot).to.have.property('name');
        expect(bot.name).to.be.a('string');
        expect(bot.name).to.match(/[a-z]+[0-9]+/ig);
      });

      describe('the speed property', () => {

        it('exists', () => {
          expect(bot).to.have.property('speed');
        });

        it('is a floating point number', () => {
          expect(bot.speed).to.be.a('number');
        });

        it('is less than or equal to the max', () => {
          expect(bot.speed).to.be.lessThan(maxSpeed);
        });
      });

      describe('the strength property', () => {

        it('exists', () => {
          expect(bot).to.have.property('strength');
        });

        it('is a floating point number', () => {
          expect(bot.strength).to.be.a('number');
        });

        it('is less than or equal to the max', () => {
          expect(bot.strength).to.be.lessThan(maxStrength);
        });
      });

      describe('the agility property', () => {

        it('exists', () => {
          expect(bot).to.have.property('agility');
        });

        it('is a floating point number', () => {
          expect(bot.agility).to.be.a('number');
        });

        it('is less than or equal to the max', () => {
          expect(bot.agility).to.be.lessThan(maxAgility);
        });
      });

      describe('the total attribute score', () => {

        it('exists', () => {
          expect(bot).to.have.property('totalAttributeScore');
        });

        it('is less than the sum of the provided maximums', () => {
          expect(bot.totalAttributeScore).to.be.lessThan(maxSpeed + maxStrength + maxAgility);
        });
      });
    });
  });
});