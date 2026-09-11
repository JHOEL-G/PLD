import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { INITIAL_FORM_DATA, LISTAS_CONFIG } from '../../features/gestionPld/constants/constants';
import Sidebar from '../../features/gestionPld/components/Sidebar';
import RegistroTab from '../../features/gestionPld/components/RegistroTab';
import ListasTab from '../../features/gestionPld/components/ListasTab';
import ActionsBar from '../../features/gestionPld/components/ActionsBar';
import PLDModals from '../../features/gestionPld/components/PLDModals';
import { useListarPld } from '../../features/gestionPld/hooks/useListarPld';
import { useEffect } from 'react';
import { toISODateTime } from '../../utils/formatFecha';
import { useAgregarRegistroGeneral } from '../../features/gestionPld/hooks/useAgregarRegistroGeneral';

export default function GestionPLDPage() {
    const [activeTab, setActiveTab] = useState('registro');
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);
    const [listasData, setListasData] = useState({});
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);

    const {
        data: listasResponse,
        isLoading: isLoadingListas,
        isError: isErrorListas,
    } = useListarPld();

    const listasPld = listasResponse?.data ?? [];

    useEffect(() => {
        if (listasPld.length === 0) return;
        setListasData(
            listasPld.reduce((acc, curr) => ({ ...acc, [curr.codigo]: curr.activo }), {})
        );
    }, [listasResponse]);

    const { mutate: agregarRegistroGeneral, isPending: isSaving } = useAgregarRegistroGeneral();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleToggleChange = (codigo) => {
        setListasData(prev => ({ ...prev, [codigo]: !prev[codigo] }));
    };

    const handleSave = () => {
        if (!formData.nombreCompleto || !formData.rfcCurp || !formData.fechaNacimiento ||
            !formData.fechaListado || !formData.acuerdo || !formData.nombreDocumento) {
            alert("Por favor complete todos los campos obligatorios");
            return;
        }

        const payload = {
            nombreCompleto: formData.nombreCompleto,
            rfcCurp: formData.rfcCurp,
            fechaNacimiento: toISODateTime(formData.fechaNacimiento),
            alias: formData.alias ?? "",
            fechaListado: toISODateTime(formData.fechaListado),
            acuerdo: formData.acuerdo,
            nombreDocumento: formData.nombreDocumento,
        };

        agregarRegistroGeneral(payload, {
            onSuccess: () => {
                setShowSaveModal(true);
            },
            onError: (error) => {
                console.log("Error al guardar registro PLD", error);
                alert("Ocurrió un error al guardar el registro. Intente de nuevo.");
            },
        });
    };

    const handleConfirmDelete = () => setShowDeleteModal(false);

    const handleConfirmCancel = () => {
        setShowCancelModal(false);
        setFormData(INITIAL_FORM_DATA);
    };

    const handleEdit = () => setActiveTab('registro');

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-8 bg-gray-50 min-h-screen">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white">
                    <h2 className="text-lg font-medium text-gray-700">
                        Registro <span className="text-gray-400 font-normal">PLD</span>
                    </h2>
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                </div>

                <div className="flex flex-col md:flex-row">
                    <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

                    <div className="flex-1 p-8 min-h-[400px]">
                        {activeTab === 'registro' && (
                            <RegistroTab formData={formData} onInputChange={handleInputChange} />
                        )}
                        {activeTab === 'listas' && (
                            <ListasTab
                                listas={listasPld}
                                listasData={listasData}
                                onToggleChange={handleToggleChange}
                                isLoading={isLoadingListas}
                                isError={isErrorListas}
                            />
                        )}
                    </div>
                </div>

                <ActionsBar
                    onDelete={() => setShowDeleteModal(true)}
                    onEdit={handleEdit}
                    onCancel={() => setShowCancelModal(true)}
                    onSave={handleSave}
                    isSaving={isSaving}
                />
            </div>

            <PLDModals
                showSaveModal={showSaveModal}
                onCloseSave={() => setShowSaveModal(false)}
                showDeleteModal={showDeleteModal}
                onCloseDelete={() => setShowDeleteModal(false)}
                onConfirmDelete={handleConfirmDelete}
                showCancelModal={showCancelModal}
                onCloseCancel={() => setShowCancelModal(false)}
                onConfirmCancel={handleConfirmCancel}
            />
        </div>
    )
}
