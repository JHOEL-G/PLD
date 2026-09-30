import { Upload, X, FileText } from 'lucide-react';

export default function SubirArchivoModal({ files, onFileChange, onRemoveFile, onClose, onSubmit }) {
    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
            <div className="bg-white rounded-[2rem] max-w-xl w-full shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">

                <div className="border-b border-slate-100 px-8 py-6 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600">
                            <Upload className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-800">Anexar Documentación</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-200 rounded-xl transition-colors text-slate-400"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-8 space-y-6">
                    <div className="border-2 border-dashed border-slate-300 bg-slate-50/50 rounded-3xl p-10 text-center hover:bg-indigo-50/50 hover:border-indigo-300 transition-colors group cursor-pointer relative">
                        <input
                            type="file"
                            multiple
                            onChange={onFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            id="file-upload"
                        />
                        <Upload className="w-12 h-12 text-slate-300 group-hover:text-indigo-400 mx-auto mb-4 transition-colors" />
                        <h3 className="text-lg font-bold text-slate-700 mb-1">Arrastra tus archivos aquí</h3>
                        <p className="text-sm text-slate-500 mb-6">o haz clic para explorar tu equipo</p>
                        <label
                            htmlFor="file-upload"
                            className="inline-block px-8 py-3 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl shadow-sm cursor-pointer group-hover:border-indigo-200 group-hover:text-indigo-600 transition-colors relative z-20"
                        >
                            Examinar Archivos
                        </label>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-6">Formatos: PDF, DOCX, JPG, PNG (máx. 10MB)</p>
                    </div>

                    {files.length > 0 && (
                        <div>
                            <h4 className="font-bold text-slate-800 mb-4 text-sm flex items-center justify-between">
                                Cola de subida
                                <span className="bg-indigo-100 text-indigo-700 py-1 px-3 rounded-full text-xs">{files.length}</span>
                            </h4>
                            <div className="space-y-3 max-h-56 overflow-y-auto pr-2">
                                {files.map((file, index) => (
                                    <div key={index} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                                        <div className="flex items-center space-x-4 overflow-hidden">
                                            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                                <FileText className="w-5 h-5 text-indigo-500" />
                                            </div>
                                            <div className="truncate">
                                                <p className="text-sm font-bold text-slate-700 truncate">{file.name}</p>
                                                <p className="text-xs font-medium text-slate-400 mt-0.5">{(file.size / 1024).toFixed(2)} KB</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => onRemoveFile(index)}
                                            className="p-2 hover:bg-rose-50 text-slate-400 hover:text-rose-500 rounded-xl transition-colors flex-shrink-0"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="bg-slate-50/50 border-t border-slate-100 px-8 py-5 flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 bg-white border-2 border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onSubmit}
                        disabled={files.length === 0}
                        className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-indigo-200"
                    >
                        Iniciar Subida
                    </button>
                </div>
            </div>
        </div>
    );
}