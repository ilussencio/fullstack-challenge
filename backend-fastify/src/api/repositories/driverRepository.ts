import { Driver } from "../models/driver"
import db from "../../database"
import { promises } from "dns";

class DriverRepository {
    private db: any;

    constructor() {
        this.db = db;
    }

    async findMinKm(km: number): Promise<Array<Driver> | null> {
        const drivers = await this.db.query("select driver_id, name, description, vehicle, rate, minKm from driver where minKm <= $1  order by rate asc;", [km]);
        if (drivers.length === 0) 
            return null;
        return drivers.map((d: any) => new Driver(d));
    }

    async findById(id: string): Promise<Driver | null> {
        const driver = await this.db.query("select driver_id, name, description, vehicle, rate, minKm from driver where driver_id = $1;", [id]);
        if (driver.length === 0) 
            return null;
        return driver.map((d: any) => new Driver(d))[0];
    }

    async findAll(): Promise<Array<Driver> | null> {
        const drivers = await this.db.query("select driver_id, name, description, vehicle, rate, minKm from driver;");
        if (drivers.length === 0) 
            return null;
        return drivers.map((d: any) => new Driver(d));
    }

    async findByCustomer(customerId: number) : Promise<Array<Driver> | null> {
        const drivers = await this.db.query("select d.driver_id, d.name, d.description, d.vehicle, d.rate, d.minKm from driver d inner join travel t on d.driver_id = t.driver_id where t.customer_id = $1 group by d.driver_id ;",[customerId])
        if (drivers.length === 0) 
            return null;
        return drivers.map((d: any) => new Driver(d));
    }

    async save(name: string, description: string, vehicle: string, rate: number, minKm: number): Promise<void> {
        await this.db.query("insert into driver (name, description, vehicle, rate, minKm) values ($1, $2, $3, $4, $5);", [name, description, vehicle, rate, minKm]);
        return Promise.resolve();
    }
}

export default DriverRepository;