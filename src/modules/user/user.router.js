import {Router} from 'express'
import * as userImported from './user.controller.js'
import { auth } from '../../middleware/auth.middleware.js';
import { asyncHandler } from '../../services/errorHandling.js';
const router = Router();
router.get('/',userImported.getUsers)
router.get('/getProfile',asyncHandler(auth),asyncHandler(userImported.getProfile))
export default router;
