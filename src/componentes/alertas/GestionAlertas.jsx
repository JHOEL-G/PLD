import React, { useState } from "react";
import {
  Bell,
  AlertTriangle,
  Clock,
  Settings,
  FileSearch,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Edit3,
  X,
} from "lucide-react";

export default function GestionAlertas() {
  const [activeTab, setActiveTab] = useState("activas");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [priorityFilter, setPriorityFilter] = useState("todas");
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [statusNotes, setStatusNotes] = useState("");

  const alertStats = [
    {
      icon: Bell,
      label: "Total Alertas",
      value: 8,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: AlertTriangle,
      label: "Críticas",
      value: 2,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      icon: Clock,
      label: "Pendientes",
      value: 4,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      icon: FileSearch,
      label: "En Revisión",
      value: 2,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: Eye,
      label: "Verificadas",
      value: 0,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: XCircle,
      label: "Bloqueadas",
      value: 0,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
    },
    {
      icon: CheckCircle,
      label: "Resueltas",
      value: 2,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
    }
  ];

  const [alertsData, setAlertsData] = useState([
    {
      id: "A001",
      priority: "CRITICA",
      priorityColor: "bg-red-500",
      status: "Pendiente",
      statusColor: "bg-red-100 text-red-800",
      title: "Umbral Transaccional",
      description: "Cliente excedió umbral mensual de $500,000 MXN",
      cliente: "Juan Pérez García",
      clienteId: "C001",
      monto: "$650,000 MXN",
      fecha: "2024-11-24 10:30",
      borderColor: "border-l-red-500",
    },
    {
      id: "A002",
      priority: "ALTA",
      priorityColor: "bg-orange-500",
      status: "En Revisión",
      statusColor: "bg-yellow-100 text-yellow-800",
      title: "Coincidencia Lista PEP",
      description: "Coincidencia del 95% con registro en Lista PEP",
      cliente: "María González",
      clienteId: "C003",
      monto: "N/A",
      fecha: "2024-11-24 09:15",
      borderColor: "border-l-orange-500",
    },
    {
      id: "A003",
      priority: "MEDIA",
      priorityColor: "bg-yellow-500",
      status: "Pendiente",
      statusColor: "bg-red-100 text-red-800",
      title: "Perfil Inusual",
      description:
        "Patrón de operaciones diferente al perfil transaccional declarado",
      cliente: "Empresa XYZ SA",
      clienteId: "C002",
      monto: "$250,000 MXN",
      fecha: "2024-11-23 16:45",
      borderColor: "border-l-yellow-500",
    },
    {
      id: "A004",
      priority: "ALTA",
      priorityColor: "bg-orange-500",
      status: "Resuelta",
      statusColor: "bg-green-100 text-green-800",
      title: "Operación en Efectivo",
      description: "Operación en efectivo superior a $100,000 MXN",
      cliente: "Carlos Ramírez",
      clienteId: "C005",
      monto: "$150,000 MXN",
      fecha: "2024-11-23 14:20",
      borderColor: "border-l-orange-500",
    },
    {
      id: "A005",
      priority: "CRITICA",
      priorityColor: "bg-red-500",
      status: "En Revisión",
      statusColor: "bg-yellow-100 text-yellow-800",
      title: "Múltiples Transacciones Fragmentadas",
      description: "Patrón de fragmentación para evitar detección",
      cliente: "Roberto Silva",
      clienteId: "C008",
      monto: "$890,000 MXN",
      fecha: "2024-11-22 11:30",
      borderColor: "border-l-red-500",
    },
    {
      id: "A006",
      priority: "MEDIA",
      priorityColor: "bg-yellow-500",
      status: "Pendiente",
      statusColor: "bg-red-100 text-red-800",
      title: "Cliente de Alto Riesgo",
      description: "Actividad inusual en cuenta de alto riesgo",
      cliente: "Imports Global SA",
      clienteId: "C012",
      monto: "$425,000 MXN",
      fecha: "2024-11-22 09:00",
      borderColor: "border-l-yellow-500",
    },
    {
      id: "A007",
      priority: "ALTA",
      priorityColor: "bg-orange-500",
      status: "Pendiente",
      statusColor: "bg-red-100 text-red-800",
      title: "Transferencias Internacionales Sospechosas",
      description: "Múltiples transferencias a paraísos fiscales",
      cliente: "Tech Solutions Inc",
      clienteId: "C015",
      monto: "$1,200,000 MXN",
      fecha: "2024-11-21 15:45",
      borderColor: "border-l-orange-500",
    },
    {
      id: "A008",
      priority: "MEDIA",
      priorityColor: "bg-yellow-500",
      status: "Resuelta",
      statusColor: "bg-green-100 text-green-800",
      title: "Cambio Repentino de Comportamiento",
      description: "Incremento significativo en volumen de operaciones",
      cliente: "Laura Martínez",
      clienteId: "C018",
      monto: "$180,000 MXN",
      fecha: "2024-11-21 10:20",
      borderColor: "border-l-yellow-500",
    },
  ]);

  const filteredAlerts = alertsData.filter((alert) => {
    const matchesStatus =
      statusFilter === "todos" || alert.status === statusFilter;
    const matchesPriority =
      priorityFilter === "todas" || alert.priority === priorityFilter;
    return matchesStatus && matchesPriority;
  });

  const handleOpenStatusModal = (alert) => {
    setSelectedAlert(alert);
    setNewStatus(alert.status);
    setStatusNotes("");
    setShowStatusModal(true);
  };

  const handleStatusChange = () => {
    if (!selectedAlert || !newStatus) return;

    const updatedAlerts = alertsData.map((alert) => {
      if (alert.id === selectedAlert.id) {
        let statusColor = "";
        let borderColor = "";

        switch (newStatus) {
          case "Pendiente":
            statusColor = "bg-red-100 text-red-800";
            break;
          case "En Revisión":
            statusColor = "bg-yellow-100 text-yellow-800";
            break;
          case "Resuelta":
            statusColor = "bg-green-100 text-green-800";
            break;
          case "Verificado":
            statusColor = "bg-blue-100 text-blue-800";
            borderColor = "border-l-blue-500";
            break;
          case "Bloqueado":
            statusColor = "bg-gray-100 text-gray-800";
            borderColor = "border-l-gray-500";
            break;
          default:
            statusColor = alert.statusColor;
        }

        return {
          ...alert,
          status: newStatus,
          statusColor: statusColor,
          borderColor: borderColor || alert.borderColor,
          lastUpdate: new Date().toISOString().split("T")[0],
          notes: statusNotes,
        };
      }
      return alert;
    });

    setAlertsData(updatedAlerts);
    setShowStatusModal(false);
    setSelectedAlert(null);
    setNewStatus("");
    setStatusNotes("");
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Verificado":
        return <CheckCircle className="w-4 h-4" />;
      case "Bloqueado":
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Gestión de Alertas
              </h1>
              <p className="text-sm text-gray-500">
                Configuración, Tipos de Alertas y Notificaciones
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("activas")}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${activeTab === "activas"
                ? "text-red-600 border-b-2 border-red-600 bg-red-50"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Bell className="w-4 h-4" />
                Alertas Activas
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {alertStats.reduce((acc, stat) => acc + stat.value, 0)}
                </span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("historial")}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${activeTab === "historial"
                ? "text-red-600 border-b-2 border-red-600 bg-red-50"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Eye className="w-4 h-4" />
                Historial de Alertas
              </div>
            </button>
            <button
              onClick={() => setActiveTab("tipos")}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${activeTab === "tipos"
                ? "text-red-600 border-b-2 border-red-600 bg-red-50"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Settings className="w-4 h-4" />
                Tipos de Alertas
              </div>
            </button>
          </div>
        </div>

        {/* Alert Stats Grid */}
        {activeTab === "activas" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {alertStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`${stat.bgColor} rounded-lg p-3`}>
                        <IconComponent className={`w-6 h-6 ${stat.color}`} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">
                          {stat.label}
                        </p>
                        <p className="text-3xl font-bold text-gray-900">
                          {stat.value}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Historial de Alertas */}
        {activeTab === "historial" && (
          <div>
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <Filter className="w-4 h-4" />
                  <span className="text-sm font-medium">Filtros:</span>
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="todos">Todos los Estatus</option>
                  <option value="Pendiente">Pendiente</option>
                  <option value="En Revisión">En Revisión</option>
                  <option value="Resuelta">Resuelta</option>
                  <option value="Verificado">Verificado</option>
                  <option value="Bloqueado">Bloqueado</option>
                </select>

                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="todas">Todas las Prioridades</option>
                  <option value="CRITICA">Crítica</option>
                  <option value="ALTA">Alta</option>
                  <option value="MEDIA">Media</option>
                </select>

                <div className="ml-auto text-sm text-gray-600">
                  <span className="font-medium">{filteredAlerts.length}</span>{" "}
                  alertas encontradas
                </div>
              </div>
            </div>

            {/* Alerts List */}
            <div className="space-y-4">
              {filteredAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-all border-l-4 ${alert.borderColor}`}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-orange-50 rounded-lg p-3">
                          <AlertTriangle className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-gray-600">
                              {alert.id}
                            </span>
                            <span
                              className={`${alert.priorityColor} text-white text-xs font-bold px-2 py-1 rounded`}
                            >
                              {alert.priority}
                            </span>
                            <span
                              className={`${alert.statusColor} text-xs font-medium px-2 py-1 rounded flex items-center gap-1`}
                            >
                              {getStatusIcon(alert.status)}
                              {alert.status}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-gray-900">
                            {alert.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {alert.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleOpenStatusModal(alert)}
                          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                        >
                          <Edit3 className="w-4 h-4" />
                          Cambiar Status
                        </button>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          Ver Detalle
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 pt-4 border-t border-gray-100">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Cliente:</p>
                        <p className="text-sm font-medium text-gray-900">
                          {alert.cliente}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">ID:</p>
                        <p className="text-sm font-medium text-gray-900">
                          {alert.clienteId}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Monto:</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {alert.monto}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Fecha:</p>
                        <p className="text-sm font-medium text-gray-900">
                          {alert.fecha}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tipos de Alertas Content */}
        {activeTab === "tipos" && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Configuración de Tipos de Alertas
              </h3>
              <p className="text-sm text-gray-600">
                Configure qué tipos de alertas deben generarse automáticamente
              </p>
            </div>

            <div className="space-y-4">
              {/* Umbral Transaccional */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Umbral Transaccional
                  </h4>
                  <p className="text-sm text-gray-500">
                    Excede límite de operaciones mensuales
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Coincidencia PEP */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Coincidencia PEP
                  </h4>
                  <p className="text-sm text-gray-500">
                    Coincidencia en Lista PEP
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Coincidencia Listas Negras */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Coincidencia Listas Negras
                  </h4>
                  <p className="text-sm text-gray-500">
                    Coincidencia en listas OFAC, ONU, UE
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Perfil Inusual */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Perfil Inusual
                  </h4>
                  <p className="text-sm text-gray-500">
                    Operaciones fuera del perfil transaccional
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Operación en Efectivo */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Operación en Efectivo
                  </h4>
                  <p className="text-sm text-gray-500">
                    Operaciones en efectivo superiores al umbral
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* País de Alto Riesgo */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    País de Alto Riesgo
                  </h4>
                  <p className="text-sm text-gray-500">
                    Operaciones con países de alto riesgo
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Transacciones Fragmentadas */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Transacciones Fragmentadas
                  </h4>
                  <p className="text-sm text-gray-500">
                    Patrón de fragmentación sospechoso
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Cliente Alto Riesgo */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Cliente Alto Riesgo
                  </h4>
                  <p className="text-sm text-gray-500">
                    Actividad inusual en cuentas de alto riesgo
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Transferencias Internacionales */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Transferencias Internacionales Sospechosas
                  </h4>
                  <p className="text-sm text-gray-500">
                    Múltiples transferencias a paraísos fiscales
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Cambio de Comportamiento */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Cambio Repentino de Comportamiento
                  </h4>
                  <p className="text-sm text-gray-500">
                    Incremento significativo en volumen de operaciones
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>

            {/* Guardar Button */}
            <div className="mt-8 flex justify-start">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm">
                <Settings className="w-4 h-4" />
                Guardar Configuración
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal de Cambio de Status */}
      {showStatusModal && selectedAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Edit3 className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Cambiar Status de Alerta
                    </h2>
                    <p className="text-sm text-gray-600">
                      {selectedAlert.id} - {selectedAlert.cliente}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowStatusModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Información de la Alerta */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {selectedAlert.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {selectedAlert.description}
                </p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500">Prioridad: </span>
                    <span
                      className={`${selectedAlert.priorityColor} text-white text-xs font-bold px-2 py-1 rounded`}
                    >
                      {selectedAlert.priority}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Status Actual: </span>
                    <span
                      className={`${selectedAlert.statusColor} text-xs font-medium px-2 py-1 rounded`}
                    >
                      {selectedAlert.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Selector de Nuevo Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Nuevo Status <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setNewStatus("Pendiente")}
                    className={`p-4 border-2 rounded-lg transition-all ${newStatus === "Pendiente"
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-red-600" />
                      <div className="text-left">
                        <p className="font-semibold text-gray-900">Pendiente</p>
                        <p className="text-xs text-gray-500">
                          Requiere revisión
                        </p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setNewStatus("En Revisión")}
                    className={`p-4 border-2 rounded-lg transition-all ${newStatus === "En Revisión"
                      ? "border-yellow-500 bg-yellow-50"
                      : "border-gray-200 hover:border-gray-300"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <FileSearch className="w-5 h-5 text-yellow-600" />
                      <div className="text-left">
                        <p className="font-semibold text-gray-900">
                          En Revisión
                        </p>
                        <p className="text-xs text-gray-500">En proceso</p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setNewStatus("Verificado")}
                    className={`p-4 border-2 rounded-lg transition-all ${newStatus === "Verificado"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                      <div className="text-left">
                        <p className="font-semibold text-gray-900">
                          Verificado
                        </p>
                        <p className="text-xs text-gray-500">
                          Cliente validado
                        </p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setNewStatus("Bloqueado")}
                    className={`p-4 border-2 rounded-lg transition-all ${newStatus === "Bloqueado"
                      ? "border-gray-500 bg-gray-50"
                      : "border-gray-200 hover:border-gray-300"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <XCircle className="w-5 h-5 text-gray-600" />
                      <div className="text-left">
                        <p className="font-semibold text-gray-900">Bloqueado</p>
                        <p className="text-xs text-gray-500">
                          Acceso suspendido
                        </p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setNewStatus("Resuelta")}
                    className={`p-4 border-2 rounded-lg transition-all ${newStatus === "Resuelta"
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-gray-300"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div className="text-left">
                        <p className="font-semibold text-gray-900">Resuelta</p>
                        <p className="text-xs text-gray-500">
                          Alerta cerrada
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Notas */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notas del Cambio (Opcional)
                </label>
                <textarea
                  value={statusNotes}
                  onChange={(e) => setStatusNotes(e.target.value)}
                  placeholder="Ingrese cualquier observación relevante sobre este cambio de status..."
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {/* Información adicional según el status */}
              {newStatus === "Verificado" && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-blue-900 mb-1">
                        Cliente Verificado
                      </p>
                      <p className="text-sm text-blue-800">
                        Esta acción marcará al cliente como verificado y
                        permitirá sus operaciones normalmente.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {newStatus === "Bloqueado" && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-red-900 mb-1">
                        Cliente Bloqueado
                      </p>
                      <p className="text-sm text-red-800">
                        Esta acción bloqueará las operaciones del cliente hasta
                        nueva revisión. Se notificará al área correspondiente.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Botones de acción */}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowStatusModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleStatusChange}
                  disabled={!newStatus}
                  className={`flex-1 px-4 py-3 font-medium rounded-lg transition-colors ${newStatus
                    ? "bg-orange-600 hover:bg-orange-700 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                >
                  Confirmar Cambio
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}