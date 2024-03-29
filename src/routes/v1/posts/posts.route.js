import express from 'express';
import * as controller from '../../../controllers/posts/posts.controller';
const router = express.Router();

router.route('/')
    .get((req, res) => {
        controller.getPosts(req, res);
    })

export default router;
