import Location from "./location"
import Step from "./step"

class GoogleResponse {
    origin: Location
    destination: Location
    distanceMeters: number
    duration: number

    constructor(origin: Location, destination: Location, distanceMeters: number, duration: number) {
        this.origin = origin
        this.destination = destination
        this.distanceMeters = distanceMeters
        this.duration = duration
    }
}

export default GoogleResponse