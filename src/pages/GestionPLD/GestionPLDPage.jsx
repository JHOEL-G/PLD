import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { INITIAL_FORM_DATA, LISTAS_CONFIG } from '../../features/gestionPld/constants/constants';
import Sidebar from '../../features/gestionPld/components/Sidebar';
import RegistroTab from '../../features/gestionPld/components/RegistroTab';
import ListasTab from '../../features/gestionPld/components/ListasTab';
import ActionsBar from '../../features/gestionPld/components/ActionsBar';
import PLDModals from '../../features/gestionPld/components/PLDModals';

export default function GestionPLDPage() {
    const [activeTab, setActiveTab] = useState('registro');
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);
    const [listasData, setListasData] = useState(
        LISTAS_CONFIG.reduce((acc, curr) => ({ ...acc, [curr.id]: false }), {})
    );
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleToggleChange = (id) => {
        setListasData(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleSave = () => setShowSaveModal(true);

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
                            <ListasTab listasData={listasData} onToggleChange={handleToggleChange} />
                        )}
                    </div>
                </div>

                <ActionsBar
                    onDelete={() => setShowDeleteModal(true)}
                    onEdit={handleEdit}
                    onCancel={() => setShowCancelModal(true)}
                    onSave={handleSave}
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
