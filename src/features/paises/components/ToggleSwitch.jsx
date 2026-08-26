export default function ToggleSwitch({ enabled, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${enabled ? 'bg-teal-500' : 'bg-gray-200'
                }`}
        >
            <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition shadow-sm ${enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
            />
        </button>
    )
}
