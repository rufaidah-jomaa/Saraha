import {Router} from 'express'
import * as authImprted from './auth.controller.js'
import { asyncHandler } from '../../services/errorHandling.js';
import { signupSchema , signinSchema} from './auth.validation.js';
import validation from '../../middleware/validation.middleware.js';

const router = Router();

router.get('/', authImprted.getAuth)
router.post('/signup',validation(signupSchema) ,asyncHandler(authImprted.signup)) 
router.post('/signin',validation(signinSchema),asyncHandler(authImprted.signin))
router.get('/confirmEmail/:token',asyncHandler(authImprted.confirmEmail))
export default router;