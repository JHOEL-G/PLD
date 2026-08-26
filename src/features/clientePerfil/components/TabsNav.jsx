import { User, FileText, TrendingUp, Shield } from 'lucide-react';

const TABS = [
    { id: 'generales', label: 'Datos Generales', icon: User },
    { id: 'expediente', label: 'Expediente', icon: FileText },
    { id: 'transaccional', label: 'Transaccional', icon: TrendingUp },
    { id: 'ebr', label: 'EBR', icon: Shield },
];

export default function TabsNav({ activeTab, setActiveTab }) {
    return (
        <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="flex border-b">
                {TABS.map(({ id, label, icon: Icon }) => (
                    <button
                        key={id}
                        onClick={() => setActiveTab(id)}
                        className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${activeTab === id
                            ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                            }`}
                    >
                        <div className="flex items-center justify-center gap-2">
                            <Icon className="w-4 h-4" />
                            {label}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}
