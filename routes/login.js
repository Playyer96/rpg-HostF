//Dependencies & Modules
var express = require('express');
var router = express.Router();
var database = require('./../database.js');

//## login Services [/login/{userName}]
//### Get User [GET]
router.get('/:userName', function(request, response) {
  var userName = request.params.userName;
  var query = 'SELECT "player_name", "player_id" FROM "player" WHERE "player_name" IN (\'{0}\');';
  query = query.replace('{0}', userName);

  try {
    database.query(query, function(result) {
      var responseJson = {
        "userId": result[0].player_id,
        "name": result[0].player_name
      }
      response.send(responseJson);
    });

  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
