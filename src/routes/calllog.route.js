import { Router } from 'express';
const router = Router();
import {create} from '../controllers/calllog.controller.js';

router.post('/', create);

export default router;