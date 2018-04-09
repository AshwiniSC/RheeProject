var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var fileSchema = new mongoose.Schema({
  fileName : { type:String , default: '' },
  fileFeature : { type:String , default: '' },
  links : { type:Array , default: [] },
  comment : { type:String , default: '' },
  like : [{ type:Schema.Types.ObjectId, ref: 'Accounts' }],
  dislike : [{ type:Schema.Types.ObjectId, ref: 'Accounts' }],
  subjectId : { type:Schema.Types.ObjectId, ref: 'Subjects' },
},{timestamps: true});

module.exports = mongoose.model('Files', fileSchema);