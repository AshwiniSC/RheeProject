import  expressJoi from 'express-joi';

export const registrationValidations = {
  nickName: expressJoi.Joi.string().required(),
  userName: expressJoi.Joi.string().optional(),
  email: expressJoi.Joi.string().email().required(),
  password: expressJoi.Joi.string().required(),
  schoolName: expressJoi.Joi.string().required(),
  role: expressJoi.Joi.string().optional(),
}

export const updateRegistrationValidations = {
  _id: expressJoi.Joi.string().optional(),
  nickName: expressJoi.Joi.string().optional(),
  userName: expressJoi.Joi.string().optional(),
  email: expressJoi.Joi.string().email().optional(),
  schoolName: expressJoi.Joi.string().optional(),
  password: expressJoi.Joi.string().optional(),
  role: expressJoi.Joi.string().optional(),
}

export const loginValidations = {
  email: expressJoi.Joi.string().email().required(),
  password: expressJoi.Joi.string().required(),
  role: expressJoi.Joi.string().optional(),
}

export const addSubjectValidations = {
  createdBy:expressJoi.Joi.string().required(),
  subjectName:expressJoi.Joi.string().required(),
  subjectCode:expressJoi.Joi.string().required(),
}

export const updateSubjectValidations = {
  _id:expressJoi.Joi.string().required(),
  subjectName:expressJoi.Joi.string().optional(),
  subjectCode:expressJoi.Joi.string().optional(),
}

export const getSubjectValidations = {
  id:expressJoi.Joi.string().required(),
}

export const deleteSubjectValidations = {
  id:expressJoi.Joi.string().required(),
}

export const addFilesValidations = {
  fileName: expressJoi.Joi.string().required(),
  fileFeature: expressJoi.Joi.string().required(),
  links: expressJoi.Joi.string().optional(),
  comment: expressJoi.Joi.string().optional(),
  subjectId: expressJoi.Joi.string().required(),
}

export const updateFilesValidations = {
   _id:expressJoi.Joi.string().required(),
  fileName: expressJoi.Joi.string().optional(),
  fileFeature: expressJoi.Joi.string().optional(),
  links: expressJoi.Joi.string().optional(),
  comment: expressJoi.Joi.string().optional(),
}

export const getFilesValidations = {
  id:expressJoi.Joi.string().required(),
}

export const deleteFileValidations = {
  id:expressJoi.Joi.string().required(),
}