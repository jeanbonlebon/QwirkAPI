var express = require('express'),
    router = express.Router();

var Group = require('../models/groups');


router.get('/', function(req, res, next) {
      Group.find(function(err, groups) {
      if (err)
          res.send(err);

      res.json(groups);
    });
});

router.post('/', function(req, res) {

    var group = new Group();
    group.name = req.body.name;
    group.admin = req.body.admin;

    group.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Group created!' });
    });

});

router.get('/:group_id', function(req,res) {

      Group.findById(req.params.group_id, function(err, group) {
        if (err)
            res.send(err);
        res.json(user);
    });

});

router.put('/:group_id', function(req, res) {

    Group.findById(req.params.group_id, function(err, group) {

        if (err)
            res.send(err);

        group.name = req.body.name;
        group.admin = req.body.admin;


        group.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Group updated!' });
        });
    });

});

router.delete('/:group_id', function(req, res) {

    Group.remove({
        _id: req.params.group_id
    }, function(err, group) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });

});

module.exports = router;
