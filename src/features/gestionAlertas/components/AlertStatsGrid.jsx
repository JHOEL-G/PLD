function StatCard({ icon: Icon, label, value, color, bgColor }) {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer border border-gray-100">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className={`${bgColor} rounded-lg p-3`}>
                        <Icon className={`w-6 h-6 ${color}`} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 mb-1">{label}</p>
                        <p className="text-3xl font-bold text-gray-900">{value}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function AlertStatsGrid({ stats }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
            ))}
        </div>
    )
}
