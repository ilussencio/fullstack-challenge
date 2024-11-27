import ConfirmRequest from '../dtos/confirmRequest';
import DriverNotFound from '../errors/driverNotFound';
import InvalidDistanceError from '../errors/invalidDistance';
import DriverRepository from '../repositories/driverRepository';
import TravelRepository from '../repositories/travelRepository';

class ConfirmService {
    private driverRepository: DriverRepository
    private travelRepository: TravelRepository
    
    constructor(driverRepository: DriverRepository, travelRepository: TravelRepository) {
        this.driverRepository = driverRepository
        this.travelRepository = travelRepository
    }

    async confirm(confirmRequest: ConfirmRequest): Promise<void> {
        if (confirmRequest.origin === confirmRequest.destination)
            throw new InvalidDistanceError('Origin and destination cannot be the same')
        
        let driver = await this.driverRepository.findById(confirmRequest.driver.id)

        if (!driver)
            throw new DriverNotFound('driver not found')

        if(confirmRequest.distance < driver.minkm)
            throw new InvalidDistanceError('Invalid mileage for the driver')

        await this.travelRepository.saveTravel(confirmRequest.customer_id, 
            confirmRequest.driver.id, 
            confirmRequest.origin.toLowerCase(), 
            confirmRequest.destination.toLowerCase(),
            confirmRequest.distance,
            confirmRequest.value,
            confirmRequest.duration)

        return Promise.resolve()
    }

}

export default ConfirmService;