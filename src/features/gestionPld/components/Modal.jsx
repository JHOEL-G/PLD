export default function Modal({ isOpen, onClose, icon, title, message, actions }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-8 w-[380px] text-center">
                <div className="flex justify-center mb-4">{icon}</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 mb-6">{message}</p>
                <div className="flex gap-3 justify-center">{actions}</div>
            </div>
        </div>
    )
}
