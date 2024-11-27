import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import DriverRepository from "../repositories/driverRepository";
import EstimateRequest from "../dtos/estimateRequest";
import { validate } from "class-validator";
import EstimateService from "../services/estimateService";
import InvalidDataError from "../errors/invalidDataError";
import ReviewRepository from "../repositories/reviewRespository";
import ReviewService from "../services/reviewService";
import TravelRepository from "../repositories/travelRepository";

const reviewRepository = new ReviewRepository();
const travelRepository = new TravelRepository();
const reviewService = new ReviewService(reviewRepository, travelRepository);
const driverRepository = new DriverRepository();
const estimateService = new EstimateService(driverRepository, reviewService);

export const Estimate = async (app: FastifyInstance) => {
    app.post('/estimate', async (request: FastifyRequest<{ Body: EstimateRequest }>, reply: FastifyReply) => {  
        const { customer_id, origin, destination } = request.body;
        const newEstimate = new EstimateRequest(customer_id, origin, destination);
        
        const errors = await validate(newEstimate);
        if (errors.length > 0) {
            throw new InvalidDataError('The data provided in the body of the request are invalid');
        }
        
        const estimateResult = await estimateService.estimate(customer_id, origin.toLowerCase(), destination.toLowerCase());
        
        reply.status(200).send(estimateResult);
    });
};
