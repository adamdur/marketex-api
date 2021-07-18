import express from 'express';

const router = express.Router();

import postsRoutes from './posts/posts.route'
router.use('/posts', postsRoutes);

export default router;
