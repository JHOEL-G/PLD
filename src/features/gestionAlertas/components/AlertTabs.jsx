import { Settings } from "lucide-react";
import { Eye } from "lucide-react";
import { Bell } from "lucide-react";

const TABS = [
    { key: "activas", label: "Alertas Activas", icon: Bell, showBadge: true },
    { key: "historial", label: "Historial de Alertas", icon: Eye },
    { key: "tipos", label: "Tipos de Alertas", icon: Settings },
];

export default function AlertTabs({ activeTab, onChangeTab, badgeCount }) {
    return (
        <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="flex border-b">
                {TABS.map(({ key, label, icon: Icon, showBadge }) => (
                    <button
                        key={key}
                        onClick={() => onChangeTab(key)}
                        className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${activeTab === key
                            ? "text-red-600 border-b-2 border-red-600 bg-red-50"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                            }`}
                    >
                        <div className="flex items-center justify-center gap-2">
                            <Icon className="w-4 h-4" />
                            {label}
                            {showBadge && (
                                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                    {badgeCount}
                                </span>
                            )}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}
