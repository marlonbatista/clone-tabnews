import {
  MethodNotAllowedError,
  InternalServerError,
} from "infra/errors/error.js";

function onNoMatchHandler(request, response) {
  const publicErrorObject = new MethodNotAllowedError();
  response.status(publicErrorObject.status_code).json(publicErrorObject);
}

function onErrorHandler(error, resquest, response) {
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
