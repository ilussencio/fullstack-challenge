
import { DriverValue } from "../models/driver";
import Location from "../models/location";
import Review from "../models/review";
import Step from "../models/step";

class EstimateResponse {
    origin: Location
    destination: Location
    distance: number
    duration: number
    options: DriverValue[]
    routeResponse: any
    
    constructor(origin: Location, destination: Location, distance: number, duration: number, options: DriverValue[], routeResponse: any) {
        this.origin = origin
        this.destination = destination
        this.distance = distance
        this.duration = duration
        this.options = options
        this.routeResponse = routeResponse
    }
}

export default EstimateResponse