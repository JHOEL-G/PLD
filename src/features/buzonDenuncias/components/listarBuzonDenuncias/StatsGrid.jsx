import { statusConfig } from "../../utils/Denunciaconfig";

export default function StatsGrid({ denuncias, selectedStatus, onSelectStatus }) {
    const getCount = (key) => denuncias.filter(d => d.nombreEstado === key).length;

    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {Object.entries(statusConfig).map(([key, config]) => {
                const Icon = config.icon;
                const count = getCount(key);
                const isSelected = selectedStatus === key;
                const [bgClass, textClass] = config.color.split(' ');

                return (
                    <div
                        key={key}
                        onClick={() => onSelectStatus(isSelected ? 'todas' : key)}
                        className={`relative overflow-hidden rounded-2xl p-5 border-2 transition-all duration-300 cursor-pointer group
                        ${isSelected
                                ? 'border-indigo-500 bg-indigo-50 shadow-md scale-[1.02]'
                                : 'bg-white border-slate-100 hover:border-slate-300 hover:shadow-lg hover:-translate-y-1'
                            }`}
                    >
                        <div className="flex items-center space-x-3 mb-3">
                            <div className={`p-2 rounded-xl ${bgClass} ${textClass}`}>
                                <Icon className="w-5 h-5" />
                            </div>
                            <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">{config.label}</span>
                        </div>
                        <p className="text-3xl font-black text-slate-800">{count}</p>
                    </div>
                );
            })}
        </div>
    );
}