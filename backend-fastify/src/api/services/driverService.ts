import DriverRepository from "../repositories/driverRepository";
import { Driver } from "../models/driver";
import DriverNotFound from "../errors/driverNotFound";

class DriverService {
    private driverRepository: DriverRepository

    constructor(driverRepository: DriverRepository) {
        this.driverRepository = driverRepository
    }

    async findByCustomer(customerId: number): Promise<Array<Driver>> {
        const drivers = await this.driverRepository.findByCustomer(customerId);
        if (drivers === null) 
            return []

        return drivers;
    }

    async findMinKm(km: number): Promise<Array<Driver>> {
        const drivers = await this.driverRepository.findMinKm(km);
        if (drivers === null) 
            throw new DriverNotFound('No drivers disponibility');

        return drivers;
    }

    async findById(id: string): Promise<Driver> {
        const driver = await this.driverRepository.findById(id);
        if (driver === null)
            throw new DriverNotFound('Driver not found');

        return driver;
    }

    async findAll() : Promise<Array<Driver>> {
        const drivers = await this.driverRepository.findAll();
        if (drivers === null) 
            throw new DriverNotFound('No drivers disponibility');

        return drivers;
    }

    async save(name: string, description: string, vehicle: string, rate: number, minKm: number) : Promise<void> {
        return await this.driverRepository.save(name, description, vehicle, rate, minKm)
    }

}

export default DriverService;