import { Settings, Globe, ShieldCheck, Users, Bell, ChevronRight } from 'lucide-react';

export default function SettingsSidebar({ activeSection, onSelectSection }) {
    return (
        <div className="w-64 bg-white border-r border-slate-200 flex flex-col">
            <div className="p-6">
                <h2 className="text-lg font-bold flex items-center gap-2 text-slate-800">
                    <Settings size={20} className="text-blue-600" /> Configuración
                </h2>
            </div>

            <nav className="flex-1 px-3 space-y-1">
                <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    PLD & Cumplimiento
                </p>

                <button
                    onClick={() => onSelectSection('paises-pld')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${activeSection === 'paises-pld'
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'hover:bg-slate-50 text-slate-600'
                        }`}
                >
                    <div className="flex items-center gap-3">
                        <Globe size={18} /> <span>Países PLD</span>
                    </div>
                    <ChevronRight size={14} opacity={activeSection === 'paises-pld' ? 1 : 0} />
                </button>

                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                    <ShieldCheck size={18} /> <span>Listas Negras</span>
                </button>

                <div className="pt-4 mt-4 border-t border-slate-100">
                    <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Sistema</p>
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                        <Users size={18} /> <span>Usuarios</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                        <Bell size={18} /> <span>Notificaciones</span>
                    </button>
                </div>
            </nav>
        </div>
    )
}
