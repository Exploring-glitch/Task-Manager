/**
 * Error that carries the HTTP status code we want to send back.
 * Anything thrown that is not an AppError is treated as an unexpected failure
 * and reported as a generic 500 by the error middleware.
 */
export class AppError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.name = "AppError";
        this.statusCode = statusCode;
    }
}

export const badRequest = (message) => new AppError(message, 400);
export const unauthorized = (message = "Unauthorized") => new AppError(message, 401);
export const forbidden = (message = "Access denied") => new AppError(message, 403);
export const notFound = (message = "Resource not found") => new AppError(message, 404);
export const conflict = (message) => new AppError(message, 409);
