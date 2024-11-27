class DistanceMinError extends Error {
    message: string;
    code: string;

    constructor(message: string) {
        super(message);
        this.code = "DISTANCE_MIN";
        this.message = message;
    }
}

export default DistanceMinError;