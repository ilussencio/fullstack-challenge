class InvalidDataError extends Error {
    message: string;
    code: string;
    
    constructor(message: string) {
        super(message);
        this.code = "INVALID_DATA";
        this.message = message;
    }
}

export default InvalidDataError;