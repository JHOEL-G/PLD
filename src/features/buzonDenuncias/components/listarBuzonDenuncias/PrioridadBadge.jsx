import { getPrioridadConfig } from "../../utils/Denunciaconfig";

export default function PrioridadBadge({ prioridad, size = 'md' }) {
    const config = getPrioridadConfig(prioridad);
    const isModal = size === 'md';
    const sizeClasses = isModal ? 'px-4 py-2 text-xs rounded-xl' : 'px-3 py-1.5 text-xs rounded-lg';
    const label = isModal ? `PRIORIDAD ${config.label.toUpperCase()}` : `Prioridad ${config.label}`;

    return (
        <span className={`${sizeClasses} font-bold ${config.color} w-fit`}>
            {label}
        </span>
    );
}