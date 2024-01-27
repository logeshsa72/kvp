import { Prisma } from '@prisma/client'

import { create as _create, get as _get} from '../services/allocation.service.js';

async function create(req, res) {
    try {
        res.json(await _create(req.body));
        console.log(res.statusCode);
    } catch (error) {
        console.error(`Error`, error.message);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                res.statusCode = 200;
                res.json({ statusCode: 1, message: `${error.meta.target.split("_")[1].toUpperCase()} Already exists` })
                console.log(res.statusCode)
            }
        }
    }
}
async function get(req, res, next) {
    try {
        res.json(await _get(req));
        console.log(res.statusCode);
    } catch (err) {
        console.error(`Error `, err.message);
    }
}
export {create,get}