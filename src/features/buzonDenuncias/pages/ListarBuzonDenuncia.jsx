import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/listarBuzonDenuncias/PageHeader";
import StatsGrid from "../components/listarBuzonDenuncias/StatsGrid";
import FiltrosPanel from "../components/listarBuzonDenuncias/FiltrosPanel";
import DenunciasList from "../components/listarBuzonDenuncias/DenunciasList";
import DetalleDenunciaModal from "../components/listarBuzonDenuncias/DetalleDenunciaModal";
import SubirArchivoModal from "../components/listarBuzonDenuncias/SubirArchivoModal";
import { useListarBuzonDenuncia } from "../hooks/useListarBuzonDenuncia";

export default function ListarBuzonDenuncia() {
    const { data: denuncias, isLoading, isError, error, refetch } = useListarBuzonDenuncia();
    const [selectedStatus, setSelectedStatus] = useState('todas');
    const [selectedCompany, setSelectedCompany] = useState('todas');
    const [searchTerm, setSearchTerm] = useState('');
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedDenuncia, setSelectedDenuncia] = useState(null);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const navigate = useNavigate();

    const listaDenuncias = denuncias ?? [];
    const empresas = [...new Set(listaDenuncias.map(d => d.nombreEmpresaInvolucrada).filter(Boolean))];

    const filteredDenuncias = listaDenuncias.filter(denuncia => {
        const matchesStatus = selectedStatus === 'todas' || denuncia.nombreEstado === selectedStatus;
        const matchesCompany = selectedCompany === 'todas' || denuncia.nombreEmpresaInvolucrada === selectedCompany;
        const matchesSearch =
            denuncia.tituloDenuncia?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            denuncia.folio?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            denuncia.clienteInvolucrada?.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesStatus && matchesCompany && matchesSearch;
    });

    const handleVerDetalle = (denuncia) => {
        setSelectedDenuncia(denuncia);
        setShowDetailModal(true);
    };

    const handleAtender = (idDenuncias) => {
        console.log('Atendiendo denuncia:', idDenuncias);
    };

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        setUploadedFiles(prev => [...prev, ...files]);
    };

    const handleRemoveFile = (index) => {
        setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleResetFilters = () => {
        setSelectedStatus('todas');
        setSelectedCompany('todas');
        setSearchTerm('');
    };

    const handleCambiarEstado = (nuevoEstado) => {
        console.log('Cambiar estado a:', nuevoEstado);
    };

    const handleUploadSubmit = () => {
        console.log('Subiendo...', uploadedFiles);
        setShowUploadModal(false);
        setUploadedFiles([]);
    };

    const handleCloseUploadModal = () => {
        setShowUploadModal(false);
        setUploadedFiles([]);
    };

    return (
        <div className="min-h-full font-sans text-slate-900 pb-12">
            <div className=" top-0 z-40 [will-change:transform] [transform:translateZ(0)]">
                <PageHeader
                    visibleCount={filteredDenuncias.length}
                    totalCount={listaDenuncias.length}
                    onNuevaDenuncia={() => navigate('/agregar')}
                />
            </div>

            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 pt-10">
                <StatsGrid
                    denuncias={listaDenuncias}
                    selectedStatus={selectedStatus}
                    onSelectStatus={setSelectedStatus}
                />

                <FiltrosPanel
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    selectedStatus={selectedStatus}
                    onStatusChange={setSelectedStatus}
                    selectedCompany={selectedCompany}
                    onCompanyChange={setSelectedCompany}
                    empresas={empresas}
                    resultCount={filteredDenuncias.length}
                    onReset={handleResetFilters}
                />

                <DenunciasList
                    denuncias={filteredDenuncias}
                    isLoading={isLoading}
                    isError={isError}
                    error={error}
                    onRetry={refetch}
                    onVerDetalle={handleVerDetalle}
                    onAtender={handleAtender}
                />
            </div>

            {showDetailModal && selectedDenuncia && (
                <DetalleDenunciaModal
                    denuncia={selectedDenuncia}
                    onClose={() => setShowDetailModal(false)}
                    onOpenUpload={() => setShowUploadModal(true)}
                    onCambiarEstado={handleCambiarEstado}
                />
            )}

            {showUploadModal && (
                <SubirArchivoModal
                    files={uploadedFiles}
                    onFileChange={handleFileUpload}
                    onRemoveFile={handleRemoveFile}
                    onClose={handleCloseUploadModal}
                    onSubmit={handleUploadSubmit}
                />
            )}
        </div>
    )
}
