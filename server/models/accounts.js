var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var accountSchema = new mongoose.Schema({
  userName: { type: String, default: '' },
  nickName: { type: String, default: '' },
  schoolName: { type: String, default: '' },
  email: { 
    type: String, 
    unique: true,
    match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
  },
  password: { type: String, default: '' },
  resetPasswordToken:{ type: String, default: '' },
  role:{ type: String, default: '' },
  isActive:{ type: Boolean, default: false },
  subjects:[{ type: Schema.Types.ObjectId, ref: 'Subjects' }],
},{timestamps: true});

module.exports = mongoose.model('Accounts', accountSchema);