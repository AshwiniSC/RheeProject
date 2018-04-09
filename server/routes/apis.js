import  express from 'express';
import  expressJoi from 'express-joi';
import authenticate from './middlewares/authenticate';
import { registrationValidations, loginValidations, updateRegistrationValidations } from './middlewares/validations'
import { addSubjectValidations, updateSubjectValidations, getSubjectValidations, deleteSubjectValidations } from './middlewares/validations'
import { addFilesValidations, updateFilesValidations, getFilesValidations, deleteFileValidations } from './middlewares/validations'
import accountController from './accountController'
import subjectController from './subjectController'
import filesController from './fileController'

const router = express.Router();

//---------------------------------Start Accounts Section---------------------------------//

/**
 * Registration
 *
 * @section Accounts
 * @type post
 * @url /api/v1/registration
 * @param {string} userName post body
 * @param {string} nickName post body
 * @param {string} schoolName post body
 * @param {email} email post body
 * @param {password} password post bodys
 * @param {string} role('student/teacher') post body
 */
router.post('/api/v1/registration',expressJoi.joiValidate(registrationValidations), accountController.registration);


/**
 * Update Registration
 *
 * @section Accounts
 * @type post
 * @url /api/v1/updateRegistration
 * @param {string} userName post body
 * @param {string} nickName post body
 * @param {string} schoolName post body
 * @param {email} email post body
 * @param {ObjectId} _id post body
 */
router.post('/api/v1/updateRegistration',expressJoi.joiValidate(updateRegistrationValidations), accountController.updateRegistration);



/**
 * Login
 *
 * @section Accounts
 * @type post
 * @url /api/v1/login
 * @param {email} email post body
 * @param {password} password post bodys
 * @param {string} role('student/teacher') post body
 */
router.post('/api/v1/login',expressJoi.joiValidate(loginValidations), accountController.login);
                          //==========================//

//---------------------------------Start Subjects Section---------------------------------//


/**
* Add Subject
*
* @section Subjects
* @type post
* @url /api/v1/addSubject
* @param {string} subjectName post body
* @param {string} subjectCode post body
* @param {string} createdBy post body
*/
router.post('/api/v1/addSubject',expressJoi.joiValidate(addSubjectValidations), subjectController.addSubject);


/**
* Update Subject
*
* @section Subjects
* @type post
* @url /api/v1/updateSubject
* @param {string} subjectName post body
* @param {string} subjectCode post body
* @param {ObjectId} _id post body
*/
router.post('/api/v1/updateSubject',expressJoi.joiValidate(updateSubjectValidations), subjectController.updateSubject);

/**
* Get Subject Details for register user
*
* @section Subjects 
* @type get
* @url /api/v1/getSubjects/:id
* @param {ObjectId} _id will send into url params variable
*/
router.get('/api/v1/getSubjects/:id',expressJoi.joiValidate(getSubjectValidations), subjectController.getSubjects);


/**
* Delete Subject
*
* @section Subjects 
* @type delete
* @url /api/v1/deleteSubject/:id
* @param {ObjectId} _id will send into url params variable
*/
router.delete('/api/v1/deleteSubject/:id',expressJoi.joiValidate(deleteSubjectValidations), subjectController.deleteSubject);
                                      //==========================//

//---------------------------------Start File Section---------------------------------//

/**
* Add Files 
*
* @section Files
* @type post
* @url /api/v1/addFiles
* @param {string} filetName post body
* @param {string} fileFeature post body
* @param {array} links post body
* @param {string} comment post body
* @param {objectId} subjectId post body
*/
router.post('/api/v1/addFiles',expressJoi.joiValidate(addFilesValidations), filesController.addFiles);

/**
* Update Files 
*
* @section Files
* @type post
* @url /api/v1/updateFiles
* @param {string} _id post body
* @param {string} filetName post body
* @param {string} fileFeature post body
* @param {array} links post body
* @param {string} comment post body
*/
router.post('/api/v1/updateFiles',expressJoi.joiValidate(updateFilesValidations), filesController.updateFiles);

/**
* Fetch Each Subject's Files 
*
* @section Files
* @type get
* @url /api/v1/getFiles/:id
* @param {ObjectId} subjectId will send into url params variable
*/
router.get('/api/v1/getFiles/:id',expressJoi.joiValidate(getFilesValidations), filesController.getFiles);

/**
* Remove File
*
* @section Files
* @type delete
* @url /api/v1/deleteFile/:id
* @param {ObjectId} _id will send into url params variable
*/
router.delete('/api/v1/deleteFile/:id',expressJoi.joiValidate(deleteFileValidations), filesController.deleteFile);
module.exports = router;