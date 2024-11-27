import fastify from 'fastify';
import { routes } from './routes';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
import RequestError from './api/dtos/requestError';
import { setErrorHandler } from './api/errors/handler/setErrorHandler';

dotenv.config();

export const app = fastify({ logger: true })

const {ADDRESS = 'localhost', PORT = '3000'} = process.env

app.register(routes)
app.register(cors, {origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']})
setErrorHandler(app)

app.listen({ host: ADDRESS, port: PORT }, (err, address) => {
    if (err) {
        app.log.error(err);
    }

    app.log.info(`server running on ${address}`);
});


