var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

var supplementSchema = new Schema({
	title: String,
	dosage: String,
	reason: String
});

var Supplement = mongoose.model('Supplement',supplementSchema);
module.exports = Supplement;