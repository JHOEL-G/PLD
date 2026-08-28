import { useState } from "react";
import CreateCoincidenceModal from "../../features/listasBusqueda/components/CreateCoincidenceModal";
import HistoryScreen from "../../features/listasBusqueda/components/HistoryScreen";
import NoResultsScreen from "../../features/listasBusqueda/components/NoResultsScreen";
import NuevoRegistroModal from "../../features/listasBusqueda/components/NuevoRegistroModal";
import PDFViewerModal from "../../features/listasBusqueda/components/PDFViewerModal";
import SearchScreen from "../../features/listasBusqueda/components/SearchScreen";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { EMPTY_COINCIDENCE, INITIAL_HISTORY } from "../../features/listasBusqueda/constants/constants";
import { buildFechaActual, downloadRecordAsPDF } from "../../features/listasBusqueda/utils/utils";
import { Search } from "lucide-react";
import { CheckCircle2 } from "lucide-react";
import { Clock } from "lucide-react";

export default function ListasBusquedaPage() {
    const [currentScreen, setCurrentScreen] = useState("search");
    const [searchName, setSearchName] = useState("");
    const [selectedList, setSelectedList] = useState("todas");

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showPDFModal, setShowPDFModal] = useState(false);
    const [showNuevoRegistroModal, setShowNuevoRegistroModal] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    const pdfRef = useRef(null);
    const navigate = useNavigate();

    const [historyData, setHistoryData] = useState(INITIAL_HISTORY);
    const [newCoincidence, setNewCoincidence] = useState(EMPTY_COINCIDENCE);

    const handleInputChange = (field, value) => {
        setNewCoincidence((prev) => ({ ...prev, [field]: value }));
    };

    const handleCreateCoincidence = () => {
        if (!newCoincidence.nombreConsultado || !newCoincidence.listasConsultadas || !newCoincidence.usuario) {
            alert("Por favor complete todos los campos obligatorios");
            return;
        }

        const newEntry = {
            id: historyData.length + 1,
            fecha: buildFechaActual(),
            nombre: newCoincidence.nombreConsultado,
            listas: newCoincidence.listasConsultadas,
            resultado: newCoincidence.resultado,
            usuario: newCoincidence.usuario,
        };

        setHistoryData([newEntry, ...historyData]);
        setNewCoincidence(EMPTY_COINCIDENCE);
        setShowCreateModal(false);
        setCurrentScreen("history");
    };

    const handleViewPDF = (record) => {
        setSelectedRecord(record);
        setShowPDFModal(true);
    };

    const handleDownloadPDF = () => {
        if (!selectedRecord) return;
        downloadRecordAsPDF(pdfRef, `Constancia_Busqueda_${selectedRecord.nombre}`);
    };

    const handlePrint = () => window.print();

    const TABS = [
        { key: "search", label: "Nueva Búsqueda", icon: Search },
        { key: "noResults", label: "Resultados", icon: CheckCircle2 },
        { key: "history", label: "Historial Completo", icon: Clock },
    ];

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
        @media print {
          body * { visibility: hidden; }
          .pdf-content, .pdf-content * { visibility: visible; }
          .pdf-content { position: absolute; left: 0; top: 0; width: 100%; }
          .no-print { display: none !important; }
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
                                <h1 className="text-2xl font-bold text-gray-900">Consulta de Listas</h1>
                                <p className="text-sm text-gray-500">
                                    Búsqueda en PEP, Listas Negras y Listas Propias
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="bg-white rounded-lg shadow-sm mb-6">
                        <div className="flex border-b">
                            {TABS.map(({ key, label, icon: Icon }) => (
                                <button
                                    key={key}
                                    onClick={() => setCurrentScreen(key)}
                                    className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${currentScreen === key
                                        ? "text-purple-600 border-b-2 border-purple-600 bg-purple-50"
                                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                        }`}
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <Icon className="w-4 h-4" />
                                        {label}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Contenido */}
                    {currentScreen === "search" && (
                        <SearchScreen
                            searchName={searchName}
                            setSearchName={setSearchName}
                            selectedList={selectedList}
                            setSelectedList={setSelectedList}
                            onSearch={() => setCurrentScreen("noResults")}
                        />
                    )}

                    {currentScreen === "noResults" && (
                        <NoResultsScreen
                            historyData={historyData}
                            onViewPDF={handleViewPDF}
                            onOpenNuevoRegistro={() => setShowNuevoRegistroModal(true)}
                            onImportarExcel={() => navigate("/importar")}
                        />
                    )}

                    {currentScreen === "history" && (
                        <HistoryScreen
                            historyData={historyData}
                            onViewPDF={handleViewPDF}
                            onOpenCreateModal={() => setShowCreateModal(true)}
                        />
                    )}
                </div>
            </div>

            <CreateCoincidenceModal
                show={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                newCoincidence={newCoincidence}
                onInputChange={handleInputChange}
                onSubmit={handleCreateCoincidence}
            />

            <PDFViewerModal
                show={showPDFModal}
                record={selectedRecord}
                pdfRef={pdfRef}
                onClose={() => setShowPDFModal(false)}
                onDownload={handleDownloadPDF}
                onPrint={handlePrint}
            />

            <NuevoRegistroModal
                show={showNuevoRegistroModal}
                onClose={() => setShowNuevoRegistroModal(false)}
            />
        </>
    )
}
