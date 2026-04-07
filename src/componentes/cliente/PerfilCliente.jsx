import React, { useState } from "react";
import {
  User,
  FileText,
  TrendingUp,
  Shield,
  Edit,
  Download,
  Eye,
  CheckCircle2,
  Calendar,
  Briefcase,
  AlertCircle,
  Plus,
} from "lucide-react";

export default function PerfilCliente() {
  const [activeTab, setActiveTab] = useState("generales");

  const clienteData = {
    nombre: "Juan Pérez García",
    id: "C001",
    rfc: "PEGJ850101ABC",
    riesgo: "Bajo",
    activo: true,
    avatar: "JP",
    tipoPersona: "Persona Física",
    fechaAlta: "2024-01-15",
    actividadEconomica: "Servicios Profesionales",
    nivelRiesgo: "Bajo",
  };

  const documentos = [
    {
      id: 1,
      nombre: "Identificación Oficial",
      archivo: "INE_JuanPerez.pdf",
      fecha: "2024-01-15",
      estado: "Vigente",
    },
    {
      id: 2,
      nombre: "Comprobante Domicilio",
      archivo: "CFE_Octubre2024.pdf",
      fecha: "2024-10-15",
      estado: "Vigente",
    },
    {
      id: 3,
      nombre: "RFC",
      archivo: "ConstanciaRFC.pdf",
      fecha: "2024-01-15",
      estado: "Vigente",
    },
  ];

  const transacciones = [
    {
      id: "T001",
      tipo: "Compraventa Inmueble",
      monto: 2500000,
      fecha: "2024-11-20",
      estatus: "Completada",
    },
    {
      id: "T002",
      tipo: "Compra Vehículo",
      monto: 450000,
      fecha: "2024-10-15",
      estatus: "Completada",
    },
    {
      id: "T003",
      tipo: "Servicio Profesional",
      monto: 85000,
      fecha: "2024-09-10",
      estatus: "Completada",
    },
  ];

  const factoresRiesgo = [
    { factor: "Actividad económica", nivel: "Bajo" },
    { factor: "Volumen transaccional", nivel: "Bajo" },
    { factor: "Origen de recursos", nivel: "Verificado" },
  ];

  const renderDatosGenerales = () => (
    <div className="animate-fadeIn space-y-6">
      {/* Información General Card */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Información General
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nombre Completo
            </label>
            <input
              type="text"
              value={clienteData.nombre}
              disabled
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              RFC
            </label>
            <input
              type="text"
              value={clienteData.rfc}
              disabled
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tipo de Persona
            </label>
            <input
              type="text"
              value={clienteData.tipoPersona}
              disabled
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Fecha de Alta
            </label>
            <input
              type="text"
              value={clienteData.fechaAlta}
              disabled
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Actividad Económica
            </label>
            <input
              type="text"
              value={clienteData.actividadEconomica}
              disabled
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nivel de Riesgo
            </label>
            <input
              type="text"
              value={clienteData.nivelRiesgo}
              disabled
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderExpediente = () => (
    <div className="animate-fadeIn">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Documentos del Expediente
        </h3>

        <div className="space-y-4">
          {documentos.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{doc.nombre}</h4>
                  <p className="text-sm text-gray-500">{doc.archivo}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-xs text-gray-500">Fecha: {doc.fecha}</p>
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium mt-1">
                    <CheckCircle2 size={12} />
                    {doc.estado}
                  </span>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Eye className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTransaccional = () => (

    <div className="animate-fadeIn">
      <div className="bg-white rounded-lg shadow-sm p-6 ">

        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Historial Transaccional
        </h3>
        <div className="flex justify-end">
          <button
            onClick={() => openModal('listas')}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2 whitespace-nowrap mb-7"
          >
            <Plus className="w-4 h-4" />
            <span>Agregar</span>
          </button>
        </div>


        <div className="overflow-x-auto border border-gray-200 rounded-lg">



          <table className="w-full">

            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  ID Transacción
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tipo de Operación
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Monto
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Estatus
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {transacciones.map((trans) => (
                <tr
                  key={trans.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="font-semibold text-gray-900">
                      {trans.id}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{trans.tipo}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="font-semibold text-gray-900">
                      ${trans.monto.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{trans.fecha}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                      <CheckCircle2 size={14} />
                      {trans.estatus}
                    </span>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>

        </div>

      </div>

    </div>
  );

  const renderEBR = () => (
    <div className="animate-fadeIn">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Evaluación Basada en Riesgo (EBR)
        </h3>

        {/* Nivel de Riesgo */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-8 h-8 text-green-600" />
            <div>
              <h4 className="text-lg font-bold text-gray-900">
                Nivel de Riesgo: {clienteData.nivelRiesgo.toUpperCase()}
              </h4>
              <p className="text-sm text-gray-600">
                El cliente presenta un perfil de bajo riesgo basado en los
                factores evaluados.
              </p>
            </div>
          </div>
        </div>

        {/* Factores de Riesgo */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-4">
            Factores de Riesgo
          </h4>
          <div className="space-y-3">
            {factoresRiesgo.map((factor, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">
                    {factor.factor}
                  </span>
                </div>
                <span className="text-sm text-gray-600">{factor.nivel}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Última Evaluación */}
        <div className="border-t border-gray-200 pt-6">
          <h4 className="font-semibold text-gray-900 mb-4">
            Última Evaluación
          </h4>
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              <span className="font-medium">Fecha:</span> 15/01/2024
            </p>
            <p>
              <span className="font-medium">Evaluador:</span> Admin
            </p>
            <p>
              <span className="font-medium">Próxima revisión:</span> 15/01/2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>

      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Perfil del Cliente
                  </h1>
                  <p className="text-sm text-gray-500">
                    Información Completa, Expediente, Transacciones y EBR
                  </p>
                </div>
              </div>
              <button className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                <Download size={18} />
                Exportar Perfil
              </button>
            </div>

            {/* Cliente Info */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  {clienteData.avatar}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {clienteData.nombre}
                  </h2>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-sm text-gray-600">
                      ID: {clienteData.id}
                    </span>
                    <span className="text-sm text-gray-600">
                      RFC: {clienteData.rfc}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                      <CheckCircle2 size={12} />
                      Riesgo: {clienteData.riesgo}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                      <CheckCircle2 size={12} />
                      Activo
                    </span>
                  </div>
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border-2 border-gray-200 text-gray-700 hover:border-purple-600 hover:text-purple-600 font-medium rounded-lg transition-all">
                <Edit size={16} />
                Editar
              </button>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab("generales")}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${activeTab === "generales"
                  ? "text-purple-600 border-b-2 border-purple-600 bg-purple-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <User className="w-4 h-4" />
                  Datos Generales
                </div>
              </button>
              <button
                onClick={() => setActiveTab("expediente")}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${activeTab === "expediente"
                  ? "text-purple-600 border-b-2 border-purple-600 bg-purple-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <FileText className="w-4 h-4" />
                  Expediente
                </div>
              </button>
              <button
                onClick={() => setActiveTab("transaccional")}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${activeTab === "transaccional"
                  ? "text-purple-600 border-b-2 border-purple-600 bg-purple-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Transaccional
                </div>
              </button>
              <button
                onClick={() => setActiveTab("ebr")}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${activeTab === "ebr"
                  ? "text-purple-600 border-b-2 border-purple-600 bg-purple-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4" />
                  EBR
                </div>
              </button>
            </div>
          </div>

          {/* Content */}
          {activeTab === "generales" && renderDatosGenerales()}
          {activeTab === "expediente" && renderExpediente()}
          {activeTab === "transaccional" && renderTransaccional()}
          {activeTab === "ebr" && renderEBR()}
        </div>
      </div>
    </>
  );
}
