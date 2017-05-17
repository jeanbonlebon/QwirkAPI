var express = require('express'),
    router = express.Router();

var Friend = require('../models/friends');
var User = require('../models/users');



router.get('/', function(req, res, next) {
      User.find(function(err, users) {
      if (err)
          res.send(err);

      res.json(users);
    });
});


router.post('/', function(req, res) {

    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.avatar = req.body.avatar;

    user.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'User created!' });
    });
});

router.get('/:user_id', function(req,res) {

    User.findById(req.params.user_id)
        .populate({ path: 'users' , model: 'User'})
        .exec(function(err, user) {

        if (err)
            res.send(err);

        res.json(user);
    });
});

router.put('/:user_id', function(req, res) {

    User.findById(req.params.user_id, function(err, user) {

        if (err)
            res.send(err);

        user.username = req.body.username;
        user.password = req.body.password;
        user.avatar = req.body.avatar;


        user.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'User updated!' });
        });
    });

});

router.delete('/:user_id', function(req, res) {

    User.remove({
        _id: req.params.user_id
    }, function(err, user) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });

});

module.exports = router;
