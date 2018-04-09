var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var subjectSchema = new mongoose.Schema({
  subjectName : { type:String , default: '' },
  subjectCode : { type:String , default: '' },
  files : [{ type:Schema.Types.ObjectId, ref: 'Files' }],
  createdBy : { type: Schema.Types.ObjectId, ref: 'Accounts' },
},{timestamps: true});

module.exports = mongoose.model('Subjects', subjectSchema);