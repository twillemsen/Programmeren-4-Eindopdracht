<<<<<<< HEAD
class ApiError {
    constructor(message, code){
        this.message = message;
        this.code = code;
        this.datetime = Date()
    }
=======
// module.exports = {}

class ApiError {

    constructor(message, code){
        this.message = message;
        this.code = code;
        this.datetime = Date();
    }

>>>>>>> 23b8c52b8ecbf4012d3d19f2958ddc92533a4a3b
}

module.exports = ApiError;