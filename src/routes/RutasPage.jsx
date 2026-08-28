import { Route, Routes } from "react-router-dom";
import SidebarLayout from "../components/layout/Sidebar/SidebarLayout";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import AgregarBuzonDenuncia from "../features/buzonDenuncias/components/AgregarBuzonDenuncia";
import BuzonDenunciasPage from "../pages/BuzonDenuncias/BuzonDenunciasPage";
import AgregarOperacionCliente from "../features/operaciones/components/AgregarOperacionCliente";
import GestionAlertasPage from "../pages/GestionAlertas/GestionAlertasPage";
import PerfilTransaccionalPage from "../pages/PerfilTransaccional/PerfilTransaccionalPage";
import MonitoreoPage from "../pages/Monitoreo/MonitoreoPage";
import PerfilClientePage from "../pages/PerfilCliente/PerfilClientePage";
import SettingsPage from "../pages/Settings/SettingsPage";
import OperacionPage from "../pages/Operacion/OperacionPage";
import ListasBusquedaPage from "../pages/ListasBusqueda/ListasBusquedaPage";

export default function RutasPage() {
    return (
        <Routes>
            <Route element={<SidebarLayout />}>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/listar" element={<BuzonDenunciasPage />} />
                <Route path="agregar" element={<AgregarBuzonDenuncia />} />
                <Route path="/lista" element={<OperacionPage />} />
                <Route path="/agregar-cliente" element={<AgregarOperacionCliente />} />
                <Route path="/gestion-alertas" element={<GestionAlertasPage />} />
                <Route path="/perfil-transaccional" element={<PerfilTransaccionalPage />} />
                <Route path="/monitoreo" element={<MonitoreoPage />} />
                <Route path="/perfil-cliente" element={<PerfilClientePage />} />
                <Route path="/configuracion" element={<SettingsPage />} />
                <Route path="/consulta-listas" element={<ListasBusquedaPage />} />
            </Route>
        </Routes>
    )
}
