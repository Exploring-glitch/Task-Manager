import moment from "moment";

const DATE_ONLY_FORMAT = "YYYY-MM-DD";

/**
 * Due dates are calendar days, not instants. Values written by the current app
 * sit at UTC midnight, while older values sit at the creator's local midnight.
 * Snapping to the nearest UTC midnight recovers the day the user picked for
 * both, regardless of the viewer's time zone.
 */
export const toDueDateMoment = (value) => {
    if (!value) return null;

    const date = moment.isMoment(value)
        ? value.clone().utc()
        : value instanceof Date || typeof value === "number"
            ? moment.utc(value)
            : moment.utc(value, moment.ISO_8601, true);

    if (!date.isValid()) return null;

    const startOfDay = date.clone().startOf("day");
    const endOfDay = startOfDay.clone().add(1, "day");

    return date.diff(startOfDay) < endOfDay.diff(date) ? startOfDay : endOfDay;
};

export const formatDueDate = (value, format = "Do MMM YYYY") => {
    const date = toDueDateMoment(value);
    return date ? date.format(format) : "";
};

export const toDueDateInputValue = (value) => {
    const date = toDueDateMoment(value);
    return date ? date.format(DATE_ONLY_FORMAT) : "";
};

export const toDueDateISOString = (value) => {
    return moment.utc(value, DATE_ONLY_FORMAT, true).toISOString();
};
