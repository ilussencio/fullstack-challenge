import db from "../../database"
import Travel from "../models/travel";

class TravelRepository {
    private db: any;

    constructor() {
        this.db = db;
    }

    async findByTravelId(travelId: number): Promise<Travel | null> {
        const travel = await this.db.query("SELECT t.travel_id, t.customer_id, t.driver_id, t.origin, t.destination, t.distance, t.value, t.duration, t.date, d.name FROM travel t join driver d on t.driver_id = d.driver_id WHERE t.travel_id = $1;", [travelId]);
        if (travel.length === 0)
            return null;
        return travel.map((t: any) => new Travel(t.travel_id, t.customer_id, t.origin, t.destination, t.distance, t.duration, t.driver_id, t.value, t.name, t.date))[0];
    }
    async findAllByCustomerId(customerId: number): Promise<Travel[] | null> {
        const travels = await this.db.query("SELECT t.travel_id, t.customer_id, t.driver_id, t.origin, t.destination, t.distance, t.value, t.duration, t.date, d.name FROM travel t join driver d on t.driver_id = d.driver_id WHERE t.customer_id = $1;", [customerId]);
        if (travels.length === 0)
            return null;
        return travels.map((t: any) => new Travel(t.travel_id, t.customer_id, t.origin, t.destination, t.distance, t.duration, t.driver_id, t.value, t.name, t.date));
    }

    async findAllByCustomerIdAndDriverId(customerId: number, driverId: number): Promise<Travel[] | null> {
        
        const travels = await this.db.query("SELECT t.travel_id, t.customer_id, t.driver_id, t.origin, t.destination, t.distance, t.value, t.duration, t.date, d.name FROM travel t join driver d on t.driver_id = d.driver_id WHERE  t.customer_id = $1 AND t.driver_id = $2;", [customerId, driverId]);
        if (travels.length === 0)
            return null;
        return travels.map((t: any) => new Travel(t.travel_id, t.customer_id, t.origin, t.destination, t.distance, t.duration, t.driver_id, t.value, t.name, t.date));
    }

    async saveTravel(customer_id: string, driver_id: string, origin: string, destination: string, distance: number, value: number, duration: number): Promise<void> {
        await this.db.query("INSERT INTO travel (customer_id, origin, destination, distance, duration, driver_id, value, date) VALUES ($1,$2,$3,$4,$5,$6,$7, $8);",
            [customer_id, origin, destination, distance, duration, driver_id, value, new Date()]);
        return Promise.resolve();
    }

}

export default TravelRepository;