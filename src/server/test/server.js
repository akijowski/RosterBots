const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

const dbUtils = require('./utils/dbHelper');
const app = require('../server');

chai.use(chaiHttp);

describe('The API server', () => {

  describe('The /api/generate endpoint', () => {

    describe('A POST request', () => {

      describe('If the team already exists', () => {
        let response;
        let teamName = "MyDuplicateTeam";
        before(async () => {
          await dbUtils.saveTeamToDB(teamName);
          response = await chai.request(app)
            .post('/api/generate')
            .set('Content-Type', 'application/json')
            .send({
              name: teamName
            });
        });

        after(async () => {
          await dbUtils.clearRosterCollection();
        });

        it('should return a 400', () => {
          expect(response).to.have.status(400);
        });

        it('should return an error message', () => {
          expect(response.body).to.have.property('message');
          expect(response.body.message).to.be.a('string');
        });
      });

      let response;
      let teamName = "MySpecialTeam";
      before(async () => {
        response = await chai.request(app)
          .post('/api/generate')
          .set('Content-Type', 'application/json')
          .send({
            name: teamName
          });
      });

      after(async () => {
        await dbUtils.clearRosterCollection();
      });

      it('should return a 201', () => {
        expect(response).to.have.status(201);
      });

      it('should include a location header with the generated name', () => {
        expect(response).to.have.header('location');
        expect(response).to.have.header('location', teamName);
      });

      it('should include the generated team in the body as JSON', () => {
        let { body } = response;
        expect(response).to.be.json;
        expect(body).to.be.an('object');
        expect(body).to.have.property('teamName');
        expect(body).to.have.property('team');
        expect(body).to.have.property('teamAttributeScore');
        expect(body.team).to.be.an('object');
      });

      describe('the returned team', () => {

        let team, generatedteamName, teamAttributeScore;

        before(() => {
          team = response.body.team;
          generatedteamName = response.body.teamName;
          teamAttributeScore = response.body.teamAttributeScore;
        });

        it('should have the correct team name', () => {
          expect(generatedteamName).to.include(teamName);
        });

        it('should have a teamAttributeScore', () => {
          expect(teamAttributeScore).to.be.a('number');
        });

        it('should contain starters', () => {
          expect(team).to.have.property('starters');
        });

        it('should contain substitutes', () => {
          expect(team).to.have.property('substitutes');
        });

        describe('the starters', () => {

          it('should be an array', () => {
            expect(team.starters).to.be.an('array');
          });

        });

        describe('the substitutes', () => {

          it('should be an array', () => {
            expect(team.substitutes).to.be.an('array');
          });

        });
      });
    });
  });

  describe('The /api/teams endpoint', () => {

    describe('A GET request', () => {

      let response;
      before(async () => {
        await dbUtils.saveTeamToDB('testTeam1');
        await dbUtils.saveTeamToDB('testTeam2');
        await dbUtils.saveTeamToDB('testTeam3');
        response = await chai.request(app).get('/api/teams');
      });

      after(async () => {
        await dbUtils.clearRosterCollection();
      });

      it('should return a 200', () => {
        expect(response).to.have.status(200);
      });

      it('should return a list as JSON', () => {
        expect(response).to.be.json;
        expect(response.body).to.be.an('array');
      });

      describe('the returned list', () => {

        it('should have the correct number of items', () => {
          let { body } = response;
          expect(body.length).to.equal(3);
        });

        it('each item should be an object', () => {
          let { body } = response;
          body.forEach(team => {
            expect(team).to.be.an('object');
          });
        });
      });
    });
  });

  describe('The /api/teams/:teamName endpoint', () => {

    describe('A GET request', () => {
      let response;
      let teamName = 'testTeam1';
      before(async () => {
        await dbUtils.saveTeamToDB(teamName);
        response = await chai.request(app).get('/api/teams/' + teamName);
      });

      after(async () => {
        await dbUtils.clearRosterCollection();
      });

      it('should return a 200', () => {
        expect(response).to.have.status(200);
      });

      it('should return the team as JSON', () => {
        expect(response).to.be.json;
        expect(response.body).to.be.an('object');
      });

      describe('the returned object', () => {

        it('should have the right teamName', () => {
          expect(response.body).to.have.property('teamName');
          expect(response.body.teamName).to.include(teamName);
        });

        it('should have starters and substitutes', () => {
          expect(response.body).to.have.property('team');
          expect(response.body.team).to.have.property('starters');
          expect(response.body.team).to.have.property('substitutes');
          expect(response.body.team.starters).to.be.an('array');
          expect(response.body.team.substitutes).to.be.an('array');
        });

        it('should have a teamAttributeScore', () => {
          expect(response.body).to.have.property('teamAttributeScore');
        });
      });
    });

    describe('A DELETE request', () => {

      let response;
      let teamName = 'testTeam1';
      before(async () => {
        await dbUtils.saveTeamToDB(teamName);
        response = await chai.request(app).delete('/api/teams/' + teamName);
      });

      after(async () => {
        await dbUtils.clearRosterCollection();
      });

      it('should return a 204', () => {
        expect(response).to.have.status(204);
      });
    });
  });
});