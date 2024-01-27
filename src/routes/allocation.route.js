import { Router } from 'express';
const router = Router();
import { create,get } from '../controllers/allocation.controller.js';
 
router.post('/', create);
router.get('/', get);


export default router;