import Review from "./review"

interface DriverProps {
    driver_id: number
    name: string
    description: string
    vehicle: string
    rate: number
    minkm: number
}

class Driver {
    driver_id: number
    name: string
    description: string
    vehicle: string
    rate: number
    minkm: number

    constructor({ driver_id, name, description, vehicle, rate, minkm }: DriverProps) {
        this.driver_id = driver_id;
        this.name = name;
        this.description = description;
        this.vehicle = vehicle;
        this.rate = rate;
        this.minkm = minkm;
    }
}

class DriverValue extends Driver{
    value: number
    review: Review
    constructor(value: number, driverProps: DriverProps, review: Review) {
        super(driverProps)
        this.value = value
        this.review = review
    }

}

export { Driver, DriverValue }