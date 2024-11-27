import db from "../../database"
import Review from "../models/review"

class ReviewRepository {
    db: any

    constructor(){
        this.db = db
    }

    async findByDriverId(driverId: number): Promise<Array<Review> | null>{
        const review = await this.db.query("select comment, rating from review where driver_id = $1;", [driverId])
        if (review.length === 0)
            return null
        
        return review.map((r: any) => new Review(r.rating, r.comment))
    }
    async findByTravelId(travelId: number): Promise<Array<Review> | null>{
        const review = await this.db.query("select comment, rating from review where travel_id = $1;", [travelId])
        if (review.length === 0)
            return null
        
        return review.map((r: any) => new Review(r.rating, r.comment))
    }

    async save(driverId: number, rating: number, comment: string, travel: number): Promise<void>{
        await this.db.query("INSERT INTO review (rating, comment, driver_id, travel_id) VALUES ($1, $2, $3, $4);", [rating, comment, driverId, travel])
        return Promise.resolve()
    }
}

export default ReviewRepository;