import {Router} from 'express' ;
import * as postController from './post.controller.js'
import { auth } from '../../middleware/auth.middleware.js';
import fileUpload, { fileValidation } from '../../services/multer.js';
import { asyncHandler } from '../../services/errorHandling.js';
const router = Router();

router.get('/',asyncHandler(postController.getPosts))
router.get('/testPost',postController.testPost)
router.post('/',auth,fileUpload(fileValidation.image).single('image'),asyncHandler(postController.createPost))
router.patch('/like/:id',auth,asyncHandler(postController.likePost))
router.post('/comment/:id',auth,fileUpload(fileValidation.image).single('image'),asyncHandler(postController.createComment))

export default router;