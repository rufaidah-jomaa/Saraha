import {Router} from 'express'
import * as userImported from './user.controller.js'
import { auth } from '../../middleware/auth.middleware.js';
import { asyncHandler } from '../../services/errorHandling.js';
import fileUpload, { fileValidation } from '../../services/multer.js';
const router = Router();
router.get('/',userImported.getUsers)
router.get('/getProfile',auth,asyncHandler(userImported.getProfile))
router.patch('/profilePic',auth,fileUpload(fileValidation.image).single('image'),asyncHandler(userImported.uploadPic))
export default router;
//'image/jpeg','image/png','image/jpg','image/svg+xml'