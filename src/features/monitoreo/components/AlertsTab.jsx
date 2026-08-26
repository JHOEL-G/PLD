import AlertFilters from './AlertFilters'
import { Bell } from 'lucide-react'
import AlertsTable from './AlertsTable'

export default function AlertsTab({ filters, setFilters, onClearFilters, filteredAlerts, totalAlerts, onCambiarStatus }) {
    return (
        <div className="space-y-6">
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                    <Bell className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div>
                        <h4 className="text-sm font-semibold text-orange-900 mb-1">Alertas de Monitoreo</h4>
                        <p className="text-sm text-orange-800">Avisos generados automáticamente por operaciones que superan los umbrales configurados en dólares o UMAs.</p>
                    </div>
                </div>
            </div>

            <AlertFilters
                filters={filters}
                setFilters={setFilters}
                onClear={onClearFilters}
                filteredCount={filteredAlerts.length}
                totalCount={totalAlerts}
            />

            <AlertsTable alerts={filteredAlerts} onCambiarStatus={onCambiarStatus} />
        </div>
    )
}
