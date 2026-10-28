import { AppError } from "./errors.js";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const requireString = (value, field, { min = 1, max = 500 } = {}) => {
    if (typeof value !== "string" || !value.trim()) {
        throw new AppError(`${field} is required`, 400);
    }

    const trimmed = value.trim();

    if (trimmed.length < min) {
        throw new AppError(`${field} must be at least ${min} characters long`, 400);
    }

    if (trimmed.length > max) {
        throw new AppError(`${field} must be at most ${max} characters long`, 400);
    }

    return trimmed;
};

export const optionalString = (value, field, options) => {
    if (value === undefined || value === null || value === "") return undefined;
    return requireString(value, field, options);
};

export const requireEmail = (value) => {
    const email = requireString(value, "Email", { max: 254 }).toLowerCase();

    if (!EMAIL_PATTERN.test(email)) {
        throw new AppError("Please provide a valid email address", 400);
    }

    return email;
};

export const requirePassword = (value, { min = 6, max = 72 } = {}) => {
    if (typeof value !== "string" || value.length < min) {
        throw new AppError(`Password must be at least ${min} characters long`, 400);
    }

    if (value.length > max) {
        throw new AppError(`Password must be at most ${max} characters long`, 400);
    }

    return value;
};

export const requireEnum = (value, field, allowed) => {
    if (!allowed.includes(value)) {
        throw new AppError(`${field} must be one of: ${allowed.join(", ")}`, 400);
    }

    return value;
};

export const requireArray = (value, field) => {
    if (!Array.isArray(value)) {
        throw new AppError(`${field} must be an array`, 400);
    }

    return value;
};

export const requireDate = (value, field) => {
    const date = value instanceof Date ? value : new Date(value);

    if (Number.isNaN(date.getTime())) {
        throw new AppError(`${field} must be a valid date`, 400);
    }

    return date;
};
