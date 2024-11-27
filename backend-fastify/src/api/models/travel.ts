
class Travel {
    travelId: number;
    customerId: string;
    origin: string;
    destination: string;
    distance: number;
    duration: number;
    driverId: number;
    value : number;
    driverName: string;
    date: Date

    constructor(travelId: number, customerId: string, origin: string, destination: string, distance: number, duration: number, driverId: number, value: number, driverName: string, date: Date) {
        this.travelId = travelId;
        this.customerId = customerId;
        this.origin = origin;
        this.destination = destination;
        this.distance = distance;
        this.duration = duration;
        this.driverId = driverId;
        this.value = value;
        this.driverName = driverName;
        this.date = date;
    }
}

export default Travel;