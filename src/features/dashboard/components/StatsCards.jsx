import { STATS } from "../constants/STATS";

export default function StatsCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map((stat) => (
                <div
                    key={stat.label}
                    className={`rounded-lg p-6 shadow-lg ${stat.className}`}
                >
                    <div className="text-sm font-medium mb-2 uppercase">{stat.label}</div>
                    <div className="text-4xl font-bold">{stat.value}</div>
                </div>
            ))}
        </div>
    )
}
