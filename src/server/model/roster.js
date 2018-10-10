const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RosterSchema = new Schema({
  teamName: String,
  team: {
    starters: [{
      name: String,
      speed: Number,
      strength: Number,
      agility: Number,
      totalAttributeScore: Number
    }],
    substitutes: [{
      name: String,
      speed: Number,
      strength: Number,
      agility: Number,
      totalAttributeScore: Number
    }]
  },
  teamAttributeScore: Number
});

module.exports = mongoose.model('roster', RosterSchema);