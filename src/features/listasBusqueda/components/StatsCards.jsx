export default function StatsCards({ stats }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                    <div
                        key={index}
                        className={`bg-white rounded-lg shadow-sm p-6 border-l-4 ${stat.borderColor} hover:shadow-md transition-shadow cursor-pointer`}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className={`${stat.bgColor} rounded-lg p-3`}>
                                    <IconComponent className={`w-6 h-6 ${stat.color}`} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {stat.count.toLocaleString()}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}
