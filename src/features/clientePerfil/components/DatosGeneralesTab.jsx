const Campo = ({ label, value }) => (
    <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
        <input
            type="text"
            value={value}
            disabled
            className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900"
        />
    </div>
);

const DatosGeneralesTab = ({ cliente }) => {
    return (
        <div className="animate-fadeIn space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Información General</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Campo label="Nombre Completo" value={cliente.nombre} />
                    <Campo label="RFC" value={cliente.rfc} />
                    <Campo label="Tipo de Persona" value={cliente.tipoPersona} />
                    <Campo label="Fecha de Alta" value={cliente.fechaAlta} />
                    <Campo label="Actividad Económica" value={cliente.actividadEconomica} />
                    <Campo label="Nivel de Riesgo" value={cliente.nivelRiesgo} />
                </div>
            </div>
        </div>
    );
};

export default DatosGeneralesTab;