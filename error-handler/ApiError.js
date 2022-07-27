class ApiError {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }
  static badRequest(mgs, err) {
    // return new ApiError(400, msg);
    return new ApiError(400, { success: false, message: mgs, err: err });
  }

  static internal(msg) {
    // return new ApiError(500, msg);
    return new ApiError(500, { success: false, message: mgs, err: err });
  }
}

//Exporting Class
module.exports = ApiError;
