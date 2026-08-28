import { Moon } from "lucide-react";
import SidebarUser from "./SidebarUser";
import { Sun } from "lucide-react";

export default function SidebarFooter({ expanded, darkMode, setDarkMode, session, onNavigateProfile, onLogout, }) {
    return (
        <div className="p-2 flex flex-col gap-2 mt-auto shrink-0">
            <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-full p-2 rounded-xl flex items-center gap-3 border-none cursor-pointer transition-all duration-200 ease-in-out ${darkMode
                    ? 'bg-zinc-800/40 hover:bg-zinc-800 text-zinc-300'
                    : 'bg-slate-100 hover:bg-slate-200/70 text-slate-700'
                    } ${expanded ? 'justify-start' : 'justify-center'}`}
            >
                <div className="w-9 h-9 flex items-center justify-center shrink-0">
                    <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center shadow-sm shrink-0"
                        style={{ background: `linear-gradient(135deg, var(--acrecer-purple, #8b5cf6), var(--acrecer-blue, #3b82f6))` }}
                    >
                        {darkMode
                            ? <Moon size={15} className="text-white shrink-0" />
                            : <Sun size={15} className="text-white shrink-0" />}
                    </div>
                </div>

                {expanded && (
                    <>
                        <span className={`text-xs font-semibold flex-1 text-left whitespace-nowrap ${darkMode ? 'text-slate-300' : 'text-slate-700'
                            }`}>
                            {darkMode ? 'Modo Oscuro' : 'Modo Claro'}
                        </span>

                        <div
                            className="w-7 h-4 rounded-full p-0.5 transition-colors duration-300 flex items-center shrink-0"
                            style={{
                                background: darkMode
                                    ? `linear-gradient(135deg, var(--acrecer-purple, #8b5cf6), var(--acrecer-blue, #3b82f6))`
                                    : 'rgba(148,163,184,0.4)'
                            }}
                        >
                            <div
                                className={`w-3 h-3 bg-white rounded-full transition-transform duration-300 shadow-sm ${darkMode ? 'translate-x-3' : 'translate-x-0'
                                    }`}
                            />
                        </div>
                    </>
                )}
            </button>

            <SidebarUser
                expanded={expanded}
                darkMode={darkMode}
                session={session}
                onNavigateProfile={onNavigateProfile}
                onLogout={onLogout}
            />
        </div>
    )
}
