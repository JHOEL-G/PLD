import { LogOut } from "lucide-react";
import { User } from "lucide-react";

export default function SidebarUser({ expanded, darkMode, session, onNavigateProfile, onLogout }) {

    return (
        <div
            className={`flex items-center gap-3 p-2 rounded-xl transition-all duration-200 ease-in-out ${expanded
                ? darkMode
                    ? 'bg-[rgba(39,39,42,0.3)]'
                    : 'bg-[rgba(124,58,237,0.05)]'
                : ''
                }`}
            style={{ justifyContent: expanded ? 'flex-start' : 'center' }}
        >
            <button
                onClick={onNavigateProfile}
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border-none cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.1)]"
                style={{ background: `linear-gradient(135deg, var(--acrecer-purple), var(--acrecer-blue))` }}
            >
                <User size={16} className="text-white" />
            </button>

            {expanded && (
                <>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold whitespace-nowrap overflow-hidden text-ellipsis text-slate-800">
                            ALEX
                        </p>

                        <p className="text-[9px] text-slate-500 font-semibold uppercase whitespace-nowrap overflow-hidden text-ellipsis">
                            ALEX@GMAIL.COM
                        </p>
                    </div>

                    <LogOut
                        size={14}
                        className="text-muted-foreground cursor-pointer shrink-0 transition-colors duration-200 hover:text-[var(--acrecer-purple)]"
                        onClick={onLogout}
                    />
                </>
            )}
        </div>
    )
}
