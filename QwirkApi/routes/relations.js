var express = require('express'),
    router = express.Router();

var Relation = require('../models/relations');


router.get('/', function(req, res, next) {
      Relation.find(function(err, relations) {
      if (err)
          res.send(err);

      res.json(relations);
    });
});


router.post('/', function(req, res) {

    var relation = new Relation();
    relation.name = req.body.name;
    relation.user = req.body.user;
    relation.type = req.body.type;

    relation.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Relation created!' });
    });

});

router.get('/:relation_id', function(req,res) {

      Relation.findById(req.params.relation_id, function(err, relation) {
        if (err)
            res.send(err);
        res.json(relation);
    });

});

router.put('/:relation_id', function(req, res) {

    Relation.findById(req.params.relation_id, function(err, relation) {

        if (err)
            res.send(err);

            relation.name = req.body.name;
            relation.user = req.body.user;
            relation.type = req.body.type;


        relation.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Relation updated!' });
        });
    });

});

router.delete('/:relation_id', function(req, res) {

    Relation.remove({
        _id: req.params.relation_id
    }, function(err, relation) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });

});


module.exports = router;
