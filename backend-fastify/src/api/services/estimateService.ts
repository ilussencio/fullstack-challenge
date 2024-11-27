import EstimateResponse from "../dtos/estimateResponse"
import DistanceMinError from "../errors/distanceMinError"
import DriverNotFound from "../errors/driverNotFound"
import { Driver, DriverValue } from "../models/driver"
import DriverRepository from "../repositories/driverRepository"
import ComputeRoutes from "../utils/computerRoutes"
import ReviewService from "./reviewService"

class EstimateService {
    private repository: DriverRepository
    private reviewService: ReviewService

    constructor(repository: DriverRepository, reviewService: ReviewService) {
        this.repository = repository
        this.reviewService = reviewService
    }

    async estimate(customer_id: string, origin: string, destination: string): Promise<EstimateResponse> {
        if (origin === destination)
            throw new DistanceMinError('Origin and destination cannot be the same')

        let computeRoute = await ComputeRoutes(origin, destination)
        if (computeRoute.distanceMeters <= 1)
            throw new DistanceMinError('Origin and destination cannot be the same')

        let drivers = await this.repository.findMinKm(computeRoute.distanceMeters / 1000)

        if (!drivers)
            throw new DriverNotFound('No drivers disponibility')

        let driverToPrice = await Promise.all(drivers.map(async (driver: Driver) => {
            let review = await this.reviewService.calculateRating(driver.driver_id)
            let price = (computeRoute.distanceMeters / 1000) * driver.rate
            return new DriverValue(price, driver, review)
        }))


        return new EstimateResponse(computeRoute.origin,
            computeRoute.destination,
            computeRoute.distanceMeters,
            computeRoute.duration,
            driverToPrice,
            computeRoute)
    }

}

export default EstimateService;