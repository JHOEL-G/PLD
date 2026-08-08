const TITULOS = {
    relevantes: 'Agregar Operación Relevante',
    vulnerables: 'Agregar Actividad Vulnerable',
    inusuales: 'Agregar Operación Inusual',
    paises: 'Agregar País de Alto Riesgo',
    listas: 'Agregar Coincidencia en Lista'
};

export default function AddModal({ modalType, onClose, onSubmit }) {
    const [formData, setFormData] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleClientesChange = (e) => {
        const value = e.target.value;
        setFormData(prev => ({ ...prev, clientes: value.split(',').map(c => c.trim()) }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const renderFormFields = () => {
        switch (modalType) {
            case 'relevantes':
                return <RelevantesForm onChange={handleInputChange} />;
            case 'vulnerables':
                return <VulnerablesForm onChange={handleInputChange} />;
            case 'inusuales':
                return <InusualesForm onChange={handleInputChange} />;
            case 'paises':
                return <PaisesForm onChange={handleInputChange} onClientesChange={handleClientesChange} />;
            case 'listas':
                return <ListasForm onChange={handleInputChange} />;
            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">{TITULOS[modalType] || 'Agregar Perfil'}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleFormSubmit} className="p-6">
                    <div className="space-y-4">{renderFormFields()}</div>

                    <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
