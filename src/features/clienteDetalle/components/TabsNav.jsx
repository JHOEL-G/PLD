import { useState } from "react";
import {
    User,
    Activity,
    Package,
    Folder,
    ShieldAlert,
    CreditCard,
    ChevronDown,
} from "lucide-react";

export const CLIENTE_TABS = [
    { id: "cliente", label: "Cliente", icon: User },
    { id: "seguimientos", label: "Seguimientos", icon: Activity },
    { id: "productos", label: "Productos", icon: Package },
    { id: "archivos", label: "Archivos", icon: Folder },
    {
        id: "pld",
        label: "PLD",
        icon: ShieldAlert,
        children: [
            { id: "transaccional", label: "Transaccional" },
            { id: "ebr", label: "EBR" },
        ],
    },
    { id: "circulo", label: "Círculo de Crédito", icon: CreditCard },
];

const CHILD_PARENT_MAP = CLIENTE_TABS.reduce((acc, t) => {
    (t.children ?? []).forEach((c) => {
        acc[c.id] = t.id;
    });
    return acc;
}, {});

export default function TabsNav({ tab, setTab }) {
    const activeParentId = CHILD_PARENT_MAP[tab] ?? tab;
    const [expanded, setExpanded] = useState(() => new Set([activeParentId]));

    const toggleExpanded = (id) => {
        setExpanded((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    const handleParentClick = (t) => {
        if (t.children?.length) {
            const isExpanded = expanded.has(t.id);
            if (!isExpanded) toggleExpanded(t.id);
            if (tab !== t.id && !t.children.some((c) => c.id === tab)) {
                setTab(t.children[0].id);
            }
        } else {
            setTab(t.id);
        }
    };

    return (
        <nav className="flex flex-col gap-1.5 w-full">
            <span className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Navegación
            </span>
            {CLIENTE_TABS.map((t) => {
                const Icon = t.icon;
                const hasChildren = !!t.children?.length;
                const isParentActive = activeParentId === t.id;
                const isExpanded = expanded.has(t.id);

                return (
                    <div key={t.id} className="flex flex-col">
                        <button
                            onClick={() => handleParentClick(t)}
                            className={`group relative flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isParentActive
                                ? "bg-teal-600 text-white shadow-md shadow-teal-600/20 font-semibold"
                                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <Icon
                                    className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${isParentActive ? "text-white" : "text-slate-400 group-hover:text-slate-600"
                                        }`}
                                />
                                <span>{t.label}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                {!hasChildren && isParentActive && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                )}
                                {hasChildren && (
                                    <ChevronDown
                                        className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? "rotate-180" : "rotate-0"
                                            } ${isParentActive ? "text-white" : "text-slate-400"}`}
                                    />
                                )}
                            </div>
                        </button>

                        {hasChildren && isExpanded && (
                            <div className="flex flex-col gap-0.5 mt-1 ml-4 pl-3 border-l border-slate-200">
                                {t.children.map((c) => {
                                    const isChildActive = tab === c.id;
                                    return (
                                        <button
                                            key={c.id}
                                            onClick={() => setTab(c.id)}
                                            className={`flex items-center justify-between px-3 py-2 rounded-lg text-[13px] font-medium transition-colors duration-200 ${isChildActive
                                                ? "bg-teal-50 text-teal-700 font-semibold"
                                                : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                                                }`}
                                        >
                                            <span>{c.label}</span>
                                            {isChildActive && (
                                                <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}