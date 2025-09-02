import { BaseError } from "./base-error";

export class InternalServerError extends BaseError {
  constructor({ cause, status_code }) {
    super({
      message: "An unexpected intern error occurred.",
      name: "InternalServerError",
      action: "Pleaser contact suport.",
      status_code: status_code || 500,
      cause,
    });
  }
}

export class ServiceError extends BaseError {
  constructor({ cause, message }) {
    super({
      message: message || "Service unavailable.",
      name: "ServiceError",
      action: "Check if the service is avaliable.",
      status_code: 503,
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
