import { FastifyInstance } from 'fastify'
import CustomerRepository from '../repositories/customerRepository'
import CustomerService from '../services/customerService'
import InvalidDataError from '../errors/invalidDataError';

const consumerRepository = new CustomerRepository();
const customerService = new CustomerService(consumerRepository);

export const CustomerController = async (app: FastifyInstance) => {
    app.get('/customer/:id', async (request, reply) => {
        const { id } = request.params as { id: string };
        if(!id) throw new InvalidDataError('Id is required');

        const customer = await customerService.findById(id);

        return reply.send(customer);
    });

    app.get('/customer/email/:email', async (request, reply) => {
        const { email } = request.params as { email: string };
        if (!email) throw new InvalidDataError('Email is required');

        const customer = await customerService.findByEmail(email);

        return reply.send(customer);
    });

    app.post('/customer', async (request, reply) => {
        const { name, email } = request.body as { name: string, email: string };
        const customer = await customerService.save(name, email);

        return reply.send({ success: true });
    });
}


