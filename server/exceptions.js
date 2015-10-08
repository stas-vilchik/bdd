function NotFoundError() {
  // do nothing
}
NotFoundError.prototype = new Error();

function ConflictError(errors) {
  this.errors = errors;
}
ConflictError.prototype = new Error();

module.exports.NotFoundError = NotFoundError;
module.exports.ConflictError = ConflictError;