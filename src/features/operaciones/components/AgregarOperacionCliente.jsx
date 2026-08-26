import { useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    Check,
    Upload,
    Info,
    Loader,
    AlertCircle,
    FileCheck2
} from 'lucide-react';
import { useAgregarOperacionClienteArchivo } from "../hooks/useAgregarOperacionClienteArchivo";
import { useAgregarOperacionCliente } from "../hooks/useAgregarOperacionCliente";
import { useCatalogoTipoPersona } from "../../../hooks/useCatalogoTipoPersona";
import { useCatalogoNivelRiesgo } from "../../../hooks/useCatalogoNivelRiesgo";
import { useCatalogoNacionalidad } from "../../../hooks/useCatalogoNacionalidad";
import { useCatalogoActividadEconomica } from "../../../hooks/useCatalogoActividadEconomica";
import { useCatalogoTipoIdentificador } from "../../../hooks/useCatalogoTipoIdentificador";
import { useCatalogoRangoOperacionMensual } from "../../../hooks/useCatalogoRangoOperacionMensual";
import { useCatalogoTipoOperacionEfectivo } from "../../../hooks/useCatalogoTipoOperacionEfectivo";
import { useMemo } from "react";

const TIPOS_DOCUMENTO = [
    { tipoDocumentoId: 1, label: 'Comprobante de domicilio', requerido: true },
    { tipoDocumentoId: 2, label: 'Identificación oficial', requerido: true },
    { tipoDocumentoId: 3, label: 'RFC', requerido: true },
    { tipoDocumentoId: 4, label: 'Acta constitutiva (persona moral)', requerido: false },
    { tipoDocumentoId: 5, label: 'Poder notarial', requerido: false }
];

const STEPS = [
    { num: 1, label: 'Datos generales' },
    { num: 2, label: 'Identificación' },
    { num: 3, label: 'Cuestionario' },
    { num: 4, label: 'Documentos' }
];

const initialFormData = {
    tipoPersonaId: '',
    rfc: '',
    nombreCompleto: '',
    fechaNacimiento: '',
    curp: '',
    nivelRiesgoId: '',
    nacionalidadId: '',
    actividadEconomicaId: '',
    tipoIdentificadorId: '',
    numeroIdentificador: '',
    vigencia: '',
    esPep: false,
    montoOperacionesMensualesId: '',
    origenRecursos: '',
    operaEnEfectivoId: ''
};

const toIsoDateTime = (dateStr) => {
    if (!dateStr) return null;
    return new Date(`${dateStr}T00:00:00`).toISOString();
};

const mapCatalogo = (query) => (query.data?.data ?? []).map((item) => ({
    id: item.id,
    nombre: item.descripcion,
}));

