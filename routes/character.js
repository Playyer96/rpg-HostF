//Dependencies & Modules
var express = require('express');
var router = express.Router();
var database = require('./../database.js');

//## Character Services [/character/{userId}]
//### Get Available Characters [GET]
router.get('/:userId', function(request, response) {
  var userId = request.params.userId;
  var query = 'SELECT "character_id" From "playercharacter" WHERE "player_id" IN ({0});';
  query = query.replace('{0}', userId);

  try {
    database.query(query, function(result) {

      var responseJson = {
        "ids": []
      }

      for (var i = 0; i < result.length; i++) {
      responseJson.ids.push(result[i].character_id);
      }

      response.send(responseJson);
    });

  } catch (error) {
    console.error(error);
  }
});

router.post('/:userId', function(request, response){
  var userId = request.params.userId;

  var gold = request.body.gold;
  var newCharacter = request.body.newCharacter;
  var health = request.body.health;
  var attack = request.body.attack;
  var defense = request.body.defense;

  var query = 'update leaderboard set score = {0} where player_id in ({1});';
  var query = query.replace('{0}', gold);
  var query = query.replace('{1}', userId);

  try {
    database.query(query,function(result){
      try {
        query = 'INSERT INTO playercharacter (player_id, character_id, health_points, attack_points, defense_points, sp_attack_points, sp_defense_points) VALUES (\'{0}\',\'{1}\',\'{2}\',\'{3}\',\'{4}\',\'{5}\',\'{6}\') ON CONFLICT (player_id, character_id) DO NOTHING;';
        query = query.replace('{0}', userId);
        query = query.replace('{1}', newCharacter);
        query = query.replace('{2}', health);
        query = query.replace('{3}', attack);
        query = query.replace('{4}', defense);
        query = query.replace('{5}', attack);
        query = query.replace('{6}', defense);

        database.query(query, function(result){
            response.send("Successful Purchase");
        });

      } catch (error) {
        console.error(error);
      }
    })
  } catch (error) {
    console.error(error);
  }
})

module.exports = router;
