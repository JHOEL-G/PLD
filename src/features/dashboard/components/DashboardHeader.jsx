import { ShieldCheck } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import { Bell } from "lucide-react";
import { Settings } from "lucide-react";
import { Menu } from "lucide-react";
import { useLocation } from "react-router-dom";
import { menuSlide } from "../../../components/layout/Sidebar/constants/menuSlide";

export default function DashboardHeader() {
    const location = useLocation();
    const getCurrentModule = () => {
        const modulo = menuSlide.find(
            item => item.url === location.pathname
        );

        if (modulo) {
            return modulo.moduloNombre;
        }

        for (const item of menuSlide) {
            const subModulo = item.modulos?.find(
                sub => sub.url === location.pathname
            )

            if (subModulo) {
                return `${item.moduloNombre} - ${subModulo.moduloNombre}`;
            }
        }

        return "FORTIA PLD";
    }

    const currentView = getCurrentModule();

    return (
        <nav className="fixed top-4 right-6 z-50 w-auto">
            <div className="flex items-center gap-3 px-3.5 py-2 bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-full shadow-lg shadow-slate-200/50 ring-1 ring-black/5 transition-all">

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100/80 border border-slate-200/60">
                    <LayoutDashboard className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-semibold tracking-wide text-slate-700">
                        {currentView}
                    </span>
                </div>

                <div className="h-4 w-[1px] bg-slate-200" />

                <div className="flex items-center gap-1.5">
                    <button
                        className="relative p-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                        aria-label="Notificaciones"
                    >
                        <Bell className="w-4 h-4" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white" />
                    </button>

                    <button
                        className="p-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                        aria-label="Configuración"
                    >
                        <Settings className="w-4 h-4" />
                    </button>

                    <div className="h-4 w-[1px] bg-slate-200" />

                    <div className="flex items-center gap-2 pl-1 cursor-pointer group">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-sm ring-2 ring-blue-50">
                            AP
                        </div>
                        <div className="hidden sm:block text-left pr-1">
                            <p className="text-xs font-medium leading-none text-slate-800 group-hover:text-blue-600 transition-colors">
                                Analista Pérez
                            </p>
                            <p className="text-[9px] font-medium text-slate-400 mt-0.5">
                                Oficial PLD
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </nav>
    )
}
