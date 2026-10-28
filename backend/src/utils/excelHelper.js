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

export const formatDateOnly = (value) => {
    if (!value) return "N/A";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "N/A";

    return date.toISOString().split("T")[0];
};
