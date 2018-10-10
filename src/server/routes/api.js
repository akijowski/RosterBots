const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');

const generator = require('../generator');
const db = require('../db');
const Roster = require('../model/roster');

const NUM_STARTERS = 10;
const NUM_SUBS = 5;
const SALARY_CAP = 175;

let mongoDb = db.connectToDb();

router.use(bodyParser.json());
router.use(cors());

router
  .post('/generate', (req, res) => {
    let team = generator.generateTeam(req.body.name, NUM_STARTERS, NUM_SUBS, SALARY_CAP);
    Roster.findOne({ teamName: team.teamName }).exec((err, roster) => {
      if (roster && roster.teamName) {
        res.status(400).json({ message: 'Team with name ' + roster.teamName + ' already exists' });
      } else {
        let newTeam = new Roster(team);
        newTeam.save((err, team) => {
          if (err) {
            res.status(500).json(err);
          }
          res
            .status(201)
            .set({
              'Location': team.teamName
            })
            .json(team);
        });
      }
    });
  })

  .get('/teams', (req, res) => {
    Roster.find({}).exec((err, rosters) => {
      if (err) {
        res.status(500).json(err);
      }
      res.json(rosters);
    });
  })

  .get('/teams/:teamName', (req, res) => {
    Roster.findOne({ teamName: req.params.teamName }).exec((err, roster) => {
      if (err) {
        res.status(500).json(err);
      }
      res.json(roster);
    })
  })

  .delete('/teams/:teamName', (req, res) => {
    Roster.findOneAndDelete({ teamName: req.params.teamName }).exec((err, roster) => {
      if (err) {
        res.status(500).json(err);
      }
      res.status(204).json();
    });
  });

module.exports = router;