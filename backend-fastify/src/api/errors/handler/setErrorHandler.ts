import RequestError from "../../dtos/requestError"
import { FastifyInstance } from "fastify"

export const setErrorHandler = (app: FastifyInstance) => {
    app.setErrorHandler((error, request, reply) => {
        app.log.error(error)

        console.log(error.code)

        switch (error.code) {
            case 'INVALID_DISTANCE':
                return reply.status(406).send(new RequestError(error.code, error.message))
            case 'INVALID_DATA':
                return reply.status(400).send(new RequestError(error.code, error.message))
            case 'DRIVER_NOT_FOUND':
                return reply.status(404).send(new RequestError(error.code, error.message))
            case 'TRAVEL_NOT_FOUND':
                return reply.status(404).send(new RequestError(error.code, error.message))
            case 'TRAVEL_ALREADY_CONFIRMED':
                return reply.status(400).send(new RequestError(error.code, error.message))
            case 'INVALID_DRIVER':
                return reply.status(400).send(new RequestError(error.code, error.message))
            case 'NO_RIDES_FOUND':
                return reply.status(404).send(new RequestError(error.code, error.message))
            case 'GOOGLE_RESPONSE_ERROR':
                return reply.status(500).send(new RequestError(error.code, error.message))
            default:
                return reply.status(500).send(new RequestError('UNEXPECTED_ERROR', 'An unexpected error occurred'))
        }
    })
}