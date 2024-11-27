import { IsNotEmpty, IsString } from 'class-validator';

class EstimateRequest {
    @IsNotEmpty()
    customer_id: string

    @IsString()
    @IsNotEmpty()
    origin: string

    @IsString()
    @IsNotEmpty()
    destination: string

    constructor(customer_id: string, origin: string, destination: string) {
        this.customer_id = customer_id
        this.origin = origin
        this.destination = destination
    }
}

export default EstimateRequest;