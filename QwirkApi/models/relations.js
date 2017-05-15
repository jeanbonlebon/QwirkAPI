var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var relationSchema = new Schema({
    name: String,
    user: String,
    type: String
});

module.exports = mongoose.model('Relation', relationSchema);
