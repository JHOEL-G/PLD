import React, { useState } from 'react';
import {
    AlertTriangle, Send, Shield, ChevronDown,
    FileText, X, CheckCircle, Upload, Eye, EyeOff
} from 'lucide-react';

const DenunciaAnonima = ({ onDenunciaEnviada }) => {
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [folio, setFolio] = useState('');
    const [showFolio, setShowFolio] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [form, setForm] = useState({
        tipo: '',
        empresa: '',
        titulo: '',
        descripcion: '',
        cliente: '',
        monto: '',
        moneda: 'MXN',
        prioridad: 'media',
    });
    const [errors, setErrors] = useState({});

    const tipos = [
        'Lavado de Dinero',
        'Fraude Documental',
        'Estructuración',
        'Actividad Sospechosa',
        'Origen de Fondos',
        'Financiamiento al Terrorismo',
        'Otro',
    ];

    const empresas = ['Banco Nacional', 'Financiera del Norte', 'Casa de Cambio Sur'];

    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
    };

    const validateStep1 = () => {
        const e = {};
        if (!form.tipo) e.tipo = 'Selecciona el tipo de denuncia';
        if (!form.empresa) e.empresa = 'Selecciona la empresa';
        if (!form.titulo.trim()) e.titulo = 'El título es requerido';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const validateStep2 = () => {
        const e = {};
        if (!form.descripcion.trim() || form.descripcion.trim().length < 30)
            e.descripcion = 'Describe con al menos 30 caracteres';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        setUploadedFiles(prev => [...prev, ...files]);
    };

    const handleRemoveFile = (index) => {
        setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const generateFolio = () => {
        const num = Math.floor(Math.random() * 90000) + 10000;
        return `DAN-${new Date().getFullYear()}-${num}`;
    };

    const handleSubmit = () => {
        const newFolio = generateFolio();
        const nuevaDenuncia = {
            id: newFolio,
            titulo: form.titulo,
            descripcion: form.descripcion,
            tipo: form.tipo,
            denunciante: 'Anónimo',
            empresa: form.empresa,
            cliente: form.cliente || 'No especificado',
            monto: form.monto ? `$${form.monto} ${form.moneda}` : 'No especificado',
            fecha: new Date().toISOString().split('T')[0],
            fechaActualizacion: new Date().toLocaleString('es-MX'),
            status: 'pendiente',
            prioridad: form.prioridad,
            documentos: uploadedFiles.map(f => f.name),
            anonima: true,
        };
        setFolio(newFolio);
        setSubmitted(true);
        if (onDenunciaEnviada) onDenunciaEnviada(nuevaDenuncia);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
                <div className="bg-white rounded-2xl shadow-lg max-w-lg w-full p-8 text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Denuncia Registrada!</h2>
                    <p className="text-gray-600 mb-6">
                        Tu denuncia anónima ha sido recibida y está siendo procesada por el equipo de cumplimiento.
                    </p>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                        <p className="text-sm text-blue-700 mb-2 font-medium">Número de folio de seguimiento</p>
                        <div className="flex items-center justify-center gap-3">
                            <span className={`text-2xl font-bold text-blue-900 tracking-widest transition-all ${showFolio ? '' : 'blur-sm select-none'}`}>
                                {folio}
                            </span>
                            <button
                                onClick={() => setShowFolio(!showFolio)}
                                className="p-1.5 hover:bg-blue-100 rounded-lg transition-colors"
                            >
                                {showFolio ? <EyeOff className="w-4 h-4 text-blue-600" /> : <Eye className="w-4 h-4 text-blue-600" />}
                            </button>
                        </div>
                        <p className="text-xs text-blue-600 mt-2">
                            Guarda este folio para dar seguimiento a tu denuncia. No lo compartimos con nadie.
                        </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 text-left space-y-2 mb-6">
                        <p className="text-xs text-gray-500"><span className="font-semibold text-gray-700">Tipo:</span> {form.tipo}</p>
                        <p className="text-xs text-gray-500"><span className="font-semibold text-gray-700">Empresa:</span> {form.empresa}</p>
                        <p className="text-xs text-gray-500"><span className="font-semibold text-gray-700">Título:</span> {form.titulo}</p>
                        <p className="text-xs text-gray-500"><span className="font-semibold text-gray-700">Documentos adjuntos:</span> {uploadedFiles.length}</p>
                    </div>

                    <div className="flex items-center gap-2 justify-center text-xs text-gray-400">
                        <Shield className="w-4 h-4" />
                        <span>Tu identidad está completamente protegida</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                        <AlertTriangle className="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Denuncia Anónima</h1>
                        <p className="text-sm text-gray-500">Tu identidad permanece completamente protegida</p>
                    </div>
                    <div className="ml-auto flex items-center gap-1 bg-green-50 border border-green-200 rounded-full px-3 py-1">
                        <Shield className="w-3.5 h-3.5 text-green-600" />
                        <span className="text-xs font-medium text-green-700">Anónimo y seguro</span>
                    </div>
                </div>

                {/* Stepper */}
                <div className="flex items-center gap-2 mb-8">
                    {[1, 2, 3].map((s) => (
                        <React.Fragment key={s}>
                            <div className={`flex items-center gap-2 ${s <= step ? 'text-blue-600' : 'text-gray-400'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all
                                    ${s < step ? 'bg-blue-600 border-blue-600 text-white' :
                                        s === step ? 'border-blue-600 text-blue-600' :
                                            'border-gray-300 text-gray-400'}`}>
                                    {s < step ? '✓' : s}
                                </div>
                                <span className="text-xs font-medium hidden sm:block">
                                    {s === 1 ? 'Información' : s === 2 ? 'Descripción' : 'Evidencia'}
                                </span>
                            </div>
                            {s < 3 && <div className={`flex-1 h-0.5 ${s < step ? 'bg-blue-600' : 'bg-gray-200'}`} />}
                        </React.Fragment>
                    ))}
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

                    {/* Step 1 */}
                    {step === 1 && (
                        <div className="p-6 space-y-5">
                            <h2 className="text-lg font-bold text-gray-900">Información general</h2>

                            {/* Tipo */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tipo de denuncia <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        value={form.tipo}
                                        onChange={(e) => handleChange('tipo', e.target.value)}
                                        className={`w-full px-4 py-2.5 border rounded-lg outline-none appearance-none bg-white text-sm ${errors.tipo ? 'border-red-400' : 'border-gray-300 focus:border-blue-500'}`}
                                    >
                                        <option value="">Seleccionar tipo...</option>
                                        {tipos.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                                {errors.tipo && <p className="text-xs text-red-500 mt-1">{errors.tipo}</p>}
                            </div>

                            {/* Empresa */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Empresa involucrada <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        value={form.empresa}
                                        onChange={(e) => handleChange('empresa', e.target.value)}
                                        className={`w-full px-4 py-2.5 border rounded-lg outline-none appearance-none bg-white text-sm ${errors.empresa ? 'border-red-400' : 'border-gray-300 focus:border-blue-500'}`}
                                    >
                                        <option value="">Seleccionar empresa...</option>
                                        {empresas.map(e => <option key={e} value={e}>{e}</option>)}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                                {errors.empresa && <p className="text-xs text-red-500 mt-1">{errors.empresa}</p>}
                            </div>

                            {/* Título */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Título de la denuncia <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={form.titulo}
                                    onChange={(e) => handleChange('titulo', e.target.value)}
                                    placeholder="Ej: Operación sospechosa en cuenta empresarial"
                                    className={`w-full px-4 py-2.5 border rounded-lg outline-none text-sm ${errors.titulo ? 'border-red-400' : 'border-gray-300 focus:border-blue-500'}`}
                                />
                                {errors.titulo && <p className="text-xs text-red-500 mt-1">{errors.titulo}</p>}
                            </div>

                            {/* Prioridad */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Prioridad estimada</label>
                                <div className="flex gap-3">
                                    {[
                                        { value: 'alta', label: 'Alta', color: 'border-red-500 bg-red-50 text-red-700' },
                                        { value: 'media', label: 'Media', color: 'border-orange-500 bg-orange-50 text-orange-700' },
                                        { value: 'baja', label: 'Baja', color: 'border-gray-400 bg-gray-50 text-gray-700' },
                                    ].map(p => (
                                        <button
                                            key={p.value}
                                            type="button"
                                            onClick={() => handleChange('prioridad', p.value)}
                                            className={`flex-1 py-2 rounded-lg border-2 text-sm font-medium transition-all ${form.prioridad === p.value ? p.color : 'border-gray-200 text-gray-400 hover:border-gray-300'}`}
                                        >
                                            {p.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2 */}
                    {step === 2 && (
                        <div className="p-6 space-y-5">
                            <h2 className="text-lg font-bold text-gray-900">Descripción del hecho</h2>

                            {/* Descripción */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Descripción detallada <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={form.descripcion}
                                    onChange={(e) => handleChange('descripcion', e.target.value)}
                                    rows={5}
                                    placeholder="Describe detalladamente la situación sospechosa, incluyendo fechas, personas involucradas y cualquier información relevante..."
                                    className={`w-full px-4 py-3 border rounded-lg outline-none text-sm resize-none ${errors.descripcion ? 'border-red-400' : 'border-gray-300 focus:border-blue-500'}`}
                                />
                                <div className="flex justify-between mt-1">
                                    {errors.descripcion
                                        ? <p className="text-xs text-red-500">{errors.descripcion}</p>
                                        : <span />
                                    }
                                    <span className={`text-xs ${form.descripcion.length < 30 ? 'text-gray-400' : 'text-green-600'}`}>
                                        {form.descripcion.length} / mín. 30 caracteres
                                    </span>
                                </div>
                            </div>

                            {/* Cliente involucrado */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Cliente o persona involucrada
                                    <span className="ml-1 text-xs text-gray-400 font-normal">(opcional)</span>
                                </label>
                                <input
                                    type="text"
                                    value={form.cliente}
                                    onChange={(e) => handleChange('cliente', e.target.value)}
                                    placeholder="Nombre, razón social o identificador del cliente"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none text-sm focus:border-blue-500"
                                />
                            </div>

                            {/* Monto */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Monto aproximado
                                    <span className="ml-1 text-xs text-gray-400 font-normal">(opcional)</span>
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        value={form.monto}
                                        onChange={(e) => handleChange('monto', e.target.value)}
                                        placeholder="0.00"
                                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg outline-none text-sm focus:border-blue-500"
                                    />
                                    <select
                                        value={form.moneda}
                                        onChange={(e) => handleChange('moneda', e.target.value)}
                                        className="px-3 py-2.5 border border-gray-300 rounded-lg outline-none text-sm bg-white"
                                    >
                                        <option>MXN</option>
                                        <option>USD</option>
                                        <option>EUR</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3 */}
                    {step === 3 && (
                        <div className="p-6 space-y-5">
                            <h2 className="text-lg font-bold text-gray-900">Evidencia y confirmación</h2>

                            {/* Upload */}
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                                <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                                <p className="text-sm font-medium text-gray-700 mb-1">Arrastra archivos o haz clic para seleccionar</p>
                                <p className="text-xs text-gray-400 mb-4">PDF, DOC, XLS, PNG, JPG — máx. 10MB por archivo</p>
                                <input type="file" multiple id="anon-upload" onChange={handleFileUpload} className="hidden" />
                                <label htmlFor="anon-upload" className="inline-block px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg cursor-pointer transition-colors">
                                    Seleccionar archivos
                                </label>
                            </div>

                            {uploadedFiles.length > 0 && (
                                <div className="space-y-2">
                                    {uploadedFiles.map((file, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                                            <div className="flex items-center gap-3">
                                                <FileText className="w-4 h-4 text-gray-500" />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                                                    <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB</p>
                                                </div>
                                            </div>
                                            <button onClick={() => handleRemoveFile(i)} className="p-1 hover:bg-gray-200 rounded transition-colors">
                                                <X className="w-4 h-4 text-gray-500" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Resumen */}
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 space-y-3">
                                <h3 className="text-sm font-semibold text-gray-700">Resumen de tu denuncia</h3>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div><span className="text-gray-400">Tipo:</span><span className="ml-1 font-medium text-gray-800">{form.tipo}</span></div>
                                    <div><span className="text-gray-400">Empresa:</span><span className="ml-1 font-medium text-gray-800">{form.empresa}</span></div>
                                    <div><span className="text-gray-400">Prioridad:</span><span className="ml-1 font-medium text-gray-800 capitalize">{form.prioridad}</span></div>
                                    <div><span className="text-gray-400">Documentos:</span><span className="ml-1 font-medium text-gray-800">{uploadedFiles.length}</span></div>
                                    <div className="col-span-2"><span className="text-gray-400">Título:</span><span className="ml-1 font-medium text-gray-800">{form.titulo}</span></div>
                                </div>
                            </div>

                            {/* Aviso */}
                            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4">
                                <Shield className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                                <p className="text-xs text-blue-700 leading-relaxed">
                                    Esta denuncia es completamente anónima. No almacenamos datos personales ni dirección IP. Solo recibirás un folio para seguimiento.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Footer navegación */}
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
                        {step > 1 ? (
                            <button
                                onClick={() => setStep(s => s - 1)}
                                className="px-5 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Atrás
                            </button>
                        ) : <span />}

                        {step < 3 ? (
                            <button
                                onClick={() => {
                                    if (step === 1 && !validateStep1()) return;
                                    if (step === 2 && !validateStep2()) return;
                                    setStep(s => s + 1);
                                }}
                                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                            >
                                Continuar
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                            >
                                <Send className="w-4 h-4" />
                                Enviar denuncia
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DenunciaAnonima;