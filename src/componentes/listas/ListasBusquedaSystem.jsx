import React, { useState, useRef } from "react";
import {
  Search,
  Filter,
  Download,
  ChevronDown,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Home,
  FileText,
  Shield,
  X,
  Plus,
  Eye,
  Printer,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ListasBusquedaSystem() {
  const [currentScreen, setCurrentScreen] = useState("search");
  const [searchName, setSearchName] = useState("");
  const [selectedList, setSelectedList] = useState("todas");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPDFModal, setShowPDFModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const pdfRef = useRef(null);
  const navigate = useNavigate();

  const [historyData, setHistoryData] = useState([
    {
      id: 1,
      fecha: "2024-11-24 10:30",
      nombre: "Juan Pérez García",
      listas: "PEP, Negras",
      resultado: "sin",
      usuario: "Admin",
    },
    {
      id: 2,
      fecha: "2024-11-24 09:15",
      nombre: "María González López",
      listas: "PEP, Negras, Propias",
      resultado: "pep",
      usuario: "Admin",
    },
    {
      id: 3,
      fecha: "2024-11-23 16:45",
      nombre: "Empresa XYZ SA",
      listas: "Negras, Propias",
      resultado: "sin",
      usuario: "User01",
    },
    {
      id: 4,
      fecha: "2024-11-23 14:20",
      nombre: "Carlos Ramírez",
      listas: "Todas",
      resultado: "propia",
      usuario: "Admin",
    },
  ]);

  const [newCoincidence, setNewCoincidence] = useState({
    nombreConsultado: "",
    listasConsultadas: "",
    usuario: "",
    resultado: "sin"
  });

  const listStats = [
    {
      icon: Home,
      label: "Lista PEP",
      description: "Personas Políticamente Expuestas",
      count: 1250,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
    },
    {
      icon: AlertTriangle,
      label: "Listas Negras",
      description: "OFAC, ONU, UE, Interpol",
      count: 8420,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
    },
    {
      icon: Shield,
      label: "Listas Propias",
      description: "Registro interno de la entidad",
      count: 342,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      icon: FileText,
      label: "Consultas Hoy",
      description: "Total de búsquedas realizadas",
      count: 47,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
  ];

  const handleInputChange = (field, value) => {
    setNewCoincidence(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateCoincidence = () => {
    if (!newCoincidence.nombreConsultado || !newCoincidence.listasConsultadas || !newCoincidence.usuario) {
      alert("Por favor complete todos los campos obligatorios");
      return;
    }

    const now = new Date();
    const fecha = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newEntry = {
      id: historyData.length + 1,
      fecha: fecha,
      nombre: newCoincidence.nombreConsultado,
      listas: newCoincidence.listasConsultadas,
      resultado: newCoincidence.resultado,
      usuario: newCoincidence.usuario,
    };

    setHistoryData([newEntry, ...historyData]);

    // Reset form
    setNewCoincidence({
      nombreConsultado: "",
      listasConsultadas: "",
      usuario: "",
      resultado: "sin"
    });

    setShowCreateModal(false);
    setCurrentScreen("history");
  };

  const handleViewPDF = (record) => {
    setSelectedRecord(record);
    setShowPDFModal(true);
  };

  const handleDownloadPDF = async () => {
    // Import libraries dynamically
    const html2canvas = (await import('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/+esm')).default;
    const { jsPDF } = await import('https://cdn.jsdelivr.net/npm/jspdf@2.5.1/+esm');

    const element = pdfRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 0;

    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    pdf.save(`Constancia_Busqueda_${selectedRecord.nombre.replace(/\s/g, '_')}.pdf`);
  };

  const handlePrint = () => {
    window.print();
  };

  const getResultadoTexto = (resultado) => {
    switch (resultado) {
      case 'sin':
        return 'NO encontrando coincidencias por lo que puede ser sujeto a evaluación y continuar con el proceso.';
      case 'pep':
        return 'ENCONTRANDO coincidencia en Lista PEP por lo que NO puede ser sujeto a evaluación y debe ser evaluado por el área de cumplimiento.';
      case 'negra':
        return 'ENCONTRANDO coincidencia en Listas Negras por lo que NO puede ser sujeto a evaluación.';
      case 'propia':
        return 'ENCONTRANDO coincidencia en Lista Propia por lo que debe ser evaluado por el área de cumplimiento.';
      default:
        return 'NO encontrando coincidencias por lo que puede ser sujeto a evaluación y continuar con el proceso.';
    }
  };

  const formatFechaLarga = (fecha) => {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const date = new Date(fecha.replace(' ', 'T'));
    const dia = date.getDate();
    const mes = meses[date.getMonth()];
    const año = date.getFullYear();
    return `${dia} de ${mes} de ${año}`;
  };

  const renderSearchScreen = () => (
    <div className="animate-fadeIn">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {listStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-sm p-6 border-l-4 ${stat.borderColor} hover:shadow-md transition-shadow cursor-pointer`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`${stat.bgColor} rounded-lg p-3`}>
                    <IconComponent className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.count.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {stat.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Nueva Búsqueda
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nombre o Razón Social
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none text-gray-900 placeholder-gray-400"
              placeholder="Ingrese nombre completo o razón social..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Consultar en
            </label>
            <div className="relative">
              <select
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none appearance-none text-gray-900 bg-white cursor-pointer"
                value={selectedList}
                onChange={(e) => setSelectedList(e.target.value)}
              >
                <option value="todas">Todas las Listas</option>
                <option value="pep">Lista PEP</option>
                <option value="negras">Listas Negras</option>
                <option value="propias">Listas Propias</option>
              </select>
              <ChevronDown
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                size={20}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
              onClick={() => setCurrentScreen("noResults")}
            >
              <Search size={18} />
              Buscar Coincidencias
            </button>
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 text-purple-600 hover:border-purple-600 hover:bg-gray-50 font-semibold rounded-lg transition-all">
              <Filter size={18} />
              Avanzada
            </button>
          </div>
        </div>
      </div>

      {/* Lista Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-orange-500 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
              P
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900 text-base mb-1">
                Lista PEP
              </div>
              <div className="text-sm text-gray-600">
                Personas Políticamente Expuestas
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-red-500 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
              <AlertTriangle size={20} />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900 text-base mb-1">
                Listas Negras
              </div>
              <div className="text-sm text-gray-600">
                OFAC, ONU, UE, Interpol
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-purple-600 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white flex-shrink-0">
              <Home size={20} />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900 text-base mb-1">
                Listas Propias
              </div>
              <div className="text-sm text-gray-600">
                Registro interno de la entidad
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNoResultsScreen = () => (
    <div className="animate-fadeIn">
      {/* Result Card */}
      <div className="bg-white rounded-lg shadow-sm p-8 mb-6 border-l-4 border-green-500">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="text-green-600" size={48} />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Sin Coincidencias
          </h3>
          <p className="text-gray-600 mb-4">
            No se encontraron coincidencias en las listas consultadas
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle2 size={16} className="text-green-600" />
            <span className="text-sm font-medium text-green-700">
              Cliente verificado correctamente
            </span>
          </div>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Historial Reciente
          </h3>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-3 bg-white border-2 border-gray-200 text-purple-600 font-semibold rounded-lg hover:border-purple-600 hover:bg-gray-50 transition-all">
              <Download size={18} />
              Exportar
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              onClick={() => navigate('/transactional/new')}>
              <FileText className="w-4 h-4" />
              Crear Nuevo Registro
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              onClick={() => navigate('/importar')}>
              <FileText className="w-4 h-4" />
              importar Excel
            </button>
          </div>
        </div>

        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Fecha y Hora
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Nombre Consultado
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Listas
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Resultado
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock size={14} className="text-gray-400" />
                    2024-11-24 10:30
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="font-semibold text-gray-900">
                    Juan Pérez García
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-600">PEP, Negras</span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                    <CheckCircle2 size={14} />
                    Sin coincidencias
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                  Admin
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleViewPDF(historyData[0])}
                    className="text-sm font-medium text-purple-600 hover:text-purple-700 hover:underline"
                  >
                    Ver Constancia
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderHistoryScreen = () => (
    <div className="animate-fadeIn">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Historial Completo
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Registro completo de búsquedas realizadas
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-3 bg-white border-2 border-gray-200 text-purple-600 font-semibold rounded-lg hover:border-purple-600 hover:bg-gray-50 transition-all">
              <Download size={18} />
              Exportar
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-5 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-purple-200"
            >
              <Plus size={18} />
              Nueva Columna
            </button>
          </div>
        </div>

        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Fecha y Hora
                </th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Nombre Consultado
                </th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Listas Consultadas
                </th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Resultado
                </th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {historyData.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock size={14} className="text-gray-400" />
                      {item.fecha}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="font-semibold text-gray-900">
                      {item.nombre}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{item.listas}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {item.resultado === "sin" ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                        <CheckCircle2 size={14} />
                        Sin coincidencias
                      </span>
                    ) : item.resultado === "pep" ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium">
                        <AlertTriangle size={14} />
                        Coincidencia PEP
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-medium">
                        <AlertTriangle size={14} />
                        Coincidencia Lista Propia
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                    {item.usuario}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleViewPDF(item)}
                      className="text-sm font-medium text-purple-600 hover:text-purple-700 hover:underline flex items-center gap-1"
                    >
                      <Eye size={14} />
                      Ver Constancia
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

      @media print {
        body * {
          visibility: hidden;
        }
        .pdf-content, .pdf-content * {
          visibility: visible;
        }
        .pdf-content {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
        }
        .no-print {
          display: none !important;
        }
      }
    `}</style>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <Search className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Consulta de Listas
                </h1>
                <p className="text-sm text-gray-500">
                  Búsqueda en PEP, Listas Negras y Listas Propias
                </p>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="flex border-b">
              <button
                onClick={() => setCurrentScreen("search")}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${currentScreen === "search"
                  ? "text-purple-600 border-b-2 border-purple-600 bg-purple-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Search className="w-4 h-4" />
                  Nueva Búsqueda
                </div>
              </button>
              <button
                onClick={() => setCurrentScreen("noResults")}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${currentScreen === "noResults"
                  ? "text-purple-600 border-b-2 border-purple-600 bg-purple-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Resultados
                </div>
              </button>
              <button
                onClick={() => setCurrentScreen("history")}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${currentScreen === "history"
                  ? "text-purple-600 border-b-2 border-purple-600 bg-purple-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4" />
                  Historial Completo
                </div>
              </button>
            </div>
          </div>

          {/* Content */}
          {currentScreen === "search" && renderSearchScreen()}
          {currentScreen === "noResults" && renderNoResultsScreen()}
          {currentScreen === "history" && renderHistoryScreen()}
        </div>
      </div>

      {/* Create Coincidence Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 px-6 py-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Crear Nueva Coincidencia</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 flex items-start gap-3">
                <Clock className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-purple-900 mb-1">Registro Automático de Fecha y Hora</p>
                  <p className="text-sm text-purple-700">
                    La fecha y hora se registrarán automáticamente al crear la coincidencia
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nombre Consultado <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newCoincidence.nombreConsultado}
                  onChange={(e) => handleInputChange('nombreConsultado', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none text-gray-900"
                  placeholder="Ingrese el nombre o razón social..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Listas Consultadas <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newCoincidence.listasConsultadas}
                  onChange={(e) => handleInputChange('listasConsultadas', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none text-gray-900"
                  placeholder="Ej: PEP, Negras, Propias"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Separe múltiples listas con comas
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Usuario <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newCoincidence.usuario}
                  onChange={(e) => handleInputChange('usuario', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none text-gray-900"
                  placeholder="Nombre del usuario que realiza la consulta"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Resultado <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={newCoincidence.resultado}
                    onChange={(e) => handleInputChange('resultado', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none appearance-none text-gray-900 bg-white cursor-pointer"
                  >
                    <option value="sin">Sin coincidencias</option>
                    <option value="pep">Coincidencia PEP</option>
                    <option value="negra">Coincidencia Lista Negra</option>
                    <option value="propia">Coincidencia Lista Propia</option>
                  </select>
                  <ChevronDown
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                    size={20}
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-5 py-2.5 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateCoincidence}
                className="px-5 py-2.5 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200 flex items-center gap-2"
              >
                <CheckCircle2 size={18} />
                Crear Coincidencia
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PDF Viewer Modal */}
      {showPDFModal && selectedRecord && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 px-6 py-5 flex items-center justify-between no-print">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-white" />
                <div>
                  <h2 className="text-xl font-bold text-white">Constancia de Búsqueda</h2>
                  <p className="text-sm text-purple-100">{selectedRecord.nombre}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadPDF}
                  className="text-white hover:bg-white/20 rounded-lg px-4 py-2 transition-colors flex items-center gap-2 font-medium"
                >
                  <Download size={18} />
                  Descargar PDF
                </button>
                <button
                  onClick={handlePrint}
                  className="text-white hover:bg-white/20 rounded-lg px-4 py-2 transition-colors flex items-center gap-2 font-medium"
                >
                  <Printer size={18} />
                  Imprimir
                </button>
                <button
                  onClick={() => setShowPDFModal(false)}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* PDF Content */}
            <div className="flex-1 overflow-y-auto bg-gray-100 p-8">
              <div ref={pdfRef} className="pdf-content bg-white shadow-lg mx-auto" style={{ width: '210mm', minHeight: '297mm', padding: '20mm' }}>
                {/* Header with Logo */}
                <div className="flex justify-between items-start mb-8">
                  <div className="w-24 h-24 bg-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">LOGO</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Culiacán, Sinaloa</p>
                    <p className="text-sm text-gray-600">a {formatFechaLarga(selectedRecord.fecha)}</p>
                  </div>
                </div>

                {/* Title */}
                <div className="text-center mb-12">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">CONSTANCIA DE BÚSQUEDA</h1>
                  <h2 className="text-xl font-semibold text-purple-600">EN LISTAS RESTRICTIVAS</h2>
                </div>

                {/* Content */}
                <div className="space-y-6 text-gray-800 leading-relaxed">
                  <p className="text-justify">
                    Por medio de la presente, se hace constar que en cumplimiento con las disposiciones aplicables
                    en materia de Prevención de Lavado de Dinero y Financiamiento al Terrorismo, se realizó la
                    búsqueda correspondiente en las siguientes listas:
                  </p>

                  <div className="bg-purple-50 border-l-4 border-purple-600 p-4 my-6">
                    <p className="font-semibold text-purple-900 mb-2">Listas Consultadas:</p>
                    <p className="text-gray-700">{selectedRecord.listas}</p>
                  </div>

                  <div className="bg-gray-50 border-l-4 border-gray-400 p-4 my-6">
                    <p className="font-semibold text-gray-900 mb-2">Persona/Razón Social Consultada:</p>
                    <p className="text-lg text-gray-800 font-medium">{selectedRecord.nombre}</p>
                  </div>

                  <p className="text-justify font-medium">
                    Se realizó búsqueda en Listas Negras, PEP y Lista de Personas Bloqueadas de la persona/razón
                    social <span className="font-bold">{selectedRecord.nombre}</span>, {getResultadoTexto(selectedRecord.resultado)}
                  </p>

                  {/* Result Badge */}
                  <div className="flex justify-center my-8">
                    {selectedRecord.resultado === "sin" ? (
                      <div className="inline-flex items-center gap-3 px-6 py-3 bg-green-100 border-2 border-green-500 rounded-lg">
                        <CheckCircle2 size={24} className="text-green-600" />
                        <span className="text-lg font-bold text-green-700">SIN COINCIDENCIAS</span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-3 px-6 py-3 bg-red-100 border-2 border-red-500 rounded-lg">
                        <AlertTriangle size={24} className="text-red-600" />
                        <span className="text-lg font-bold text-red-700">CON COINCIDENCIAS</span>
                      </div>
                    )}
                  </div>

                  {/* Details Table */}
                  <div className="border border-gray-300 rounded-lg overflow-hidden my-6">
                    <table className="w-full">
                      <tbody className="divide-y divide-gray-200">
                        <tr className="bg-gray-50">
                          <td className="px-4 py-3 font-semibold text-gray-700 w-1/3">Fecha y Hora:</td>
                          <td className="px-4 py-3 text-gray-900">{selectedRecord.fecha}</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-semibold text-gray-700">Usuario Consultor:</td>
                          <td className="px-4 py-3 text-gray-900">{selectedRecord.usuario}</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-4 py-3 font-semibold text-gray-700">Listas Consultadas:</td>
                          <td className="px-4 py-3 text-gray-900">{selectedRecord.listas}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-16 pt-8 border-t-2 border-gray-300">
                  <p className="text-center font-semibold text-gray-900 mb-2">Atentamente</p>
                  <p className="text-center font-bold text-lg text-purple-600">
                    Grupo JJJ Capital Continental S. de R.L. de C.V.
                  </p>
                  <div className="mt-12 text-center">
                    <div className="inline-block border-t-2 border-gray-400 pt-2 px-12">
                      <p className="text-sm font-semibold text-gray-700">Firma Autorizada</p>
                    </div>
                  </div>
                </div>

                {/* Footer Note */}
                <div className="mt-8 text-xs text-gray-500 text-center">
                  <p>Documento generado electrónicamente - {new Date().toLocaleDateString('es-MX')}</p>
                  <p className="mt-1">Este documento es válido sin firma autógrafa de conformidad con las disposiciones aplicables</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}