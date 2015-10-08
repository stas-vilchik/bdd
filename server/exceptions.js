function NotFoundError() {
  // do nothing
}
NotFoundError.prototype = new Error();

function ConflictError(errors) {
  this.errors = errors;
}
ConflictError.prototype = new Error();

function BadRequest() {
  // do nothing
}
BadRequest.prototype = new Error();

module.exports.NotFoundError = NotFoundError;
module.exports.ConflictError = ConflictError;
module.exports.BadRequest = BadRequest;