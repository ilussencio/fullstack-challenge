import { IsNotEmpty } from 'class-validator';

class ConfirmRequest {
    @IsNotEmpty()
    customer_id: string
    @IsNotEmpty()
    origin: string
    @IsNotEmpty()
    destination: string
    @IsNotEmpty()
    distance: number
    @IsNotEmpty()
    duration: number
    @IsNotEmpty()
    driver: {
        id: string
        name: string
    }
    @IsNotEmpty()
    value: number

    constructor(customer_id: string, origin: string, destination: string, distance: number, duration: number, driver: { id: string, name: string }, value: number) {
        this.customer_id = customer_id
        this.origin = origin
        this.destination = destination
        this.distance = distance
        this.duration = duration
        this.driver = driver
        this.value = value
    }
}

export default ConfirmRequest;