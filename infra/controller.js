import {
  MethodNotAllowedError,
  InternalServerError,
  ValidationError,
} from "infra/errors/error.js";

function onNoMatchHandler(request, response) {
  const publicErrorObject = new MethodNotAllowedError();
  response.status(publicErrorObject.status_code).json(publicErrorObject);
}

function onErrorHandler(error, resquest, response) {
  if (error instanceof ValidationError) {
    return response.status(error.status_code).json(error);
  }

  const publicErrorObject = new InternalServerError({
    status_code: error?.status_code || 500,
    cause: error,
  });

  console.error(publicErrorObject);
  response.status(publicErrorObject.status_code).json(publicErrorObject);
}

const controller = {
  errorHandlers: {
    onNoMatch: onNoMatchHandler,
    onError: onErrorHandler,
  },
};

export default controller;
