import toast from "react-hot-toast";
import { LuFileSpreadsheet } from "react-icons/lu";
import { downloadReport } from "../util/downloadFile.js";

const DownloadReportButton = ({ fetcher, filename, className = "", label = "Download Report" }) => {
    const handleClick = async () => {
        try {
            await downloadReport(fetcher, filename);
        } catch (error) {
            toast.error(error.message || "Failed to download the report");
        }
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className={`flex cursor-pointer items-center gap-2 rounded border border-lime-200 bg-lime-100 px-3 py-2 text-xs font-medium text-lime-900 hover:border-lime-400 md:text-[13px] ${className}`}
        >
            <LuFileSpreadsheet className="text-lg" aria-hidden="true" />
            {label}
        </button>
    );
};

export default DownloadReportButton;
