import InputField from "./InputField";

export default function RegistroTab({ formData, onInputChange }) {
    return (
        <div>
            <h3 className="text-xl font-semibold text-blue-700 mb-8 border-b border-blue-50 pb-2">
                Información General de Registro
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Nombre Completo *" name="nombreCompleto" placeholder="Ingresa nombre completo" value={formData.nombreCompleto} onChange={onInputChange} />
                <InputField label="RFC o CURP *" name="rfcCurp" placeholder="RFC o CURP" value={formData.rfcCurp} onChange={onInputChange} />
                <InputField label="Fecha de Nacimiento *" name="fechaNacimiento" type="date" value={formData.fechaNacimiento} onChange={onInputChange} />
                <InputField label="Alias " name="alias" placeholder="Alias" value={formData.alias} onChange={onInputChange} />
                <InputField label="Fecha de Listado *" name="fechaListado" type="date" value={formData.fechaListado} onChange={onInputChange} />
                <InputField label="Acuerdo *" name="acuerdo" placeholder="Acuerdo" value={formData.acuerdo} onChange={onInputChange} />
                <InputField label="Nombre del Documento *" name="nombreDocumento" placeholder="Nombre del Documento" value={formData.nombreDocumento} onChange={onInputChange} />
            </div>
        </div>
    )
}
