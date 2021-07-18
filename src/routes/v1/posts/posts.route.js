import express from 'express';
import * as controller from '../../../controllers/posts/posts.controller';
// import {isAuthenticated} from '../../../middlewares/authenticate';
// import validate from '../../../../config/joi.validate';
// import schema from '../../../utils/validators/users/validator.users';
// import mysql from 'mysql';

const router = express.Router();



router.route('/')
    .get((req, res) => {
        controller.getPosts(req, res);
    })
    // .get(isAuthenticated, (req, res) => {
    //     controller.findById(req, res);
    // })

// router.route('/email')
//     .post(isAuthenticated, validate(schema.checkEmail), (req, res) => {
//         controller.checkEmail(req.body.email, req, res)
//     })
//
// router.route('/username')
//     .post(isAuthenticated, validate(schema.checkUsername), (req, res) => {
//         controller.checkUsername(req.body.username, req, res)
//     })


export default router;
