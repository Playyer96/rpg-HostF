//Dependencies & Modules
var express = require('express');
var router = express.Router();
var database = require('./../database.js');

//## Gold Services [/gold/{userId}]
//### Get Gold [GET]
router.get('/:userId', function(request, response) {
  var userId = request.params.userId;
  var query = 'SELECT "score" FROM "leaderboard" WHERE "player_id" IN ({0});';
  query = query.replace('{0}', userId);

  try {
    database.query(query, function(result) {
      var responseJson = {
        "gold": result[0].score
      }
      response.send(responseJson);
    });

  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
