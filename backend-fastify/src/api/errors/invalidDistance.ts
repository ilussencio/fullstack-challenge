class InvalidDistanceError extends Error {
    message: string;
    code: string;

    constructor(message: string) {
        super(message);
        this.code = "INVALID_DISTANCE";
        this.message = message;
    }
}

export default InvalidDistanceError;