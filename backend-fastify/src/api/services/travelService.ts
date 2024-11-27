import InvalidDataError from "../errors/invalidDataError";
import TravelRepository from "../repositories/travelRepository";


class TravelService {
    repository: TravelRepository

    constructor(travelRepository: TravelRepository) {
        this.repository = travelRepository;
    }

    async findAllByCustomerId(customer_id: number) {
        const travels = await this.repository.findAllByCustomerId(customer_id);
        if (travels === null) 
            return []

        return travels;
    }

    async findAllByCustomerIdAndDriverId(customer_id: number, driver_id: number) {
        const travels = await this.repository.findAllByCustomerIdAndDriverId(customer_id, driver_id);
        if (travels === null) 
            return []

        return travels;
    }
}
export default TravelService;