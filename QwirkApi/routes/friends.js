var express = require('express'),
    router = express.Router();

var Friend = require('../models/friends');


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
