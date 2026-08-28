import { useState } from "react";
import AlertsList from "../../features/dashboard/components/AlertsList";
import DashboardHeader from "../../features/dashboard/components/DashboardHeader";
import AlertFilters from "../../features/dashboard/components/AlertFilters";
import StatsCards from "../../features/dashboard/components/StatsCards";
import { alerts } from "../../features/dashboard/constants/alertsData";

export default function DashboardPage() {
    const [filters, setFilters] = useState({
        status: "Pendientes",
        priority: "ALTA",
        revision: "En Revisión",
    });
    const [currentView, setCurrentView] = useState("dashboard");

    const handleSelectAlert = () => setCurrentView("alertas");

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">

            <main className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                {currentView === "dashboard" && (
                    <>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
                            <div>
                                <h1 className="text-2xl font-bold tracking-tight text-slate-900">Panel Principal</h1>
                                <p className="text-sm text-slate-500 mt-1">Monitoreo y resumen general de cumplimiento PLD.</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    Sistema en vivo
                                </span>
                            </div>
                        </div>

                        <StatsCards />

                        <div className="space-y-4">
                            <AlertFilters filters={filters} onFilterChange={setFilters} />
                            <AlertsList alerts={alerts} onSelectAlert={handleSelectAlert} />
                        </div>
                    </>
                )}
            </main>
        </div>
    )
}
