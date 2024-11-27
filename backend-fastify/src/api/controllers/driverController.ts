import DriverRepository from "../repositories/driverRepository"
import DriverService from "../services/driverService"
import InvalidDataError from "../errors/invalidDataError"
import { FastifyInstance } from 'fastify'

const driverRepository = new DriverRepository();
const driverService = new DriverService(driverRepository);

export const DriverController = async (app: FastifyInstance) => {  
    app.get('/driver/:id', async (request, reply) => {
        const { id } = request.params as { id: string };
        if(!id) throw new InvalidDataError('Id is required');

        const driver = await driverService.findById(id);

        return reply.send(driver);
    });

    app.get('/driver', async (request, reply) => {
        const drivers = await driverService.findAll();

        return reply.send(drivers);
    });

    app.get('/driver/customer/:customerId', async (request, reply) => {
        const { customerId } = request.params as { customerId: number };
        if(!customerId) throw new InvalidDataError('customerId is required');

        const drivers = await driverService.findByCustomer(customerId);

        return reply.send(drivers);
    })

    app.post('/driver', async (request, reply) => {
        const { name, description, vehicle, rate, minKm } = request.body as { name: string, description: string, vehicle: string, rate: number, minKm: number };
        if (!name || !description || !vehicle || !rate || !minKm) 
            throw new InvalidDataError('Name, description, vehicle, rate and minKm are required');
        await driverService.save(name, description, vehicle, rate, minKm);

        return reply.send({ success: true });
    });
}