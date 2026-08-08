import AlertCard from "./AlertCard";
import AlertFilters from "./AlertFilters";

export default function AlertHistorial({ alerts, statusFilter, priorityFilter, onStatusFilterChange, onPriorityFilterChange, onChangeStatus, }) {
    return (
        <div>
            <AlertFilters
                statusFilter={statusFilter}
                priorityFilter={priorityFilter}
                onStatusChange={onStatusFilterChange}
                onPriorityChange={onPriorityFilterChange}
                resultCount={alerts.length}
            />

            <div className="space-y-4">
                {alerts.map((alert) => (
                    <AlertCard
                        key={alert.id}
                        alert={alert}
                        onChangeStatus={onChangeStatus}
                    />
                ))}
            </div>
        </div>
    )
}
