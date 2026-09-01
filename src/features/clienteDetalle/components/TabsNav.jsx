import {
    User,
    Activity,
    Package,
    Folder,
    ShieldAlert,
    CreditCard
} from "lucide-react";

export const CLIENTE_TABS = [
    { id: "cliente", label: "Cliente", icon: User },
    { id: "seguimientos", label: "Seguimientos", icon: Activity },
    { id: "productos", label: "Productos", icon: Package },
    { id: "archivos", label: "Archivos", icon: Folder },
    { id: "pld", label: "PLD", icon: ShieldAlert },
    { id: "circulo", label: "Círculo de Crédito", icon: CreditCard },
];

export default function TabsNav({ tab, setTab }) {
    return (
        <nav className="flex flex-col gap-1.5 w-full">
            <span className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Navegación
            </span>
            {CLIENTE_TABS.map((t) => {
                const Icon = t.icon;
                const isActive = tab === t.id;

                return (
                    <button
                        key={t.id}
                        onClick={() => setTab(t.id)}
                        className={`group relative flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                            ? "bg-teal-600 text-white shadow-md shadow-teal-600/20 font-semibold"
                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <Icon
                                className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600"
                                    }`}
                            />
                            <span>{t.label}</span>
                        </div>

                        {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        )}
                    </button>
                );
            })}
        </nav>
    );
}