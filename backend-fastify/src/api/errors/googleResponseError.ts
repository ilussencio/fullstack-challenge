class GoogleResponseError extends Error {
    message: string;
    code: string;
    
    constructor(message: string) {
        super(message);
        this.code = "GOOGLE_RESPONSE_ERROR";
        this.message = message;
    }
}

export default GoogleResponseError;