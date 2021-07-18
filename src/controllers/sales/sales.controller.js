import {StatusCodes} from 'http-status-codes';
import logger from "../../../config/winston";

import sql from "../../../config/db";

/**
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export async function getSales(req, res) {
    try {
        let allowedIps = process.env.ALLOWED_IPS
        let authorized = allowedIps.split(',').includes(req.connection.remoteAddress);
        if (!authorized) return res.status(StatusCodes.UNAUTHORIZED).json({error: {message: 'Unauthorized'}});

        let page = parseInt(req.query.page, 10) || 1;
        let limit = parseInt(req.query.limit, 10) || 50;
        let queryOrder = req.query.order || 'asc';
        const availableOrders = ['asc', 'desc', 'ASC', 'DESC'];
        let order = availableOrders.includes(queryOrder) ? queryOrder : 'asc';

        let data = await new Promise((resolve, reject) => {
            sql.query(
                `SELECT bot, AVG(price) price, renewal, renewal_type, date
                FROM sales 
                GROUP BY bot, date, renewal
                ORDER BY date, id ${order} LIMIT ?, ?`,
                [limit * (page - 1), limit], ( err, rows ) => {
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
            // .json({error: {message: err.message || 'Internal server error.'}});
            .json({error: {message: 'Internal server error.'}});
    }
}
