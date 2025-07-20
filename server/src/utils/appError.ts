import { HTTPSTATUS, HttpStatusCodeType } from "../config/http.config";
import { ErrorCodeEnum, ErrorCodeEnumType } from "../enums/error-code.enum";

export class AppError extends Error {
  public statusCode: HttpStatusCodeType;
  public errorCode?: ErrorCodeEnumType;

  constructor(
    message: string,
    statusCode = HTTPSTATUS.INTERNAL_SERVER_ERROR,
    errorCode?: ErrorCodeEnumType
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestException extends AppError {
  constructor(message = "Bad Request", errorCode?: ErrorCodeEnumType) {
    super(message, HTTPSTATUS.BAD_REQUEST, errorCode || ErrorCodeEnum.VALIDATION_ERROR);
  }
}


export class NOTFoundExeption extends AppError {
  constructor(message = "Resource not found", errorCode?: ErrorCodeEnumType) {
    super(message, HTTPSTATUS.NOT_FOUND, errorCode || ErrorCodeEnum.RESOURCE_NOT_FOUND);
  }
}
