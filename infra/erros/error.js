import { BaseError } from "./base-error";

export class InternalServerError extends BaseError {
  constructor({ cause }) {
    super({
      message: "An unexpected intern error occurred.",
      name: "InternalServerError",
      action: "Pleaser contact suport.",
      status_code: 500,
      cause,
    });
  }
}

export class MethodNotAllowedError extends BaseError {
  constructor() {
    super({
      name: "MethodNotAllowedError",
      message: "Method Not Allowed",
      action: "Please check the API documentation for the allowed methods.",
      status_code: 405,
    });
  }
}
