import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { validate } from "class-validator";
import InvalidDataError from "../errors/invalidDataError";
import ConfirmRequest from "../dtos/confirmRequest";
import DriverRepository from "../repositories/driverRepository";
import ConfirmService from "../services/confirmService";
import TravelRepository from "../repositories/travelRepository";

const driverRepository = new DriverRepository();
const travelRepository = new TravelRepository();
const confirmService = new ConfirmService(driverRepository, travelRepository);

export const Confirm = async (app: FastifyInstance) => {
    app.patch('/confirm', async (request: FastifyRequest<{Body: ConfirmRequest}>, reply: FastifyReply) => {
        const confirm = new ConfirmRequest(request.body.customer_id, request.body.origin, request.body.destination, request.body.distance, request.body.duration, request.body.driver, request.body.value)

        const errors = await validate(confirm)
        if (errors.length > 0)
            throw new InvalidDataError('The data provided in the body of the request are invalid')

        await confirmService.confirm(confirm)    

        return reply.status(200).send({ success: true})
    })
}