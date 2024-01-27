import { Router } from 'express';
const router = Router();
import { get, getOne, getSearch, create, update, remove, importLead } from '../controllers/leadMaster.controller.js';


router.post('/', create);

router.post('/importLead', importLead);

router.get('/', get);

router.get('/:id', getOne);

router.get('/search/:searchKey', getSearch);

router.put('/:id', update);

router.delete('/:id', remove);

export default router;