export default function RiskBadge({ level }) {
    const styles =
        level === "BAJO RIESGO"
            ? "bg-emerald-50 text-emerald-600 border-emerald-200"
            : level === "MEDIO RIESGO"
                ? "bg-amber-50 text-amber-600 border-amber-200"
                : "bg-red-50 text-red-600 border-red-200";
    return (
        <span className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${styles}`}>
            {level}
        </span>
    );
}