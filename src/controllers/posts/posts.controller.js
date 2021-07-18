import {StatusCodes} from 'http-status-codes';
import logger from "../../../config/winston";

import sql from "../../../config/db";

/**
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export async function getPosts(req, res) {
    try {
        let allowedIps = process.env.ALLOWED_IPS
        let authorized = allowedIps.split(',').includes(req.connection.remoteAddress);
        if (!authorized) return res.status(StatusCodes.UNAUTHORIZED).json({error: {message: 'Unauthorized'}});

        let date = req.query.date || null;
        let page = parseInt(req.query.page, 10) || 1;
        let limit = parseInt(req.query.limit, 10) || 100;
        let queryOrder = req.query.order || 'asc';
        const availableOrders = ['asc', 'desc', 'ASC', 'DESC'];
        let order = availableOrders.includes(queryOrder) ? queryOrder : 'asc';

        let queryStr = buildQuery(order, date)
        let queryArgs = date ? [date] : [limit * (page - 1), limit];

        let data = await new Promise((resolve, reject) => {
            sql.query(queryStr, queryArgs, ( err, rows ) => {
                if(err){
                    return reject(err);
                }
                return resolve(rows);
            });
        });

        return res.json(data)
    } catch (err) {
        logger.log('error', err);
        return res.status(StatusCodes.code ? StatusCodes.code : StatusCodes.INTERNAL_SERVER_ERROR)
            .json({error: {message: 'Internal server error.'}});
    }
}

function buildQuery(order, date) {
    if (date) {
        return buildDateQuery(order);
    }
    return buildPageQuery(order);
}

function buildDateQuery(order) {
    return `SELECT bot, type, avg_price, posts_count, users_count, lifetime is_lifetime, date FROM posts_slim WHERE type IN ('wts', 'wtb') AND date = ? ORDER BY date, id ${order}`;
}

function buildPageQuery(order) {
    return `SELECT bot, type, avg_price, posts_count, users_count, lifetime is_lifetime, date FROM posts_slim WHERE type IN ('wts', 'wtb') ORDER BY date, id ${order} LIMIT ?, ?`
}
