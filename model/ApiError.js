class ApiError {
    constructor(message, code){
        this.message = message;
        this.code = code;
        this.datetime = Date();
    }
}

module.exports = ApiError;