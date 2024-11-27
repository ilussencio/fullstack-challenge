

import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import InvalidDataError from "../errors/invalidDataError";
import ReviewRepository from "../repositories/reviewRespository";
import ReviewService from "../services/reviewService";
import TravelRepository from "../repositories/travelRepository";

const reviewRepository = new ReviewRepository()
const travelRepository = new TravelRepository()
const reviewService = new ReviewService(reviewRepository, travelRepository)

export const ReviewController = async (app: FastifyInstance) => {
    app.get('/review/:driver', async (request: FastifyRequest<{ Params: { driver: number } }>, reply: FastifyReply) => {
        const { driver } = request.params
        if (!driver) throw new InvalidDataError('Driver ID is required')

        return reply.status(200).send(await reviewService.findByDriverId(driver))
    })

    app.post('/review', async (request: FastifyRequest<{ Body: {  rating: number, comment: string, travel: number } }>, reply: FastifyReply) => {
        const {  rating, comment, travel } = request.body
        if (!rating || !comment || !travel) throw new InvalidDataError('Driver ID, rating, comment and travel are required')

        await reviewService.save(rating, comment, travel)

        return reply.send({ success: true })
    })
}