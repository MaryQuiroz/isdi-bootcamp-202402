import { Request, Response, NextFunction } from 'express'
import { logger } from '.'


const errorMapping = {
    SystemError: { statusCode: 500, handler: logger.error },
    DuplicityError: { statusCode: 409, handler: logger.warn },
    ContentError: { statusCode: 400, handler: logger.warn },
    CredentialsError: { statusCode: 401, handler: logger.warn },
    NotFoundError: { statusCode: 404, handler: logger.warn },
    UnauthorizedError: { statusCode: 403, handler: logger.warn },
    JsonWebTokenError: { statusCode: 401, handler: logger.warn },
    TokenExpiredError: { statusCode: 401, handler: logger.warn },
    InvalidObjectIdError: { statusCode: 400, handler: logger.warn },
    ValidatorError: { statusCode: 500, handler: logger.warn },

};

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const errorType = err.constructor.name;
    const { statusCode = 500, handler } = errorMapping[errorType] || {};
    handler.call(logger, err.message);

    const response = {
        success: false,
        status: statusCode,
        message: err.message || 'Internal Server Error',
        error: errorType,
    };

    if (process.env.NODE_ENV === 'development') {
        response['stack'] = err.stack;
    }

    res.status(statusCode).json(response)
};

export default errorHandler