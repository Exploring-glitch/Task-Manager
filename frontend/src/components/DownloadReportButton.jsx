import { useState } from "react";
import toast from "react-hot-toast";
import { LuFileSpreadsheet } from "react-icons/lu";
import Button from "./ui/Button.jsx";
import { downloadReport } from "../util/downloadFile.js";

const DownloadReportButton = ({ fetcher, filename, className = "", label = "Download Report" }) => {
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);

        try {
            await downloadReport(fetcher, filename);
        } catch (error) {
            toast.error(error.message || "Failed to download the report");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            variant="secondary"
            size="sm"
            icon={LuFileSpreadsheet}
            loading={loading}
            onClick={handleClick}
            className={`border-emerald-200/80 bg-emerald-50/60 text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 ${className}`}
        >
            {label}
        </Button>
    );
};

export default DownloadReportButton;
