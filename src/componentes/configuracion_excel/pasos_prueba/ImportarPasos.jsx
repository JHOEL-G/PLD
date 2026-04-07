import React, { useState } from 'react';
import { Upload, ListChecks, Database, FileUp, Settings2, ArrowRight } from 'lucide-react';

const ImportarPasos = () => {
    const [step, setStep] = useState(1);

    const steps = [
        { id: 1, label: 'Subir archivo', icon: FileUp },
        { id: 2, label: 'Detalle de datos a importar', icon: ListChecks },
        { id: 3, label: 'Subir datos', icon: Database },
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-700">Importar listas PLD</h2>
                <button className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800 font-medium">
                    <Settings2 className="w-4 h-4" /> <span>Configurar plantilla</span>
                </button>
            </div>

            <div className="p-10 space-y-12">
                {/* Stepper Visual */}
                <div className="relative flex justify-between max-w-4xl mx-auto">
                    {/* Línea de fondo */}
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2" />

                    {steps.map((s) => {
                        const Icon = s.icon;
                        const isActive = step >= s.id;
                        return (
                            <div key={s.id} className="relative flex flex-col items-center group">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10 
                  ${isActive ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-white border-gray-200 text-gray-400'}`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <span className={`absolute -bottom-8 whitespace-nowrap text-sm font-medium transition-colors 
                  ${isActive ? 'text-gray-700' : 'text-gray-400'}`}>
                                    {s.label}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Área de carga */}
                <div className="max-w-2xl mx-auto pt-10 space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Plantilla de importación</label>
                        <select className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl bg-white focus:border-blue-500 outline-none transition-all">
                            <option>PLANT PERS BLOQUEADAS</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Seleccione un archivo xlsx con los datos de importación</label>
                        <div className="relative group">
                            <input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                            />
                            <div className="border-2 border-dashed border-gray-200 group-hover:border-blue-400 group-hover:bg-blue-50/50 rounded-xl p-8 transition-all text-center">
                                <Upload className="w-10 h-10 text-gray-300 group-hover:text-blue-500 mx-auto mb-3 transition-colors" />
                                <p className="text-blue-600 font-semibold group-hover:text-blue-700">Selecciona 1 archivo</p>
                                <p className="text-xs text-gray-400 mt-1">O arrastra y suelta aquí</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button className="flex items-center space-x-2 px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-100 active:scale-95">
                            <span>Siguiente</span>
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer Branding */}
            <div className="px-6 py-4 bg-gray-50 border-t flex justify-between items-center text-[10px] text-gray-400 uppercase tracking-widest">
                <div className="flex space-x-4">
                    <span>Sitios de consulta</span>
                </div>
                <div className="flex space-x-1">
                    <span className="font-bold text-gray-500">Lendus - IT Solution</span>
                    <span>Todos los derechos reservados</span>
                </div>
            </div>
        </div>
    );
};

export default ImportarPasos;