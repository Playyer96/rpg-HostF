//Dependencies & Modules
var express = require('express');
var router = express.Router();
var database = require('./../database.js');
var bodyParser = require('body-parser');

//## Team Services [/team/{userId}]
//### Get Team [GET]
router.get('/:userId', function(request, response) {
  var userId = request.params.userId;
  var query = 'SELECT "character_id_1", "character_id_2", "character_id_3" FROM "team" WHERE "player_id" IN ({0});';
  query = query.replace('{0}', userId);

  try {
    database.query(query, function(result) {
      var responseJson = {
        "character1": result[0].character_id_1,
        "character2": result[0].character_id_2,
        "character3": result[0].character_id_3
      }
      response.send(responseJson);
    });

  } catch (error) {
    console.error(error);
  }
});


//### Save Team [POST]
router.post('/:userId',function(request,response) {
  var userId =  request.params.userId;

  var character1 = request.body.character1;
  var character2 = request.body.character2;
  var character3 = request.body.character3;

  var query = 'update team set character_id_1 = {0}, character_id_2 = {1}, character_id_3 = {2} where player_id in ({3});';
  query = query.replace('{0}', character1);
  query = query.replace('{1}', character2);
  query = query.replace('{2}', character3);
  query = query.replace('{3}', userId);

  try {
    database.query(query, function (result) {
      response.send('Team saved');
    })
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
