import SidebarItem from "./SidebarItem";

export default function SidebarMenu({ modules, expanded, darkMode }) {
    return (
        <>
            {expanded && (
                <div className="px-4 mb-2 flex items-center gap-1.5">
                    <span
                        className="w-1 h-3 rounded-full"
                        style={{ background: `linear-gradient(180deg, var(--acrecer-purple), var(--acrecer-blue))` }}
                    />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                        Menú Principal
                    </span>
                </div>
            )}

            <nav className="flex-1 min-h-0 px-2.5 overflow-y-auto overflow-x-visible flex flex-col gap-0.5 [&::-webkit-scrollbar]:hidden">
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
        </>
    )
}
