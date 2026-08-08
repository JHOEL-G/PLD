import React from 'react'
import { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { getIcon } from "../../../../utils/getIcon";
import { ChevronDown } from "lucide-react";

export default function SidebarItem({ module, expanded, darkMode, depth = 0 }) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const IconComponent = getIcon(module.icono);
    const hasChildren = (module.modulos ?? []).length > 0;
    const isActive = location.pathname === module.url;

    const handleClick = () => {
        if (!expanded || !hasChildren) {
            if (module.url) navigate(module.url);
            return;
        }
        setOpen(prev => !prev);
    };

    return (
        <div className="relative group">
            <button
                onClick={handleClick}
                className={`w-full flex items-center gap-1 rounded-lg py-1.5 border-none cursor-pointer transition-all duration-200 ease-in-out ${depth > 0 ? 'pl-6 pr-2' : 'px-2'
                    } ${isActive
                        ? 'text-white shadow-[0_3px_5px_-1px_rgba(0,0,0,0.1)]'
                        : darkMode
                            ? 'bg-transparent text-muted-foreground hover:bg-[rgba(124,58,237,0.15)] hover:text-foreground'
                            : 'bg-transparent text-foreground hover:bg-[rgba(124,58,237,0.08)] hover:text-[var(--acrecer-purple)]'
                    }`}
                style={{
                    justifyContent: expanded ? 'flex-start' : 'center',
                    ...(isActive && { background: `linear-gradient(135deg, var(--acrecer-purple), var(--acrecer-blue))` })
                }}
            >
                {React.createElement(IconComponent, {
                    size: depth > 0 ? 14 : 16,
                    className: 'shrink-0',
                })}

                {expanded && (
                    <>
                        <span className="text-[10px] font-semibold flex-1 text-left whitespace-nowrap overflow-hidden text-ellipsis">
                            {module.moduloNombre}
                        </span>
                        {hasChildren && (
                            <ChevronDown
                                size={12}
                                className={`shrink-0 transition-transform duration-200 ease-in-out ${open ? 'rotate-180' : ''
                                    }`}
                            />
                        )}
                    </>
                )}
            </button>

            {!expanded && (
                <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1.5 rounded-xl bg-foreground text-background text-[10px] font-semibold whitespace-nowrap z-50 opacity-0 transition-opacity duration-150 shadow-[0_8px_12px_-3px_rgba(0,0,0,0.2)] group-hover:opacity-100">
                    {module.moduloNombre}
                </div>
            )}

            {expanded && hasChildren && open && (
                <div className="mt-[1px] flex flex-col gap-[1px]">
                    {module.modulos.map(sub => (
                        <SidebarItem
                            key={sub.id}
                            module={sub}
                            expanded={expanded}
                            darkMode={darkMode}
                            depth={depth + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
