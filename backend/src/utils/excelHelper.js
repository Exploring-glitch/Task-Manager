/**
 * Streams an exceljs workbook back to the client as a download.
 */
export const sendWorkbook = async (res, workbook, filename) => {
    res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

    await workbook.xlsx.write(res);
    res.end();
};

const DAY_IN_MS = 24 * 60 * 60 * 1000;

/**
 * Date-only values may be stored at UTC midnight (current writes) or at the
 * creator's local midnight (older writes). Snapping to the nearest UTC midnight
 * recovers the calendar day the user picked for both.
 */
export const toDateOnly = (value) => {
    if (!value) return null;

    const date = value instanceof Date ? value : new Date(value);

    if (Number.isNaN(date.getTime())) return null;

    const time = date.getTime();
    const startOfDay = Math.floor(time / DAY_IN_MS) * DAY_IN_MS;
    const endOfDay = startOfDay + DAY_IN_MS;

    return new Date(time - startOfDay < endOfDay - time ? startOfDay : endOfDay);
};

export const formatDateOnly = (value) => {
    const date = toDateOnly(value);

    if (!date) return "N/A";

    return date.toISOString().split("T")[0];
};
