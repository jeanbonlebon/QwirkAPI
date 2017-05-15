var  mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var groupSchema = new Schema({
    name: String,
    admin: String
});

module.exports = mongoose.model('Group', groupSchema);
