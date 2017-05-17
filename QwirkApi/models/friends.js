var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var friendSchema = new Schema({
    friend_one: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    friend_two: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    friend_one_username: String,
    friend_two_username: String,
    blocked: Boolean
});

module.exports = mongoose.model('Friend', friendSchema);
