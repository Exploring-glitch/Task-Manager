/**
 * Formats a number with thousands separators, e.g. 1234567 -> "1,234,567".
 * Returns an empty string for missing or non numeric input.
 */
export const formatNumber = (value) => {
    const number = Number(value);

    if (value === null || value === undefined || value === "" || Number.isNaN(number)) {
        return "";
    }

    const [integerPart, fractionalPart] = String(number).split(".");

    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger;
};
