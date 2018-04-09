import Accounts from '../models/accounts';
const _ = require('lodash');
const moment = require('moment');
const Config = require('../config/config');
const crypto = require('crypto');
const jwt    = require('jsonwebtoken');

//-----Registration
exports.registration = function(req,res){
  const {body} = req
  const accountObject = body;
  accountObject.role = 'student';
  addAccount(accountObject)
  async function addAccount(accountObject){
  	try {
  		accountObject.password = crypto.createHash('md5').update(accountObject.password).digest('hex');
  		const account = await Accounts.create(accountObject)
  		if(!account){
  			throw new Error("Something Went Wrong")
  		}
			const token = jwt.sign({
        id: account._id,
        email: account.email,
        userName: account.userName
      }, 'secret', { expiresIn: 8640000 }) // expires in 24 hours

  		res.json({
  			success: true,
  			message: "Registration successfully",
  			data:{
  				account:account,
  				token:token
  			}
  		})
  	} catch (err){
			res.json({
				success:false,
				message: err.message,
				data:{}
			})
  	}
  }
}

//-----Update Registration
exports.updateRegistration = function(req,res){
	  const {body} = req
	  body.role = 'student'
	  updateAccount(body)
	  async function updateAccount(body){
	  	try {
	  		const account = await Accounts.update({_id:body._id},body)
	  		const findAccount = await Accounts.findOne({_id:body._id})
	  		if(!findAccount){
	  			throw new Error("Something Went Wrong")
	  		}
				const token = jwt.sign({
	        id: findAccount._id,
	        email: findAccount.email,
	        userName: findAccount.userName
	      }, 'secret', { expiresIn: 8640000 }) // expires in 24 hours

	  		res.json({
	  			success: true,
	  			message: "Registration updated successfully",
	  			data:{
	  				account:findAccount,
	  				token:token
	  			}
	  		})
	  	} catch (err){
				res.json({
					success:false,
					message: err.message,
					data:{}
				})
	  	}
	  }
}

//-----Login
exports.login = function(req,res){
  const { body } = req
  console.log("body:-------------",body)
  body.role = 'student'
  loginAccount(body)
  async function loginAccount(body){
  	try {
  		body.password = crypto.createHash('md5').update(body.password).digest('hex');
  		const findAccount = await Accounts.findOne({email:{$regex: body.email, $options: 'i'},password:body.password})
      if(!findAccount){
  			throw new Error("Something Went Wrong")
  		}
			const token = jwt.sign({
        id: findAccount._id,
        email: findAccount.email,
        userName: findAccount.userName
      }, 'secret', { expiresIn: 8640000 }) // expires in 24 hours

			res.json({
				success: true,
				message: "Login successfully",
				data:{
					account:findAccount,
					token:token
				}
			})
  	} catch(err) {
  		res.json({
  			success:false,
  			message: err.message,
  			data:{a:"error"}
  		})
  	}
  }
}