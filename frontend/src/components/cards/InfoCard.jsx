const InfoCard = ({ label, value, color }) => {
    return (
        <div className="flex items-center gap-3">
            <div className={`h-2 w-2 rounded-full md:h-5 md:w-2 lg:h-3 lg:w-3 ${color}`} />

            <p className="text-xs text-gray-500 md:text-[14px]">
                <span className="text-sm font-semibold text-black md:text-[15px]">{value} </span>
                {label}
            </p>
        </div>
    );
};

export default InfoCard;
