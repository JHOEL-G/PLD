import { User, List } from 'lucide-react';
import { NAV_ITEMS } from '../constants/constants';

const ICONS = {
    registro: User,
    listas: List,
};

export default function Sidebar({ activeTab, onTabChange }) {
    return (
        <div className="w-full md:w-64 bg-gray-50 border-r border-gray-100 p-4 space-y-2">
            {NAV_ITEMS.map(({ id, label }) => {
                const Icon = ICONS[id];
                return (
                    <button
                        key={id}
                        onClick={() => onTabChange(id)}
                        className={`w-full flex items-center space-x-3 px-4 py-2 text-sm rounded-lg transition-colors ${activeTab === id ? 'font-semibold text-white bg-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
                    >
                        <Icon className="w-4 h-4" />
                        <span>{label}</span>
                    </button>
                );
            })}
        </div>
    )
}
