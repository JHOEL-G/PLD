import { X } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import CountrySearchSelect from "./CountrySearchSelect";
import ToggleSwitch from "./ToggleSwitch";
import { useAgregarPaises } from "../hooks/useAgregarPaises";
import { useListarCatalogoReporteUno } from "../../../hooks/useListarCatalogoReporteUno";
import { useMemo } from "react";

const INITIAL_FORM = {
    paisId: 0,
    pais: '',
    descripcion: '',
    esParaiso: false,
    noCooperante: false,
    medidasDeficientes: false,
};

export default function CountryModal({ isOpen, onClose, onSave, country = null }) {
    const [formData, setFormData] = useState(INITIAL_FORM);

    const { mutate: agregarPais, isPending } = useAgregarPaises();
    const { data, isLoading, error } = useListarCatalogoReporteUno("CatalogoPaises");

    const opcionesPaises = useMemo(() => {
        return (data ?? []).map((item) => ({
            id: item.id,
            descripcion: item.descripcion,
        }));
    }, [data]);

    useEffect(() => {
        if (country) {
            setFormData({
                paisId: country.paisId || 0,
                pais: country.nombre || '',
                descripcion: country.descripcion || '',
                esParaiso: country.esParaiso || false,
                noCooperante: country.noCooperante || false,
                medidasDeficientes: country.medidasDeficientes || false,
            });
        } else {
            setFormData(INITIAL_FORM);
        }
    }, [country, isOpen]);

    if (!isOpen) return null;

    const isEdit = !!country;

    const handleSave = () => {
        if (!formData.paisId) {
            alert("Debe seleccionar un país válido de la lista.");
            return;
        }

        const payload = {
            paisId: formData.paisId,
            descripcion: formData.descripcion,
            esParaisoFiscal: formData.esParaiso,
            esPaisNoCooperante: formData.noCooperante,
            esMedidaDeficiente: formData.medidasDeficientes,
        };

        agregarPais(payload, {
            onSuccess: () => {
                onSave?.(formData);
                onClose();
            },
        });
    };

    const handleSelectPais = (nombreSeleccionado) => {
        const paisEncontrado = opcionesPaises.find(
            (p) => p.descripcion.toUpperCase() === nombreSeleccionado.toUpperCase()
        );

        setFormData({
            ...formData,
            paisId: paisEncontrado?.id ?? 0,
            pais: nombreSeleccionado,
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 backdrop-blur-[2px] pt-16">
            <div className="w-full max-w-3xl bg-white rounded shadow-2xl overflow-hidden border border-gray-300">

                <div className="bg-[#34495e] px-4 py-3 flex justify-between items-center">
                    <h2 className="text-white text-md font-semibold">
                        {isEdit ? 'Editar país' : 'Nuevo registro de país'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <X size={18} />
                    </button>
                </div>

                <div className="p-8">
                    <div className="border-b border-gray-200 mb-8">
                        <span className="text-gray-400 italic text-lg block pb-2">Registro</span>
                    </div>

                    <div className="space-y-5 max-w-2xl mx-auto">
                        <div className="flex items-center">
                            <label className="w-1/3 text-right pr-6 text-slate-500 font-bold text-[13px] uppercase">
                                País
                            </label>

                            <CountrySearchSelect
                                value={formData.pais}
                                options={opcionesPaises}
                                isLoading={isLoading}
                                onChange={handleSelectPais}
                            />
                        </div>

                        {error && (
                            <p className="text-xs text-red-500 text-center">
                                Error al cargar el catálogo de países
                            </p>
                        )}

                        <div className="flex items-start">
                            <label className="w-1/3 text-right pr-6 pt-2 text-slate-500 font-bold text-[13px] uppercase">
                                Descripción
                            </label>
                            <textarea
                                rows="3"
                                value={formData.descripcion}
                                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                                className="w-2/3 border border-gray-300 rounded px-3 py-1.5 text-sm outline-none focus:border-blue-400 bg-[#f9f9f9] resize-none"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-y-6 pt-4 border-t border-gray-50">
                            <div className="flex items-center justify-end pr-8 gap-4">
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter text-right leading-3">
                                    Listado <br /> Paraíso Fiscal
                                </span>
                                <ToggleSwitch
                                    enabled={formData.esParaiso}
                                    onClick={() => setFormData({ ...formData, esParaiso: !formData.esParaiso })}
                                />
                            </div>

                            <div className="flex items-center justify-start pl-8 gap-4">
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter leading-3">
                                    Países <br /> no cooperantes
                                </span>
                                <ToggleSwitch
                                    enabled={formData.noCooperante}
                                    onClick={() => setFormData({ ...formData, noCooperante: !formData.noCooperante })}
                                />
                            </div>

                            <div className="flex items-center justify-end pr-8 gap-4">
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter text-right leading-3">
                                    Medidas <br /> deficientes
                                </span>
                                <ToggleSwitch
                                    enabled={formData.medidasDeficientes}
                                    onClick={() =>
                                        setFormData({ ...formData, medidasDeficientes: !formData.medidasDeficientes })
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-12 pt-4 border-t border-gray-100">
                        <button
                            onClick={onClose}
                            disabled={isPending}
                            className="px-5 py-1.5 border border-gray-300 rounded text-gray-600 hover:bg-gray-50 text-sm transition-all disabled:opacity-50"
                        >
                            Cerrar
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={isPending}
                            className="px-5 py-1.5 bg-[#337ab7] hover:bg-[#286090] text-white rounded text-sm font-medium transition-all shadow-sm disabled:opacity-50"
                        >
                            {isPending ? 'Guardando...' : isEdit ? 'Actualizar' : 'Guardar'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
