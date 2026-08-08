import { Moon } from "lucide-react";
import SidebarUser from "./SidebarUser";
import { Sun } from "lucide-react";

export default function SidebarFooter({ expanded, darkMode, setDarkMode, session, onNavigateProfile, onLogout, }) {
    return (
        <div className="p-3 flex flex-col gap-2 mt-auto">
            <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-full flex items-center gap-3 p-2 rounded-xl border-none cursor-pointer transition-all duration-200 ease-in-out ${darkMode
                    ? 'bg-[rgba(39,39,42,0.4)] hover:bg-[rgba(39,39,42,1)]'
                    : 'bg-[#f1f5f9] hover:bg-[#e2e8f0]'
                    }`}
                style={{ justifyContent: expanded ? 'flex-start' : 'center' }}
            >
                <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-[0_1px_2px_rgba(0,0,0,0.1)]"
                    style={{ background: `linear-gradient(135deg, var(--acrecer-purple), var(--acrecer-blue))` }}
                >
                    {darkMode
                        ? <Moon size={14} className="text-white" />
                        : <Sun size={14} className="text-white" />}
                </div>

                {expanded && (
                    <>
                        <span className={`text-xs font-semibold flex-1 text-left ${darkMode ? 'text-[#cbd5e1]' : 'text-[#334155]'}`}>
                            {darkMode ? 'Modo Oscuro' : 'Modo Claro'}
                        </span>
                        <div
                            className="w-8 h-4 rounded-full relative p-0.5 transition-colors duration-300 ease-in-out"
                            style={{
                                background: darkMode
                                    ? `linear-gradient(135deg, var(--acrecer-purple), var(--acrecer-blue))`
                                    : 'rgba(148,163,184,0.4)'
                            }}
                        >
                            <div
                                className="w-3 h-3 bg-white rounded-full transition-transform duration-300 ease-in-out shadow-[0_1px_2px_rgba(0,0,0,0.2)]"
                                style={{ transform: darkMode ? 'translateX(16px)' : 'translateX(0)' }}
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
