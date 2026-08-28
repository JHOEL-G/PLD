import { Search } from "lucide-react";
import { ChevronRight } from "lucide-react";
import logo from '../../../../assets/react.svg'

export default function SidebarHeader({ expanded, darkMode, search, setSearch, onToggle }) {
    return (
        <div className="relative pt-5 px-3 mb-2 flex flex-col gap-4 shrink-0">
            <div className="flex items-center gap-3 px-1 h-10 overflow-hidden">
                <div
                    className="flex shrink-0 items-center justify-center w-8 h-8 rounded-xl shadow-md transition-transform duration-300"
                    style={{ background: `linear-gradient(135deg, var(--acrecer-purple, #8b5cf6), var(--acrecer-blue, #3b82f6))` }}
                >
                    <img src={logo} alt="Logo Plataforma" className="w-5 h-5 object-contain filter drop-shadow" />
                </div>

                <div className={`flex flex-col whitespace-nowrap transition-all duration-300 ease-in-out ${expanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3 pointer-events-none'
                    }`}>
                    <div className="font-black text-xs tracking-tight leading-none">
                        PLATAFORMA <span style={{ color: 'var(--acrecer-purple, #8b5cf6)' }}>FORTIA PLD</span>
                    </div>
                    <div className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 mt-1">
                        Sistema de Prevención
                    </div>
                </div>
            </div>

            <button
                onClick={onToggle}
                aria-label="Toggle Sidebar"
                className="absolute -right-5 top-10 w-7 h-7 flex items-center justify-center text-white rounded-full cursor-pointer shadow-lg transition-transform duration-300 z-50 hover:scale-110 active:scale-95 border border-white/20"
                style={{
                    background: `linear-gradient(135deg, var(--acrecer-magenta, #ec4899), var(--acrecer-coral, #f43f5e))`,
                }}
            >
                <ChevronRight
                    size={14}
                    strokeWidth={2.5}
                    className={`transition-transform duration-300 ${expanded ? 'rotate-180' : 'rotate-0'}`}
                />
            </button>

            <div className="px-0.5">
                <div
                    className={`flex items-center rounded-xl px-2.5 py-2 transition-all duration-300 border ${darkMode
                        ? 'bg-zinc-800/50 border-zinc-700/50 focus-within:border-purple-500'
                        : 'bg-slate-100 border-slate-200 focus-within:border-purple-500'
                        }`}
                >
                    <Search size={16} className="text-slate-400 shrink-0" />

                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Buscar módulo..."
                        tabIndex={expanded ? 0 : -1}
                        className={`bg-transparent border-none outline-none text-xs ml-2 w-full whitespace-nowrap transition-all duration-300 ${darkMode ? 'text-white placeholder:text-zinc-500' : 'text-slate-800 placeholder:text-slate-400'
                            } ${expanded ? 'opacity-100 w-full' : 'opacity-0 w-0 p-0 pointer-events-none'}`}
                    />
                </div>
            </div>
        </div>
    )
}
