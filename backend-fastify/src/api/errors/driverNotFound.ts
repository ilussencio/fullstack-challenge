class DriverNotFound extends Error {
    message: string;
    code: string;

    constructor(message: string) {
        super(message);
        this.code = "DRIVER_NOT_FOUND";
        this.message = message;
    }
}

export default DriverNotFound;