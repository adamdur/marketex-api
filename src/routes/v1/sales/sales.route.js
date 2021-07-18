import express from 'express';
import * as controller from '../../../controllers/sales/sales.controller';
const router = express.Router();

router.route('/')
    .get((req, res) => {
        controller.getSales(req, res);
    })

export default router;
