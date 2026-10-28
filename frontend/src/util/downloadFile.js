export const XLSX_MIME_TYPE =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

export const downloadBlob = (data, filename, type = XLSX_MIME_TYPE) => {
    const url = URL.createObjectURL(new Blob([data], { type }));
    const link = document.createElement("a");

    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
};

/**
 * Fetches a report and hands the resulting blob to the browser.
 */
export const downloadReport = async (fetcher, filename) => {
    const blob = await fetcher();
    downloadBlob(blob, filename);
};
