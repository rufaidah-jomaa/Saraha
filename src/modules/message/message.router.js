import { Router } from "express";
import { asyncHandler } from "../../services/errorHandling.js";
import * as messageImported from './message.controller.js'
import { auth } from "../../middleware/auth.middleware.js";
const router=Router();

router.get('/',auth,messageImported.getMessages)
router.post('/sendMessage/:recieverId', asyncHandler(messageImported.sendMessage))

export default router;