import { Check, Trash2, AlertTriangle } from 'lucide-react';
import Modal from './Modal';

export default function PLDModals({ showSaveModal, onCloseSave, showDeleteModal, onCloseDelete, onConfirmDelete, showCancelModal, onCloseCancel, onConfirmCancel, }) {
    return (
        <>
            <Modal
                isOpen={showSaveModal}
                onClose={onCloseSave}
                icon={<div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center"><Check className="w-6 h-6 text-green-600" /></div>}
                title="Registro guardado"
                message="El registro PLD se ha guardado correctamente."
                actions={
                    <button onClick={onCloseSave} className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                        Aceptar
                    </button>
                }
            />

            <Modal
                isOpen={showDeleteModal}
                onClose={onCloseDelete}
                icon={<div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center"><Trash2 className="w-6 h-6 text-red-600" /></div>}
                title="¿Eliminar registro?"
                message="Esta acción no se puede deshacer. ¿Confirmas que deseas eliminar este registro PLD?"
                actions={<>
                    <button onClick={onCloseDelete} className="px-5 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100">Cancelar</button>
                    <button onClick={onConfirmDelete} className="px-5 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700">Eliminar</button>
                </>}
            />

            <Modal
                isOpen={showCancelModal}
                onClose={onCloseCancel}
                icon={<div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center"><AlertTriangle className="w-6 h-6 text-yellow-600" /></div>}
                title="¿Cancelar cambios?"
                message="Los cambios no guardados se perderán. ¿Deseas continuar?"
                actions={<>
                    <button onClick={onCloseCancel} className="px-5 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100">Seguir editando</button>
                    <button onClick={onConfirmCancel} className="px-5 py-2 text-sm font-medium text-white bg-yellow-500 rounded-lg hover:bg-yellow-600">Sí, cancelar</button>
                </>}
            />
        </>
    )
}
