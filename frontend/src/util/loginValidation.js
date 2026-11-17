const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateLoginFields = (email, password) => {
    const errors = {};
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
        errors.email = "Email address is required";
    } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
        errors.email = "Enter a valid email address";
    }

    if (!password.trim()) {
        errors.password = "Password is required";
    }

    return errors;
};
