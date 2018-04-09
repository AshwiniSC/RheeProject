import Accounts from '../models/accounts';
import Subjects from '../models/subjects';
import Files from '../models/files';

const _ = require('lodash');
const moment = require('moment');
const Config = require('../config/config');

//----Add File
exports.addFiles = function(req,res){
	const { body } = req;
	createFile(body)

	async function createFile(body){
		try {
			const fileData = await Files.create(body)
			if(!fileData){
				throw new Error("Something Went Wrong")
			}
			const updateSubject = await Subjects.findOneAndUpdate({_id:fileData.subjectId},{$push:{files:fileData._id}})
			if(!updateSubject){
				throw new Error("Something Went Wrong")
			}
			res.json({
				success: true,
				message: "File added successfully"
			})
		} catch(err) {
      res.json({
     	  success: false,
     	  message: err.message,
      })
		}
	}
}

//----Update File
exports.updateFiles = function(req,res){
	const { body } = req
	update(body)

	async function update(body){
		try {
			const fileData = await Files.findOneAndUpdate({_id:body._id},body)
			if(!fileData){
				throw new Error("Something Went Wrong")
			}
			res.json({
				success: true,
				message: "File updated successfully"
			})
		} catch(err){
		  res.json({
			  success: false,
			  message: err.message,
		  })
		}
	}
}

//------Get Subject's Files
exports.getFiles = function(req,res){
	const subjectId = req.params.id;
	getFiles()

	async function getFiles(){
		try {
			const fileData = await Files.find({subjectId:subjectId})
			if(!fileData){
				throw new Error("Something Went Wrong")
			}
			res.json({
				success: true,
				message: "Fetch Files successfully",
				data:fileData
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

//-------Remove File
exports.deleteFile = function(req,res){
	console.log("is here",req.params.id)
	const id = req.params.id;
	removeFile()

	async function removeFile(){
    try {
    	const findFile = await Files.findOne({_id:id})
    	if(!findFile){
    		throw new Error("Something Went Wrong")
    	}
    	const updateSubject = await Subjects.findOneAndUpdate({_id:findFile.subjectId},{$pull:{files:id}})
    	if(!updateSubject){
    		throw new Error("Something Went Wrong")
    	}
    	const removeFile = await Files.remove({_id:findFile._id})
    	res.json({
    		success: true,
    		message: "Delete file Successfully"
    	})
    } catch(err) {
  	  res.json({
  		  success: false,
  		  message: err.message,
  	  })
    }
	}
}