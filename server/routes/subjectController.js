import Accounts from '../models/accounts';
import Subjects from '../models/subjects';

const _ = require('lodash');
const moment = require('moment');
const Config = require('../config/config');

// ----Add Subject
exports.addSubject = function(req,res){
	const { body } = req
	const subjectObject = body
	createSubject(subjectObject)

	async function createSubject(subjectObject){
		try {
			const subject = await Subjects.create(subjectObject)
			if(!subject){
				throw new Error("Something Went Wrong")
			}
			const subjectId = subject._id;
			const findAccount = await Accounts.findOneAndUpdate({_id:subjectObject.createdBy},{$push:{subjects:subjectId}})
			if(!findAccount){
				throw new Error("Something Went Wrong")
			}
			res.json({
				success: true,
				message: "Subject added successfully"
			})
		} catch(err) {
			res.json({
				success: false,
				message: err.message,
			})
		}
	}
}

// ----Update Subject
exports.updateSubject = function(req,res){
	const { body } = req
	const subjectObject = body
	update(subjectObject)
	async function update(subjectObject){
		try {
			const subject = await Subjects.findOneAndUpdate({_id:subjectObject._id},subjectObject)
			if(!subject){
				throw new Error("Something Went Wrong")
			}
			res.json({
				success: true,
				message: "Subject updated successfully"
			})
		} catch(err) {
			res.json({
				success: false,
				message: err.message,
			})
		}
	}
}


//------Get Register user's subjects 
exports.getSubjects = function(req,res){
	const id = req.params.id;
	subjects()
	async function subjects(){
		try {
			const findSubjects = await Subjects.find({createdBy:id})
			if(!findSubjects){
				throw new Error("Something Went Wrong")
			}
			res.json({
				success: true,
				message: "Fetch Subjects Successfully",
				data:findSubjects
			})
		} catch(err) {
			res.json({
				success: false,
				message: err.message,
				data:[]
			})
		}
	}
}


//------Delete Subject
exports.deleteSubject = function(req,res){
  const id = req.params.id;
  subjects()
  async function subjects(){
  	try {
  		const findSubject = await Subjects.findOne({_id:id})
  		if(!findSubject){
  			throw new Error("Something Went Wrong")
  		}
  		const updateAccount = await Accounts.findOneAndUpdate({_id:findSubject.createdBy},{$pull:{subjects:id}})
  		if(!updateAccount){
  			throw new Error("Something Went Wrong")
  		}
  		const removeSubject = await Subjects.remove({_id:findSubject._id})
  		res.json({
  			success: true,
  			message: "Delete Subject Successfully"
  		})
  	} catch(err) {
  		res.json({
  			success: false,
  			message: err.message
  		})
  	}
  }
}
