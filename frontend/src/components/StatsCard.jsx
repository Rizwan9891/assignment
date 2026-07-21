const StatsCard = ({ title, value }) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition-all">

            <p className="text-gray-500 text-sm font-medium">
                {title}
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900">
                {value}
            </h2>

        </div>
    );
};

export default StatsCard;