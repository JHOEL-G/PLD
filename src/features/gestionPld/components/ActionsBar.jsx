import { Trash2 } from "lucide-react";

export default function ActionsBar({ onDelete, onEdit, onCancel, onSave }) {
    return (
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
            <button onClick={onDelete}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors">
                <Trash2 className="w-4 h-4" /> Eliminar
            </button>
            <button onClick={onEdit}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors">
                Editar
            </button>
            <button onClick={onCancel}
                className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                Cancelar
            </button>
            <button onClick={onSave}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                Guardar
            </button>
        </div>
    )
}
