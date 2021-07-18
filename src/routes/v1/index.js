import express from 'express';

const router = express.Router();

import postsRoutes from './posts/posts.route'
router.use('/posts', postsRoutes);

import salesRoutes from './sales/sales.route'
router.use('/sales', salesRoutes);

export default router;
