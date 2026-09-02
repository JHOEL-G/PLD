import { FileSpreadsheet, FileText } from 'lucide-react';

export default function FormatSelector({ format, onChange }) {
    return (
        <div>
            <label className="text-xs font-bold text-gray-400 uppercase block mb-1.5">Formato</label>
            <div className="flex p-1 bg-gray-100 rounded-lg">
                <button
                    onClick={() => onChange('excel')}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm transition-all ${format === 'excel' ? 'bg-white shadow-sm text-green-700 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <FileSpreadsheet className="w-4 h-4" />
                    Excel
                </button>
                <button
                    onClick={() => onChange('csv')}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm transition-all ${format === 'csv' ? 'bg-white shadow-sm text-blue-700 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <FileText className="w-4 h-4" />
                    CSV
                </button>
            </div>
        </div>
    )
}
