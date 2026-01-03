import { BaseError } from "./base-error.js";

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

export class ValidationError extends BaseError {
  constructor(props) {
    super({
      name: "ValidationError",
      message: props.message || "Input Invalid",
      action: props.action || "Please check the data is valid.",
      status_code: 400,
    });
  }
}

export class NotFoundError extends BaseError {
  constructor(props) {
    super({
      name: "NotFoundError",
      message: props.message || "Resource not found.",
      action: props.action || "Please check the resource exists.",
      status_code: 404,
    });
  }
}
