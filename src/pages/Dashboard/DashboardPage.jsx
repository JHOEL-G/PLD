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
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [currentView, setCurrentView] = useState("dashboard");

    const handleSelectAlert = () => setCurrentView("alertas");

    return (
        <div className="min-h-screen bg-gray-50">

            <DashboardHeader
                currentView={currentView}
                onOpenSidebar={() => setIsSidebarOpen(true)}
            />

            <main className="p-6">
                {currentView === "dashboard" && (
                    <div className="space-y-6">
                        <div className="flex flex-col">
                            <h1 className="text-2xl font-bold text-gray-800">Panel Principal</h1>
                            <p className="text-gray-500">Resumen general de cumplimiento.</p>
                        </div>

                        <StatsCards />

                        <AlertFilters filters={filters} onFilterChange={setFilters} />

                        <AlertsList alerts={alerts} onSelectAlert={handleSelectAlert} />
                    </div>
                )}
            </main>
        </div>
    )
}
