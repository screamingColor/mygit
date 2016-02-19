/**
 * Created by blue on 2016/2/19.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var useSchema = new Schema({
    userid:String,
    password:String
});
exports.user = mongoose.model('users',useSchema);