import { AppError } from "../utils/errors.js";

const isMongoDuplicateKey = (error) => error?.code === 11000;

const translateError = (error) => {
    if (error instanceof AppError) return error;

    if (isMongoDuplicateKey(error)) {
        const field = Object.keys(error.keyPattern || {})[0];
        return new AppError(
            field ? `${field} is already in use` : "Resource already exists",
            409
        );
    }

    if (error.name === "ValidationError") {
        const message = Object.values(error.errors)
            .map((item) => item.message)
            .join(", ");
        return new AppError(message || "Validation failed", 400);
    }

    if (error.name === "CastError") {
        return new AppError(`Invalid value for ${error.path}`, 400);
    }

    if (error.type === "entity.parse.failed") {
        return new AppError("Request body is not valid JSON", 400);
    }

    return new AppError("Internal server error", 500);
};

export const notFoundHandler = (req, res) => {
    res.status(404).json({ message: `Route ${req.method} ${req.originalUrl} not found` });
};

// eslint-disable-next-line no-unused-vars -- express identifies error middleware by arity
export const errorHandler = (error, req, res, next) => {
    const normalized = translateError(error);

    if (normalized.statusCode >= 500) {
        console.error(`[${req.method} ${req.originalUrl}]`, error);
    }

    res.status(normalized.statusCode).json({ message: normalized.message });
};
