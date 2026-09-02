import { useNavigate } from "react-router-dom";
import AddModal from "../../features/perfilTransaccional/components/AddModal";
import Header from "../../features/perfilTransaccional/components/Header";
import InusualesTab from "../../features/perfilTransaccional/components/InusualesTab";
import ListasTab from "../../features/perfilTransaccional/components/ListasTab";
import PaisesTab from "../../features/perfilTransaccional/components/PaisesTab";
import RelevantesTab from "../../features/perfilTransaccional/components/RelevantesTab";
import TabsNav from "../../features/perfilTransaccional/components/TabsNav";
import VulnerablesTab from "../../features/perfilTransaccional/components/VulnerablesTab";
import { useState } from "react";
import { inusualesInicial, listasInicial, paisesInicial, relevantesInicial, vulnerablesInicial } from "../../features/perfilTransaccional/utils/data";
import ConfiguracionPerfilTransaccionalTab from "../../features/perfilTransaccional/components/ConfiguracionPerfilTransaccionalModal";

export default function PerfilTransaccionalPage() {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('configuracion');
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [configPerfilTransaccional, setConfigPerfilTransaccional] = useState(null);

    const [relevantesData, setRelevantesData] = useState(relevantesInicial);
    const [vulnerablesData, setVulnerablesData] = useState(vulnerablesInicial);
    const [inusualesData, setInusualesData] = useState(inusualesInicial);
    const [paisesData, setPaisesData] = useState(paisesInicial);
    const [listasData, setListasData] = useState(listasInicial);

    const openModal = (type) => {
        setModalType(type);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setModalType('');
    };

    const handleAddSubmit = (formData) => {
        switch (modalType) {
            case 'relevantes':
                setRelevantesData(prev => [
                    ...prev,
                    { id: `OP-${String(prev.length + 1).padStart(3, '0')}`, ...formData }
                ]);
                break;
            case 'vulnerables':
                setVulnerablesData(prev => [
                    ...prev,
                    { id: `OV-${String(prev.length + 1).padStart(3, '0')}`, ...formData }
                ]);
                break;
            case 'inusuales':
                setInusualesData(prev => [
                    ...prev,
                    { id: `OI-${String(prev.length + 1).padStart(3, '0')}`, ...formData }
                ]);
                break;
            case 'paises':
                setPaisesData(prev => [...prev, formData]);
                break;
            case 'listas':
                setListasData(prev => [...prev, formData]);
                break;
            default:
                break;
        }
        closeModal();
    };

    const handleSaveConfig = (config) => {
        setConfigPerfilTransaccional(config);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header onGenerarReporte={() => console.log('Generar reporte')} />

            <TabsNav
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onCrearNuevo={() => navigate('/transactional/new')}
            />

            <div className="p-6">
                {activeTab === 'configuracion' && (
                    <ConfiguracionPerfilTransaccionalTab
                        initialConfig={configPerfilTransaccional}
                        onSave={handleSaveConfig}
                    />
                )}
                {activeTab === 'relevantes' && <RelevantesTab data={relevantesData} />}
                {activeTab === 'vulnerables' && (
                    <VulnerablesTab data={vulnerablesData} onAnalizar={(item) => console.log('Analizar', item)} />
                )}
                {activeTab === 'inusuales' && (
                    <InusualesTab data={inusualesData} onInvestigar={(item) => console.log('Investigar', item)} />
                )}
                {activeTab === 'paises' && <PaisesTab data={paisesData} />}
                {activeTab === 'listas' && (
                    <ListasTab
                        data={listasData}
                        onAgregar={() => openModal('listas')}
                        onVerDetalle={(item) => console.log('Ver detalle', item)}
                    />
                )}
            </div>

            {showModal && (
                <AddModal modalType={modalType} onClose={closeModal} onSubmit={handleAddSubmit} />
            )}
        </div>
    )
}
