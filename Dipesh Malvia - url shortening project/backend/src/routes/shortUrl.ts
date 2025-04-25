import express from 'express';
import { createURL, getAllUrl, getUrl, deleteUrl } from '../controllers/shortUrl';

const router = express.Router();

router.post('/shortUrl', createURL);
router.get('/geturlall', getAllUrl);
router.get('/shortUrl/:id', getUrl);
router.delete('/shortUrl/:id', deleteUrl);

export default router;