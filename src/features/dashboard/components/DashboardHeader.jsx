import { Settings } from "lucide-react";
import { Menu } from "lucide-react";

export default function DashboardHeader({ currentView, onOpenSidebar }) {
    return (
        <div className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between sticky top-0 z-30">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-xl">
                    G
                </div>
                <div>
                    <h1 className="text-xl font-bold">FORTIAPLD</h1>
                    <p className="text-xs text-gray-400">
                        Sistema de Prevención Lavado Dinero
                    </p>
                </div>
            </div>

            <h2 className="text-lg font-semibold capitalize">
                {currentView === "dashboard" ? "Alertas Activas" : "Gestión Detallada"}
            </h2>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-xs font-bold">
                        AP
                    </div>
                    <span className="text-sm hidden md:inline">Analista Pérez</span>
                </div>
                <Settings className="w-5 h-5 cursor-pointer text-gray-400 hover:text-white" />
            </div>
        </div>
    )
}
