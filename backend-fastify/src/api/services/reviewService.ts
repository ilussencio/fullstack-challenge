import  ReviewRepository  from '../repositories/reviewRespository';
import Review from '../models/review';
import TravelRepository from '../repositories/travelRepository';

class ReviewService {
    reviewRepository: ReviewRepository;
    travelRepository: TravelRepository;

    constructor(reviewRepository: ReviewRepository, travelRepository: TravelRepository){
        this.reviewRepository = reviewRepository;
        this.travelRepository = travelRepository;
    }

    async findByDriverId(driverId: number): Promise<Array<Review>>{
        const reviews = await this.reviewRepository.findByDriverId(driverId);
        if(reviews === null)
            return [];
        return reviews
    }

    async calculateRating(driverId: number): Promise<Review>{
        let reviews = await this.reviewRepository.findByDriverId(driverId);
        if(reviews === null)
            return new Review(0, "No reviews found");

        const rateMedio = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
        
        return new Review(rateMedio, reviews[0].comment);
    }

    async save(rating: number, comment: string, travelId: number) {
        const review  = await this.reviewRepository.findByTravelId(travelId);
        if(review !== null)
            throw new Error("Travel already reviewed");

        const travel = await this.travelRepository.findByTravelId(travelId);
        if(travel === null)
            throw new Error("Travel not found");
         
        console.log("Driver id"+ travel.driverId)

        return await this.reviewRepository.save(travel.driverId, rating, comment, travelId);
    }

}

export default ReviewService;