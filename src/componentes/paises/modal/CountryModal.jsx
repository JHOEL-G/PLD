import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const CountryModal = ({ isOpen, onClose, onSave, country = null }) => {
    // Estado inicial dinámico: si hay country editamos, si no, creamos uno vacío
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        esParaiso: false,
        noCooperante: false,
        medidasDeficientes: false
    });

    // Sincronizar el estado cuando el modal se abre o cambia el país seleccionado
    useEffect(() => {
        if (country) {
            setFormData({
                nombre: country.nombre || '',
                descripcion: country.descripcion || '',
                esParaiso: country.esParaiso || false,
                noCooperante: country.noCooperante || false,
                medidasDeficientes: country.medidasDeficientes || false
            });
        } else {
            setFormData({
                nombre: '',
                descripcion: '',
                esParaiso: false,
                noCooperante: false,
                medidasDeficientes: false
            });
        }
    }, [country, isOpen]);

    if (!isOpen) return null;

    const isEdit = !!country;

    const handleSave = () => {
        onSave(formData);
        onClose();
    };

    // Componente interno Toggle para reutilizar
    const Toggle = ({ enabled, onClick }) => (
        <button
            onClick={onClick}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${enabled ? 'bg-teal-500' : 'bg-gray-200'
                }`}
        >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition shadow-sm ${enabled ? 'translate-x-6' : 'translate-x-1'
                }`} />
        </button>
    );

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 backdrop-blur-[2px] pt-16">
            <div className="w-full max-w-3xl bg-white rounded shadow-2xl overflow-hidden border border-gray-300">

                {/* Header Dinámico */}
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
                        {/* Campo Nombre */}
                        <div className="flex items-center">
                            <label className="w-1/3 text-right pr-6 text-slate-500 font-bold text-[13px] uppercase">País</label>
                            <input
                                type="text"
                                value={formData.nombre}
                                onChange={(e) => setFormData({ ...formData, nombre: e.target.value.toUpperCase() })}
                                className="w-2/3 border border-gray-300 rounded px-3 py-1.5 text-sm outline-none focus:border-blue-400 bg-[#f9f9f9]"
                                placeholder="EJ: MÉXICO"
                            />
                        </div>

                        {/* Campo Descripción */}
                        <div className="flex items-start">
                            <label className="w-1/3 text-right pr-6 pt-2 text-slate-500 font-bold text-[13px] uppercase">Descripción</label>
                            <textarea
                                rows="3"
                                value={formData.descripcion}
                                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                                className="w-2/3 border border-gray-300 rounded px-3 py-1.5 text-sm outline-none focus:border-blue-400 bg-[#f9f9f9] resize-none"
                            />
                        </div>

                        {/* Switches de Estatus */}
                        <div className="grid grid-cols-2 gap-y-6 pt-4 border-t border-gray-50">

                            <div className="flex items-center justify-end pr-8 gap-4">
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter text-right leading-3">
                                    Listado <br /> Paraíso Fiscal
                                </span>
                                <Toggle
                                    enabled={formData.esParaiso}
                                    onClick={() => setFormData({ ...formData, esParaiso: !formData.esParaiso })}
                                />
                            </div>

                            <div className="flex items-center justify-start pl-8 gap-4">
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter leading-3">
                                    Países <br /> no cooperantes
                                </span>
                                <Toggle
                                    enabled={formData.noCooperante}
                                    onClick={() => setFormData({ ...formData, noCooperante: !formData.noCooperante })}
                                />
                            </div>

                            <div className="flex items-center justify-end pr-8 gap-4">
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter text-right leading-3">
                                    Medidas <br /> deficientes
                                </span>
                                <Toggle
                                    enabled={formData.medidasDeficientes}
                                    onClick={() => setFormData({ ...formData, medidasDeficientes: !formData.medidasDeficientes })}
                                />
                            </div>

                        </div>
                    </div>

                    {/* Footer de Botones */}
                    <div className="flex justify-end gap-2 mt-12 pt-4 border-t border-gray-100">
                        <button
                            onClick={onClose}
                            className="px-5 py-1.5 border border-gray-300 rounded text-gray-600 hover:bg-gray-50 text-sm transition-all"
                        >
                            Cerrar
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-5 py-1.5 bg-[#337ab7] hover:bg-[#286090] text-white rounded text-sm font-medium transition-all shadow-sm"
                        >
                            {isEdit ? 'Actualizar' : 'Guardar'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CountryModal;