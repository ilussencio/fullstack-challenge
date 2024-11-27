import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import TravelService from "../services/travelService";
import TravelRepository from "../repositories/travelRepository";

const travelRepository = new TravelRepository()
const travelService = new TravelService(travelRepository)
export const FindRide = async (app: FastifyInstance) => {
    app.get('/:customer_id', async (request: FastifyRequest<{ Params: { customer_id: string } }>, reply: FastifyReply) => {
        const { customer_id } = request.params
        const { driver_id } = request.query
        
        if (!customer_id) {
            return reply.status(400).send({ message: 'Customer id not found' })
        }
        console.log('customer_id', customer_id)

        const travels = driver_id?await travelService.findAllByCustomerIdAndDriverId(parseInt(customer_id), parseInt(driver_id)):await travelService.findAllByCustomerId(parseInt(customer_id))


        return reply.status(200).send(travels)
    })
}