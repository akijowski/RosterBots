const chai = require('chai');
const expect = chai.expect;

const generator = require('../generator');

describe('The Generator object', () => {

  describe('The GenerateBotList function', () => {

    describe('returns an array', () => {
      let listSize = 10;
      let salaryCap = 175;
      let botList;

      before(() => {
        botList = generator.generateBotList(listSize, salaryCap);
      });

      it('has the correct size', () => {
        expect(botList).to.lengthOf(listSize);
      });

      describe('the items in the array', () => {

        it('should be an object with the correct keys', () => {
          botList.forEach(bot => {
            expect(bot).to.be.an('object');
            expect(bot).to.have.property('name');
            expect(bot).to.have.property('speed');
            expect(bot).to.have.property('strength');
            expect(bot).to.have.property('agility');
            expect(bot).to.have.property('totalAttributeScore');
          });
        });
      });
    });
  });
});