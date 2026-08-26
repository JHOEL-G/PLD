import { useEffect } from "react";
import { useState } from "react";
import Header from "../../features/monitoreo/components/Header";
import NavTabs from "../../features/monitoreo/components/NavTabs";
import DashboardTab from "../../features/monitoreo/components/DashboardTab";
import AlertsTab from "../../features/monitoreo/components/AlertsTab";
import DenunciasTab from "../../features/monitoreo/components/DenunciasTab";
import ExpedientesTab from "../../features/monitoreo/components/ExpedientesTab";
import AnonymousReportModal from "../../features/monitoreo/components/AnonymousReportModal";
import StatusChangeModal from "../../features/monitoreo/components/StatusChangeModal";
import { alertsInicial, denunciasInicial, expedientesInicial } from "../../features/monitoreo/constants/data";
import { checkExpedienteStatus } from "../../features/monitoreo/utils/utils";

export default function MonitoreoPage() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [showAnonymousForm, setShowAnonymousForm] = useState(false);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [selectedAlert, setSelectedAlert] = useState(null);

    const [alertFilters, setAlertFilters] = useState({
        cliente: '',
        tipo: 'todos',
        status: 'todos'
    });

    const [alerts, setAlerts] = useState(alertsInicial);
    const [denuncias, setDenuncias] = useState(denunciasInicial);
    const [expedientes, setExpedientes] = useState(expedientesInicial);

    useEffect(() => {
        setExpedientes(prev =>
            prev.map(exp => ({
                ...exp,
                status: checkExpedienteStatus(exp.expiration, exp.status)
            }))
        );
    }, []);

    const filteredAlerts = alerts.filter(alert => {
        const matchCliente = alert.client.toLowerCase().includes(alertFilters.cliente.toLowerCase());
        const matchTipo = alertFilters.tipo === 'todos' || alert.type === alertFilters.tipo;
        const matchStatus = alertFilters.status === 'todos' || alert.status === alertFilters.status;
        return matchCliente && matchTipo && matchStatus;
    });

    const denunciasPendientes = denuncias.filter(d => d.phase === 'Investigación' || d.phase === 'Reportada').length;

    const handleAnonymousSubmit = (report) => {
        const newDenuncia = {
            id: `DN${String(denuncias.length + 1).padStart(2, '0')}`,
            status: report.severity,
            phase: 'Investigación',
            title: report.title,
            description: report.description,
            client: report.client || 'Anónimo',
            date: new Date().toISOString().split('T')[0]
        };

        setDenuncias([...denuncias, newDenuncia]);
        setShowAnonymousForm(false);
        alert('Denuncia anónima enviada exitosamente');
    };

    const clearFilters = () => {
        setAlertFilters({ cliente: '', tipo: 'todos', status: 'todos' });
    };

    const handleOpenStatusModal = (alertItem) => {
        setSelectedAlert(alertItem);
        setShowStatusModal(true);
    };

    const handleStatusChange = (newStatus, statusNotes) => {
        if (!selectedAlert || !newStatus) return;

        setAlerts(prev =>
            prev.map(a =>
                a.id === selectedAlert.id
                    ? { ...a, status: newStatus, lastUpdate: new Date().toISOString().split('T')[0], notes: statusNotes }
                    : a
            )
        );

        setShowStatusModal(false);
        setSelectedAlert(null);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header onExportar={() => console.log('Exportar datos')} />

            <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} denunciasPendientes={denunciasPendientes} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {activeTab === 'dashboard' && (
                    <DashboardTab
                        denunciasPendientes={denunciasPendientes}
                        onVerDenuncias={() => setActiveTab('denuncias')}
                        onActualizarUSD={() => console.log('Actualizar USD')}
                        onActualizarUMA={() => console.log('Actualizar UMA')}
                    />
                )}

                {activeTab === 'alerts' && (
                    <AlertsTab
                        filters={alertFilters}
                        setFilters={setAlertFilters}
                        onClearFilters={clearFilters}
                        filteredAlerts={filteredAlerts}
                        totalAlerts={alerts.length}
                        onCambiarStatus={handleOpenStatusModal}
                    />
                )}

                {activeTab === 'denuncias' && (
                    <DenunciasTab
                        denuncias={denuncias}
                        onAbrirBuzon={() => setShowAnonymousForm(true)}
                        onVerDetalle={(d) => console.log('Ver detalle', d)}
                    />
                )}

                {activeTab === 'expedientes' && <ExpedientesTab expedientes={expedientes} />}
            </main>

            {showAnonymousForm && (
                <AnonymousReportModal onClose={() => setShowAnonymousForm(false)} onSubmit={handleAnonymousSubmit} />
            )}

            {showStatusModal && selectedAlert && (
                <StatusChangeModal
                    alert={selectedAlert}
                    onClose={() => setShowStatusModal(false)}
                    onConfirm={handleStatusChange}
                />
            )}
        </div>
    )
}
