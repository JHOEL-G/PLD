import { Search } from "lucide-react";
import { ChevronRight } from "lucide-react";
import logo from '../../../../assets/react.svg'

export default function SidebarHeader({ expanded, darkMode, search, setSearch, onToggle }) {
    return (
        <>
            <div className="flex items-center gap-3 px-4 pt-5 pb-3">
                <div
                    className="flex shrink-0 items-center justify-center w-9 h-9 rounded-xl shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)]"
                    style={{ background: `linear-gradient(135deg, var(--acrecer-purple), var(--acrecer-blue))` }}
                >
                    <img src={logo} alt="logoplataforma" className="w-[200%] h-[200%] object-contain" />
                </div>
                <div
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{ opacity: expanded ? 1 : 0, width: expanded ? 'auto' : 0 }}
                >
                    <div className="font-extrabold text-xs tracking-[-0.02em] leading-none text-foreground">
                        PLATAFORMA<span style={{ color: 'var(--acrecer-purple)' }}> FORTIA PLD</span>
                    </div>
                    <div className="text-[5px] font-semibold uppercase tracking-[0.2em] text-muted-foreground mt-[3px]">
                        Sistema de Prevención Lavado Dinero
                    </div>
                </div>
            </div>

            <button
                onClick={onToggle}
                className="absolute top-[62px] -right-4 w-8 h-8 flex items-center justify-center text-white border-none rounded-full cursor-pointer shadow-[0_8px_20px_rgba(0,0,0,0.18)] transition-all duration-300 z-50 hover:scale-[1.08] hover:brightness-[1.08] hover:shadow-[0_12px_24px_rgba(0,0,0,0.25)] active:scale-[0.95] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                style={{
                    background: `linear-gradient(135deg, var(--acrecer-magenta), var(--acrecer-coral))`,
                    transform: `rotate(${expanded ? 0 : 180}deg)`
                }}
            >
                <ChevronRight size={12} strokeWidth={3} />
            </button>

            <div className="px-3 mb-3">
                <div
                    className={`flex items-center rounded-xl px-3 py-2 gap-2 transition-all duration-200 ease-in-out border ${darkMode
                        ? 'bg-[var(--bg-card)] border-[var(--border-color)]'
                        : 'bg-secondary/50 border-border'
                        }`}
                    style={{ justifyContent: expanded ? 'flex-start' : 'center' }}
                >
                    <Search size={14} className="text-muted-foreground shrink-0" />
                    {expanded && (
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Buscar módulo..."
                            className={`bg-transparent border-none outline-none text-xs w-full ${darkMode ? 'text-white' : 'text-black'} placeholder:text-muted-foreground`}
                        />
                    )}
                </div>
            </div>
        </>
    )
}
