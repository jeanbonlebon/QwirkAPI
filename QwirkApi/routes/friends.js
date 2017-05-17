var express = require('express'),
    router = express.Router();

var Friend = require('../models/friends');
var User = require('../models/users');


router.get('/', function(req, res, next) {
      Friend.find(function(err, friends) {
      if (err)
          res.send(err);

      res.json(friends);
    });
});

router.post('/', function(req, res) {

    var friend = new Friend();
    friend.friend_one = req.body.friend_one;
    friend.friend_two = req.body.friend_two;
    friend.friend_one_username = req.body.friend_one_username;
    friend.friend_two_username = req.body.friend_two_username;
    friend.blocked = req.body.blocked;


    console.log('//////////1/////////////');
    User.findById(req.body.friend_one, function(err, user) {
      if (err)
          res.send(err);

          console.log('//////////2/////////////');
          var friend2 = {"_id":"591ab7c142617b149092e44e","avatar":"img1.png","password":"test","username":"Robin","__v":0}
          user.friends.push(friend2);

          user.save(function(err) {
              if (err)
                  res.send(err);
                  console.log('//////////3/////////////');
              res.json({ message: 'User 1 add user 2 in his array!' });
          });
      console.log('//////////4/////////////');

    });

    friend.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Friend relation created!' });
    });

});

router.get('/:friend_id', function(req,res) {

      Friend.findById(req.params.friend_id, function(err, friend) {
        if (err)
            res.send(err);
        res.json(friend);
    });

});

router.put('/:friend_id', function(req, res) {

    Friend.findById(req.params.friend_id, function(err, friend) {

        if (err)
            res.send(err);

        friend.friend_one = req.body.friend_one;
        friend.friend_two = req.body.friend_two;
        friend.friend_one_username = req.body.friend_one_username;
        friend.friend_two_username = req.body.friend_two_username;
        friend.blocked = req.body.blocked;


        friend.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Friend relation updated!' });
        });
    });

});

router.delete('/:friend_id', function(req, res) {

    Friend.remove({
        _id: req.params.friend_id
    }, function(err, friend) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });

});

router.get('/myFriends/:friend_id', function(req, res, next) {
      Friend.find({$or:[{'friend_one': req.params.friend_id},{'friend_two': req.params.friend_id}]}, function(err, friends) {
      if (err)
          res.send(err);

      res.json(friends);
    });
});

module.exports = router;
