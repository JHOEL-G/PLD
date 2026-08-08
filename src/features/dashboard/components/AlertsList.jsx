import AlertItem from "./AlertItem";

export default function AlertsList({ alerts, onSelectAlert }) {
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-4 py-3 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-800">Extracto de Alertas</h3>
            </div>
            <div className="divide-y">
                {alerts.map((alert) => (
                    <AlertItem key={alert.id} alert={alert} onSelect={onSelectAlert} />
                ))}
            </div>
        </div>
    )
}
