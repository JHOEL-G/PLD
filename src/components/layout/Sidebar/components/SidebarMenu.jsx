import SidebarItem from "./SidebarItem";

export default function SidebarMenu({ modules, expanded, darkMode }) {
    return (
        <div className="flex-1 min-h-0 flex flex-col">
            <div className={`px-4 mb-2 flex items-center gap-2 transition-opacity duration-300 ${expanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}>
                <span
                    className="w-1 h-3 rounded-full"
                    style={{ background: `linear-gradient(180deg, var(--acrecer-purple, #8b5cf6), var(--acrecer-blue, #3b82f6))` }}
                />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">
                    Menú Principal
                </span>
            </div>

            <nav className="flex-1 px-2 overflow-y-auto overflow-x-hidden flex flex-col gap-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300 dark:[&::-webkit-scrollbar-thumb]:bg-zinc-700">
                {modules.map(module => (
                    <SidebarItem
                        key={module.id}
                        module={module}
                        expanded={expanded}
                        darkMode={darkMode}
                        depth={0}
                    />
                ))}
            </nav>
        </div>
    )
}
