import { useState } from "react";
import AlertHeader from "../../features/gestionAlertas/components/AlertHeader";
import AlertHistorial from "../../features/gestionAlertas/components/AlertHistorial";
import AlertStatsGrid from "../../features/gestionAlertas/components/AlertStatsGrid";
import AlertTabs from "../../features/gestionAlertas/components/AlertTabs";
import AlertTiposConfig from "../../features/gestionAlertas/components/AlertTiposConfig";
import StatusChangeModal from "../../features/gestionAlertas/components/StatusChangeModal";
import { alertStats, initialAlertsData } from "../../features/gestionAlertas/constants/mockData";

export default function GestionAlertasPage() {
    const [activeTab, setActiveTab] = useState("activas");
    const [statusFilter, setStatusFilter] = useState("todos");
    const [priorityFilter, setPriorityFilter] = useState("todas");

    const [showStatusModal, setShowStatusModal] = useState(false);
    const [selectedAlert, setSelectedAlert] = useState(null);
    const [newStatus, setNewStatus] = useState("");
    const [statusNotes, setStatusNotes] = useState("");

    const [alertsData, setAlertsData] = useState(initialAlertsData);

    const filteredAlerts = alertsData.filter((alert) => {
        const matchesStatus =
            statusFilter === "todos" || alert.status === statusFilter;
        const matchesPriority =
            priorityFilter === "todas" || alert.priority === priorityFilter;
        return matchesStatus && matchesPriority;
    });

    const handleOpenStatusModal = (alert) => {
        setSelectedAlert(alert);
        setNewStatus(alert.status);
        setStatusNotes("");
        setShowStatusModal(true);
    };

    const handleCloseModal = () => {
        setShowStatusModal(false);
        setSelectedAlert(null);
        setNewStatus("");
        setStatusNotes("");
    };

    const handleStatusChange = () => {
        if (!selectedAlert || !newStatus) return;

        const updatedAlerts = alertsData.map((alert) => {
            if (alert.id !== selectedAlert.id) return alert;

            const style = STATUS_STYLES[newStatus] || {};

            return {
                ...alert,
                status: newStatus,
                statusColor: style.statusColor || alert.statusColor,
                borderColor: style.borderColor || alert.borderColor,
                lastUpdate: new Date().toISOString().split("T")[0],
                notes: statusNotes,
            };
        });

        setAlertsData(updatedAlerts);
        handleCloseModal();
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-full mx-auto">
                <AlertHeader />

                <AlertTabs
                    activeTab={activeTab}
                    onChangeTab={setActiveTab}
                    badgeCount={alertStats.reduce((acc, stat) => acc + stat.value, 0)}
                />

                {activeTab === "activas" && <AlertStatsGrid stats={alertStats} />}

                {activeTab === "historial" && (
                    <AlertHistorial
                        alerts={filteredAlerts}
                        statusFilter={statusFilter}
                        priorityFilter={priorityFilter}
                        onStatusFilterChange={setStatusFilter}
                        onPriorityFilterChange={setPriorityFilter}
                        onChangeStatus={handleOpenStatusModal}
                    />
                )}

                {activeTab === "tipos" && (
                    <AlertTiposConfig onGuardar={() => { }} />
                )}
            </div>

            {showStatusModal && selectedAlert && (
                <StatusChangeModal
                    alert={selectedAlert}
                    newStatus={newStatus}
                    statusNotes={statusNotes}
                    onSelectStatus={setNewStatus}
                    onNotesChange={setStatusNotes}
                    onCancel={handleCloseModal}
                    onConfirm={handleStatusChange}
                />
            )}
        </div>
    )
}
