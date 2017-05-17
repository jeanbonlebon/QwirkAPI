var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var friendSchema = new Schema({
    friend_one: String,
    friend_two: String,
    friend_one_username: String,
    friend_two_username: String,
    blocked: Boolean
});

module.exports = mongoose.model('Friend', friendSchema);