export default function AgregarOperacionCliente() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState(initialFormData);
    const [operacionId, setOperacionId] = useState(null);
    const [documentFiles, setDocumentFiles] = useState({});
    const [uploadedDocs, setUploadedDocs] = useState({});

    const agregarOperacion = useAgregarOperacionCliente();
    const agregarArchivo = useAgregarOperacionClienteArchivo();

    const qTipoPersona = useCatalogoTipoPersona();
    const qNivelRiesgo = useCatalogoNivelRiesgo();
    const qNacionalidad = useCatalogoNacionalidad();
    const qActividadEconomica = useCatalogoActividadEconomica();
    const qTipoIdentificador = useCatalogoTipoIdentificador();
    const qMontoOperacionesMensuales = useCatalogoRangoOperacionMensual();
    const qOperaEnEfectivo = useCatalogoTipoOperacionEfectivo();

    const catalogosLoading =
        qTipoPersona.isLoading ||
        qNivelRiesgo.isLoading ||
        qNacionalidad.isLoading ||
        qActividadEconomica.isLoading ||
        qTipoIdentificador.isLoading ||
        qMontoOperacionesMensuales.isLoading ||
        qOperaEnEfectivo.isLoading;

    const CATALOGOS = useMemo(() => ({
        tipoPersona: mapCatalogo(qTipoPersona),
        nivelRiesgo: mapCatalogo(qNivelRiesgo),
        nacionalidad: mapCatalogo(qNacionalidad),
        actividadEconomica: mapCatalogo(qActividadEconomica),
        tipoIdentificador: mapCatalogo(qTipoIdentificador),
        montoOperacionesMensuales: mapCatalogo(qMontoOperacionesMensuales),
        operaEnEfectivo: mapCatalogo(qOperaEnEfectivo),
    }), [
        qTipoPersona.data,
        qNivelRiesgo.data,
        qNacionalidad.data,
        qActividadEconomica.data,
        qTipoIdentificador.data,
        qMontoOperacionesMensuales.data,
        qOperaEnEfectivo.data,
    ]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNextStep = () => {
        if (currentStep < 3) setCurrentStep(currentStep + 1);
        else if (currentStep === 3) handleGuardarCliente();
    };

    const handlePrevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const handleVolver = () => {
        if (onCancel) onCancel();
        else window.history.back();
    };

    const handleGuardarCliente = () => {
        const payload = {
            tipoPersonaId: Number(formData.tipoPersonaId),
            rfc: formData.rfc,
            nombreCompleto: formData.nombreCompleto,
            fechaNacimiento: toIsoDateTime(formData.fechaNacimiento),
            curp: formData.curp,
            nivelRiesgoId: Number(formData.nivelRiesgoId),
            nacionalidadId: Number(formData.nacionalidadId),
            actividadEconomicaId: Number(formData.actividadEconomicaId),
            tipoIdentificadorId: Number(formData.tipoIdentificadorId),
            numeroIdentificador: formData.numeroIdentificador,
            vigencia: toIsoDateTime(formData.vigencia),
            esPep: formData.esPep,
            montoOperacionesMensualesId: Number(formData.montoOperacionesMensualesId),
            origenRecursos: formData.origenRecursos,
            operaEnEfectivoId: Number(formData.operaEnEfectivoId)
        };

        agregarOperacion.mutate(payload, {
            onSuccess: (data) => {
                setOperacionId(data?.operacionId ?? data?.idOperacion ?? data?.id ?? null);
                setCurrentStep(4);
            }
        });
    };

    const handleFileSelect = (tipoDocumentoId, file) => {
        setDocumentFiles(prev => ({ ...prev, [tipoDocumentoId]: file }));
    };

    const handleUploadDocumento = (tipoDocumentoId) => {
        const file = documentFiles[tipoDocumentoId];
        if (!file || !operacionId) return;

        agregarArchivo.mutate({
            operacionId,
            tipoDocumentoId,
            nombreArchivo: file.name,
            urlArchivo: file.name
        }, {
            onSuccess: () => {
                setUploadedDocs(prev => ({ ...prev, [tipoDocumentoId]: true }));
            }
        });
    };

    const handleFinalizar = () => {
        if (onSuccess) onSuccess(operacionId);
        else window.history.back();
    };

    return (
        <div className="min-h-screen bg-[#F7F5F0] font-[Inter,sans-serif] text-[#1F2130]">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@500;600&display=swap');
                .font-display { font-family: 'Fraunces', serif; font-optical-sizing: auto; }
                .font-mono-tag { font-family: 'IBM Plex Mono', monospace; letter-spacing: 0.04em; }
            `}</style>

            {/* Header */}
            <div className="sticky top-0 z-30 bg-[#F7F5F0]/95 backdrop-blur-md border-b border-[#E4E0D6]">
                <div className="max-w-4xl mx-auto px-6 py-5 flex items-center gap-4">
                    <button
                        onClick={handleVolver}
                        aria-label="Volver"
                        className="p-2.5 hover:bg-white rounded-xl border border-transparent hover:border-[#E4E0D6] transition-colors text-[#5b5647]"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="font-display text-2xl font-semibold text-[#14213D] tracking-tight leading-none">Alta de nuevo cliente</h1>
                        <p className="text-sm text-[#7A7563] mt-1">Expediente, identificación y cuestionario de riesgo</p>
                    </div>
                </div>

                {/* Pasos */}
                <div className="max-w-4xl mx-auto px-6 pb-5">
                    <div className="flex items-center justify-between">
                        {STEPS.map((step, idx) => (
                            <div key={step.num} className="flex items-center flex-1 last:flex-none">
                                <div className="flex items-center gap-3">
                                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-mono-tag text-xs font-semibold transition-all shrink-0
                                        ${currentStep > step.num
                                            ? 'bg-[#0F6659] text-white'
                                            : currentStep === step.num
                                                ? 'bg-[#14213D] text-white'
                                                : 'bg-white border border-[#E4E0D6] text-[#A7A08A]'}`}>
                                        {currentStep > step.num ? <Check className="w-4 h-4" /> : step.num}
                                    </div>
                                    <span className={`hidden sm:block text-sm font-semibold whitespace-nowrap ${currentStep >= step.num ? 'text-[#14213D]' : 'text-[#A7A08A]'}`}>
                                        {step.label}
                                    </span>
                                </div>
                                {idx < STEPS.length - 1 && (
                                    <div className={`flex-1 h-px mx-4 transition-all ${currentStep > step.num ? 'bg-[#0F6659]' : 'bg-[#E4E0D6]'}`} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Contenido */}
            <div className="max-w-4xl mx-auto px-6 py-8 pb-32">
                <div className="bg-white rounded-2xl border border-[#E4E0D6] p-8">

                    {catalogosLoading && currentStep < 4 ? (
                        <div className="py-10 text-center text-[#A7A08A] text-sm flex items-center justify-center gap-2">
                            <Loader className="w-4 h-4 animate-spin" />
                            Cargando catálogos...
                        </div>
                    ) : (
                        <>
                            {/* Paso 1: Datos generales */}
                            {currentStep === 1 && (
                                <div className="space-y-5">
                                    <h3 className="font-display text-lg font-semibold text-[#14213D] mb-1">Datos generales</h3>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-semibold text-[#14213D] mb-2">
                                                Tipo de persona <span className="text-[#9A2A20]">*</span>
                                            </label>
                                            <select
                                                value={formData.tipoPersonaId}
                                                onChange={(e) => handleInputChange('tipoPersonaId', e.target.value)}
                                                className="w-full px-4 py-2.5 bg-[#FAF8F3] border border-[#E4E0D6] rounded-lg focus:ring-2 focus:ring-[#14213D]/15 focus:border-[#14213D] outline-none transition-all text-sm"
                                            >
                                                <option value="">Seleccione...</option>
                                                {CATALOGOS.tipoPersona.map(o => <option key={o.id} value={o.id}>{o.nombre}</option>)}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-[#14213D] mb-2">
                                                RFC <span className="text-[#9A2A20]">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="XAXX010101000"
                                                value={formData.rfc}
                                                onChange={(e) => handleInputChange('rfc', e.target.value)}
                                                className="w-full px-4 py-2.5 bg-[#FAF8F3] border border-[#E4E0D6] rounded-lg focus:ring-2 focus:ring-[#14213D]/15 focus:border-[#14213D] outline-none transition-all text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-[#14213D] mb-2">
                                            Nombre completo <span className="text-[#9A2A20]">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.nombreCompleto}
                                            onChange={(e) => handleInputChange('nombreCompleto', e.target.value)}
                                            className="w-full px-4 py-2.5 bg-[#FAF8F3] border border-[#E4E0D6] rounded-lg focus:ring-2 focus:ring-[#14213D]/15 focus:border-[#14213D] outline-none transition-all text-sm"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-semibold text-[#14213D] mb-2">
                                                Fecha de nacimiento <span className="text-[#9A2A20]">*</span>
                                            </label>
                                            <input
                                                type="date"
                                                value={formData.fechaNacimiento}
                                                onChange={(e) => handleInputChange('fechaNacimiento', e.target.value)}
                                                className="w-full px-4 py-2.5 bg-[#FAF8F3] border border-[#E4E0D6] rounded-lg focus:ring-2 focus:ring-[#14213D]/15 focus:border-[#14213D] outline-none transition-all text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-[#14213D] mb-2">CURP</label>
                                            <input
                                                type="text"
                                                value={formData.curp}
                                                onChange={(e) => handleInputChange('curp', e.target.value)}
                                                className="w-full px-4 py-2.5 bg-[#FAF8F3] border border-[#E4E0D6] rounded-lg focus:ring-2 focus:ring-[#14213D]/15 focus:border-[#14213D] outline-none transition-all text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-semibold text-[#14213D] mb-2">
                                                Nivel de riesgo <span className="text-[#9A2A20]">*</span>
                                            </label>
                                            <select
                                                value={formData.nivelRiesgoId}
                                                onChange={(e) => handleInputChange('nivelRiesgoId', e.target.value)}
                                                className="w-full px-4 py-2.5 bg-[#FAF8F3] border border-[#E4E0D6] rounded-lg focus:ring-2 focus:ring-[#14213D]/15 focus:border-[#14213D] outline-none transition-all text-sm"
                                            >
                                                <option value="">Seleccione...</option>
                                                {CATALOGOS.nivelRiesgo.map(o => <option key={o.id} value={o.id}>{o.nombre}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-[#14213D] mb-2">
                                                Nacionalidad <span className="text-[#9A2A20]">*</span>
                                            </label>
                                            <select
                                                value={formData.nacionalidadId}
                                                onChange={(e) => handleInputChange('nacionalidadId', e.target.value)}
                                                className="w-full px-4 py-2.5 bg-[#FAF8F3] border border-[#E4E0D6] rounded-lg focus:ring-2 focus:ring-[#14213D]/15 focus:border-[#14213D] outline-none transition-all text-sm"
                                            >
                                                <option value="">Seleccione...</option>
                                                {CATALOGOS.nacionalidad.map(o => <option key={o.id} value={o.id}>{o.nombre}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-[#14213D] mb-2">
                                            Actividad económica <span className="text-[#9A2A20]">*</span>
                                        </label>
                                        <select
                                            value={formData.actividadEconomicaId}
                                            onChange={(e) => handleInputChange('actividadEconomicaId', e.target.value)}
                                            className="w-full px-4 py-2.5 bg-[#FAF8F3] border border-[#E4E0D6] rounded-lg focus:ring-2 focus:ring-[#14213D]/15 focus:border-[#14213D] outline-none transition-all text-sm"
                                        >
                                            <option value="">Seleccione...</option>
                                            {CATALOGOS.actividadEconomica.map(o => <option key={o.id} value={o.id}>{o.nombre}</option>)}
                                        </select>
                                    </div>

                                    <div className="bg-[#E7EDFB] border border-[#C9D8F4] rounded-xl p-4 flex gap-3">
                                        <Info className="w-5 h-5 text-[#25438B] shrink-0 mt-0.5" />
                                        <p className="text-sm text-[#25438B]">
                                            Los campos marcados con <span className="font-semibold">*</span> son obligatorios para continuar.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Paso 2: Identificación */}
                            {currentStep === 2 && (
                                <div className="space-y-5">
                                    <h3 className="font-display text-lg font-semibold text-[#14213D] mb-1">Identificación oficial</h3>

                                    <div>
                                        <label className="block text-sm font-semibold text-[#14213D] mb-2">
                                            Tipo de identificación <span className="text-[#9A2A20]">*</span>
                                        </label>
                                        <select
                                            value={formData.tipoIdentificadorId}
                                            onChange={(e) => handleInputChange('tipoIdentificadorId', e.target.value)}
                                            className="w-full px-4 py-2.5 bg-[#FAF8F3] border border-[#E4E0D6] rounded-lg focus:ring-2 focus:ring-[#14213D]/15 focus:border-[#14213D] outline-none transition-all text-sm"
                                        >
                                            <option value="">Seleccione...</option>
                                            {CATALOGOS.tipoIdentificador.map(o => <option key={o.id} value={o.id}>{o.nombre}</option>)}
                                        </select>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-semibold text-[#14213D] mb-2">
                                                Número de identificación <span className="text-[#9A2A20]">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.numeroIdentificador}
                                                onChange={(e) => handleInputChange('numeroIdentificador', e.target.value)}
                                                className="w-full px-4 py-2.5 bg-[#FAF8F3] border border-[#E4E0D6] rounded-lg focus:ring-2 focus:ring-[#14213D]/15 focus:border-[#14213D] outline-none transition-all text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-[#14213D] mb-2">
                                                Vigencia <span className="text-[#9A2A20]">*</span>
                                            </label>
                                            <input
                                                type="date"
                                                value={formData.vigencia}
                                                onChange={(e) => handleInputChange('vigencia', e.target.value)}
                                                className="w-full px-4 py-2.5 bg-[#FAF8F3] border border-[#E4E0D6] rounded-lg focus:ring-2 focus:ring-[#14213D]/15 focus:border-[#14213D] outline-none transition-all text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Paso 3: Cuestionario */}
                            {currentStep === 3 && (
                                <div className="space-y-7">
                                    <h3 className="font-display text-lg font-semibold text-[#14213D] mb-1">Cuestionario de riesgo</h3>

                                    <div>
                                        <label className="block text-sm font-semibold text-[#14213D] mb-3">
                                            1. ¿Es persona políticamente expuesta (PEP)?
                                        </label>
                                        <div className="flex gap-6">
                                            <label className="flex items-center gap-2.5 cursor-pointer">
                                                <input type="radio" checked={formData.esPep === true} onChange={() => handleInputChange('esPep', true)} className="w-4 h-4 accent-[#14213D]" />
                                                <span className="text-sm text-[#1F2130]">Sí</span>
                                            </label>
                                            <label className="flex items-center gap-2.5 cursor-pointer">
                                                <input type="radio" checked={formData.esPep === false} onChange={() => handleInputChange('esPep', false)} className="w-4 h-4 accent-[#14213D]" />
                                                <span className="text-sm text-[#1F2130]">No</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-[#14213D] mb-3">
                                            2. Monto aproximado de operaciones mensuales
                                        </label>
                                        <select
                                            value={formData.montoOperacionesMensualesId}
                                            onChange={(e) => handleInputChange('montoOperacionesMensualesId', e.target.value)}
                                            className="w-full px-4 py-2.5 bg-[#FAF8F3] border border-[#E4E0D6] rounded-lg focus:ring-2 focus:ring-[#14213D]/15 focus:border-[#14213D] outline-none transition-all text-sm"
                                        >
                                            <option value="">Seleccione...</option>
                                            {CATALOGOS.montoOperacionesMensuales.map(o => <option key={o.id} value={o.id}>{o.nombre}</option>)}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-[#14213D] mb-3">
                                            3. Origen de los recursos
                                        </label>
                                        <textarea
                                            placeholder="Describa el origen..."
                                            value={formData.origenRecursos}
                                            onChange={(e) => handleInputChange('origenRecursos', e.target.value)}
                                            rows={3}
                                            className="w-full px-4 py-2.5 bg-[#FAF8F3] border border-[#E4E0D6] rounded-lg focus:ring-2 focus:ring-[#14213D]/15 focus:border-[#14213D] outline-none transition-all text-sm resize-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-[#14213D] mb-3">
                                            4. ¿Realiza operaciones en efectivo?
                                        </label>
                                        <div className="space-y-2">
                                            {CATALOGOS.operaEnEfectivo.map(o => (
                                                <label key={o.id} className="flex items-center gap-2.5 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        checked={String(formData.operaEnEfectivoId) === String(o.id)}
                                                        onChange={() => handleInputChange('operaEnEfectivoId', o.id)}
                                                        className="w-4 h-4 accent-[#14213D]"
                                                    />
                                                    <span className="text-sm text-[#1F2130]">{o.nombre}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-[#FBF3DB] border border-[#EDDBA0] rounded-xl p-4 flex gap-3">
                                        <Info className="w-5 h-5 text-[#8A6D00] shrink-0 mt-0.5" />
                                        <p className="text-sm text-[#8A6D00]">
                                            El sistema calculará automáticamente el nivel de riesgo con base en estas respuestas.
                                        </p>
                                    </div>

                                    {agregarOperacion.isError && (
                                        <div className="bg-[#FBE7E5] border border-[#F0C6C1] rounded-xl p-4 flex gap-3">
                                            <AlertCircle className="w-5 h-5 text-[#9A2A20] shrink-0 mt-0.5" />
                                            <p className="text-sm text-[#9A2A20]">
                                                {agregarOperacion.error?.message || 'No se pudo guardar el cliente. Intenta de nuevo.'}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    )}

                    {/* Paso 4: Documentos */}
                    {currentStep === 4 && (
                        <div className="space-y-5">
                            <div>
                                <h3 className="font-display text-lg font-semibold text-[#14213D] mb-1">Expediente digital</h3>
                                <p className="text-sm text-[#7A7563]">Cliente registrado correctamente. Ahora anexa la documentación de soporte.</p>
                            </div>

                            {TIPOS_DOCUMENTO.map(doc => {
                                const file = documentFiles[doc.tipoDocumentoId];
                                const isUploaded = uploadedDocs[doc.tipoDocumentoId];

                                return (
                                    <div key={doc.tipoDocumentoId}>
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="text-sm font-semibold text-[#14213D]">{doc.label}</label>
                                            <span className={`text-xs font-semibold px-2 py-1 rounded-md ${doc.requerido ? 'text-[#9A2A20] bg-[#FBE7E5]' : 'text-[#7A7563] bg-[#FAF8F3]'}`}>
                                                {doc.requerido ? 'Requerido' : 'Opcional'}
                                            </span>
                                        </div>

                                        {isUploaded ? (
                                            <div className="border border-[#BFE3DC] bg-[#E4F3F0] rounded-xl p-4 flex items-center gap-3">
                                                <FileCheck2 className="w-5 h-5 text-[#0F6659]" />
                                                <p className="text-sm font-medium text-[#0F6659]">{file?.name} anexado correctamente</p>
                                            </div>
                                        ) : (
                                            <div className="border-2 border-dashed border-[#D8D2BF] bg-[#FAF8F3] rounded-xl p-5 relative hover:border-[#14213D]/30 hover:bg-[#F3EFE4] transition-colors">
                                                <input
                                                    type="file"
                                                    onChange={(e) => handleFileSelect(doc.tipoDocumentoId, e.target.files?.[0] ?? null)}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                />
                                                <div className="flex items-center gap-3">
                                                    <Upload className="w-6 h-6 text-[#C8C2AE] shrink-0" />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-[#14213D] truncate">
                                                            {file ? file.name : 'Click para cargar o arrastra el archivo'}
                                                        </p>
                                                        <p className="text-xs text-[#A7A08A]">PDF, JPG o PNG (máx. 5MB)</p>
                                                    </div>
                                                    {file && (
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); handleUploadDocumento(doc.tipoDocumentoId); }}
                                                            disabled={agregarArchivo.isPending}
                                                            className="relative z-20 px-4 py-2 bg-[#14213D] hover:bg-[#1c2d54] text-white text-xs font-semibold rounded-lg transition-colors disabled:opacity-50 shrink-0"
                                                        >
                                                            {agregarArchivo.isPending ? 'Subiendo...' : 'Subir'}
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* Footer fijo con acciones */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E4E0D6] px-6 py-5 z-30">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <button
                        onClick={currentStep === 1 ? handleVolver : handlePrevStep}
                        disabled={currentStep === 4}
                        className="px-5 py-2.5 text-[#5b5647] font-semibold rounded-lg hover:bg-[#FAF8F3] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {currentStep === 1 ? 'Cancelar' : 'Anterior'}
                    </button>

                    {currentStep < 3 && (
                        <button
                            onClick={handleNextStep}
                            className="px-6 py-2.5 bg-[#14213D] hover:bg-[#1c2d54] text-white font-semibold rounded-lg transition-colors flex items-center gap-2 text-sm"
                        >
                            Siguiente
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    )}

                    {currentStep === 3 && (
                        <button
                            onClick={handleGuardarCliente}
                            disabled={agregarOperacion.isPending}
                            className="px-6 py-2.5 bg-[#14213D] hover:bg-[#1c2d54] text-white font-semibold rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2 text-sm"
                        >
                            {agregarOperacion.isPending ? (
                                <>
                                    <Loader className="w-4 h-4 animate-spin" />
                                    Guardando...
                                </>
                            ) : (
                                <>
                                    <Check className="w-4 h-4" />
                                    Guardar cliente
                                </>
                            )}
                        </button>
                    )}

                    {currentStep === 4 && (
                        <button
                            onClick={handleFinalizar}
                            className="px-6 py-2.5 bg-[#0F6659] hover:bg-[#0c534a] text-white font-semibold rounded-lg transition-colors flex items-center gap-2 text-sm"
                        >
                            <Check className="w-4 h-4" />
                            Finalizar
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
