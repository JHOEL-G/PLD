import React, { Activity, useState } from "react";
import { Search, Settings, ChevronDown, Menu, FileText, TrendingUp, Shield } from "lucide-react";
import GestionAlertas from "../alertas/GestionAlertas";
import SystemModules from "../moduls/SystemModules";
import ListasBusquedaSystem from "../listas/ListasBusquedaSystem";
import PerfilCliente from "../cliente/PerfilCliente";
import TransactionalProfileApp from "../transacional/TransactionalProfileApp";
import ClientOperationsSystem from "../operaciones/ClientOperationsSystem ";
import Monitoreo from "../monitoreos/Monitoreo";
import BuzonDenuncias from "../denuncias/BuzonDenuncias";
import ConfigurarPlantilla from "../configuracion_excel/ConfigurarPlantilla";
import SettingsPage from "../configuracion/SettingsPage";

export default function GeminiPLD() {
  const [filters, setFilters] = useState({
    status: "Pendientes",
    priority: "ALTA",
    revision: "En Revisión",
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState("dashboard");

  const alerts = [
    {
      id: "PLD-2025-00123",
      jud: "JU+ 2025-00783",
      cliente: "Juan Pérez López 9787",
      ubicacion: "Umbrict Transaccional",
      monto: 580000,
      tipoCuenta: "Monto",
      fecha: "24/11/2025",
      dias: 4,
      status: "critical",
      statusLabel: "CRÍTICA",
      priority: "red",
    },
    {
      id: "PLD-2025-00124",
      cliente: "Juan Pérez López 9787",
      ubicacion: "Umbrict Transaccional",
      monto: 1200000,
      tipoCuenta: "Monto",
      fecha: "24/11/2025",
      dias: 5,
      status: "revision",
      statusLabel: "En Revisión",
      priority: "orange",
    },
    {
      id: "PLD-2025-00125",
      jud: "JU+ 2025-45678",
      cliente: "EMPRESA X S.A.",
      clasificacion: "B. ALTA",
      monto: 250000,
      tipoCuenta: "Fecha Creación",
      fecha: "23/11/2025",
      dias: 5,
      status: "pending",
      statusLabel: "Pendiente",
      priority: "orange",
    },
    {
      id: "PLD-2025-00126",
      cliente: "EMPRESA Coincidida Listas Negras",
      operacion: "Operación en Efectivo",
      monto: 95000,
      tipoCuenta: "Fecha Creación",
      fecha: "23/11/2025",
      dias: 3,
      status: "revision",
      statusLabel: "En Revisión",
      priority: "yellow",
    },
    {
      id: "PLD-2025-00127",
      clasificacion: "CRÍTICA",
      cliente: "Carlos Ruiz Alto Riesgo",
      monto: 350000,
      tipoCuenta: "Fecha Creación",
      fecha: "20/11/2025",
      dias: 8,
      status: "escalated",
      statusLabel: "Escalada a Reporte",
      priority: "red",
    },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "red":
        return "border-l-red-500";
      case "orange":
        return "border-l-orange-500";
      case "yellow":
        return "border-l-yellow-500";
      default:
        return "border-l-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SystemModules
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onNavigate={(id) => setCurrentView(id)}
      />

      {/* Header Global */}
      <div className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-blue-400"
          >
            <Menu size={28} />
          </button>
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

        {/* Indicador de vista actual */}
        <h2 className="text-lg font-semibold capitalize">
          {currentView === "dashboard"
            ? "Alertas Activas"
            : "Gestión Detallada"}
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

      <main className="p-6">
        {currentView === "dashboard" && (
          <div className="space-y-6">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-gray-800">
                Panel Principal
              </h1>
              <p className="text-gray-500">Resumen general de cumplimiento.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-blue-700 text-white rounded-lg p-6 shadow-lg">
                <div className="text-sm font-medium mb-2 uppercase">
                  Total Alertas
                </div>
                <div className="text-4xl font-bold">1,250</div>
              </div>
              <div className="bg-red-500 text-white rounded-lg p-6 shadow-lg">
                <div className="text-sm font-medium mb-2 uppercase">
                  Críticas
                </div>
                <div className="text-4xl font-bold">25</div>
              </div>
              <div className="bg-blue-200 text-blue-900 rounded-lg p-6 shadow-lg">
                <div className="text-sm font-medium mb-2 uppercase">
                  Pendientes
                </div>
                <div className="text-4xl font-bold">80</div>
              </div>
              <div className="bg-orange-400 text-white rounded-lg p-6 shadow-lg">
                <div className="text-sm font-medium mb-2 uppercase">
                  En Revisión
                </div>
                <div className="text-4xl font-bold">55</div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex flex-wrap items-center gap-3">
                <select
                  className="border border-gray-300 rounded px-3 py-2 text-sm outline-none"
                  value={filters.status}
                  onChange={(e) =>
                    setFilters({ ...filters, status: e.target.value })
                  }
                >
                  <option>Pendientes</option>
                  <option>En Revisión</option>
                  <option>Críticas</option>
                </select>

                <button className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded text-sm font-medium">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  ALTA
                  <ChevronDown className="w-4 h-4" />
                </button>

                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Buscar por Cliente, Monto..."
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  />
                </div>

                <button className="bg-blue-700 text-white p-2 rounded hover:bg-blue-800 transition-colors">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Alerts List */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-4 py-3 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-800">
                  Extracto de Alertas
                </h3>
              </div>
              <div className="divide-y">
                {alerts.map((alert, index) => (
                  <div
                    key={index}
                    className={`flex items-center p-4 border-l-4 hover:bg-gray-50 transition-colors ${getPriorityColor(
                      alert.priority
                    )}`}
                  >
                    <div className="flex-1 flex justify-between items-start">
                      <div className="space-y-1">
                        {alert.clasificacion && (
                          <div className="text-xs font-bold text-red-600 uppercase">
                            {alert.clasificacion}
                          </div>
                        )}
                        <button
                          onClick={() => setCurrentView("alertas")}
                          className="text-sm text-blue-600 font-bold hover:underline"
                        >
                          ID: {alert.id}
                        </button>
                        <div className="text-sm text-gray-800 font-medium">
                          Cliente: {alert.cliente}
                        </div>
                        <div className="text-xs text-gray-500">
                          {alert.ubicacion || alert.operacion}
                        </div>
                      </div>

                      <div className="text-right space-y-1">
                        <div className="text-xs text-gray-500 uppercase">
                          {alert.tipoCuenta === "Monto"
                            ? "Monto de Operación"
                            : "Fecha Registro"}
                        </div>
                        <div className="font-bold text-gray-900">
                          ${alert.monto.toLocaleString()} MXN
                        </div>
                        <div className="text-xs font-medium text-gray-600">
                          {alert.dias} días activa
                        </div>
                        <div>
                          <span
                            className={`px-2 py-1 rounded text-[10px] font-bold text-white uppercase ${alert.status === "critical"
                              ? "bg-red-600"
                              : alert.status === "revision"
                                ? "bg-blue-500"
                                : "bg-gray-400"
                              }`}
                          >
                            {alert.statusLabel}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Vista Gestión de Alertas */}
        {currentView === "alertas" && <GestionAlertas />}
        {currentView === "consulta" && <ListasBusquedaSystem />}
        {currentView === "cliente" && <PerfilCliente />}
        {currentView === "transacional" && <TransactionalProfileApp />}
        {currentView === "operaciones" && <ClientOperationsSystem />}
        {currentView === "monitoreo" && <Monitoreo />}
        {currentView === "denuncias" && <BuzonDenuncias />}
        {currentView === "configuracion" && <SettingsPage />}


        {currentView === "auditoria" && (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <Shield className="w-16 h-16 mx-auto text-gray-600 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Auditoría</h2>
            <p className="text-gray-600">En desarrollo</p>
          </div>
        )}
      </main>
    </div>
  );
}
