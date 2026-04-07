import React from "react";
import {
  Users,
  Search,
  Bell,
  TrendingUp,
  Activity,
  Shield,
  FileText,
  Settings,
  ChevronRight,
  X,
  ShieldX,
} from "lucide-react";


export default function SystemModules({ isOpen, onClose, onNavigate }) {
  const modules = [
    {
      id: "dashboard",
      name: "Panel Principal",
      icon: Activity,
      color: "bg-blue-700",
    },
    {
      id: "denuncias",
      name: "Buzón Denuncias",
      icon: ShieldX,
      color: "bg-blue-700",
    },
    {
      id: "operaciones",
      name: "Operaciones",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      id: "consulta", // ← ESTE ID ES IMPORTANTE
      name: "Consulta Listas",
      icon: Search,
      color: "bg-purple-500",
    },
    {
      id: "alertas",
      name: "Gestión Alertas",
      icon: Bell,
      color: "bg-red-500",
    },
    {
      id: "transacional",
      name: "Perfil Transaccional",
      icon: TrendingUp,
      color: "bg-green-500",
    },
    {
      id: "monitoreo",
      name: "Monitoreo",
      icon: Activity,
      color: "bg-orange-500",
    },
    {
      id: "cliente",
      name: "Perfil Cliente",
      icon: FileText,
      color: "bg-blue-600",
    },
    {
      id: "auditoria",
      name: "Auditoría",
      icon: Shield,
      color: "bg-gray-600",
    },
    {
      id: "configuracion",
      name: "Configuración",
      icon: Settings,
      color: "bg-gray-500",
    },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-gray-100 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Header */}
        <div className="p-4 bg-gray-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-xl">
              G
            </div>
            <div>
              <h2 className="text-xl font-bold">FORTIA PLD</h2>
              <p className="text-xs text-gray-400">Sistema Modular</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-800 rounded transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Módulos */}
        <div className="p-4 space-y-3 overflow-y-auto h-[calc(100vh-120px)]">
          {modules.map((module) => {
            const IconComponent = module.icon;
            return (
              <button
                key={module.id}
                onClick={() => {
                  if (onNavigate) onNavigate(module.id);
                  onClose();
                }}
                className="w-full bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-4 flex items-center justify-between group border border-gray-100 hover:border-blue-300"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`${module.color} rounded-lg p-2.5 text-white group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent size={20} strokeWidth={2} />
                  </div>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">
                    {module.name}
                  </span>
                </div>
                <ChevronRight
                  className="text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all"
                  size={18}
                />
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-200 border-t border-gray-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-xs font-bold text-white">
              AP
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-gray-800">
                Analista Pérez
              </div>
              <div className="text-xs text-gray-500">
                Oficial de Cumplimiento
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
