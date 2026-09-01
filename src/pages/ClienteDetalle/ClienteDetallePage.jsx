import { useState } from "react";
import ClienteHeader from "../../features/clienteDetalle/components/ClienteHeader";
import ClienteTab from "../../features/clienteDetalle/components/ClienteTab";
import PlaceholderTab from "../../features/clienteDetalle/components/PlaceholderTab";
import PldTab from "../../features/clienteDetalle/components/PldTab";
import ProductosTab from "../../features/clienteDetalle/components/ProductosTab";
import TabsNav from "../../features/clienteDetalle/components/TabsNav";
import TopBar from "../../features/clienteDetalle/components/TopBar";
import { cliente } from "../../features/clienteDetalle/constants/clienteMock";

export default function ClienteDetallePage() {
    const [tab, setTab] = useState("cliente");

    return (
        <div className="min-h-screen bg-slate-100/70 flex flex-col font-sans text-slate-800 antialiased">
            <TopBar
                telefono={cliente.telefono}
                genero={cliente.genero}
                onRegresar={() => window.history.back()}
                onImprimir={() => window.print()}
            />

            <div className="flex flex-1 overflow-hidden">
                <main className="flex-1 overflow-y-auto p-6 md:p-8">
                    <div className="max-w-6xl mx-auto bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 min-h-[calc(100vh-8rem)]">
                        {tab === "cliente" && <ClienteTab />}
                        {tab === "seguimientos" && <PlaceholderTab label="Seguimientos" />}
                        {tab === "productos" && <ProductosTab />}
                        {tab === "archivos" && <PlaceholderTab label="Archivos" />}
                        {tab === "pld" && <PldTab />}
                        {tab === "circulo" && <PlaceholderTab label="Círculo de Crédito" />}
                    </div>
                </main>

                <aside className="w-80 bg-white border-l border-slate-200/80 flex flex-col shrink-0 shadow-lg shadow-slate-200/50">
                    <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                        <ClienteHeader nombre={cliente.nombre} clienteId={cliente.clienteId} />
                    </div>

                    <div className="p-4 flex-1 overflow-y-auto">
                        <TabsNav tab={tab} setTab={setTab} />
                    </div>
                </aside>
            </div>
        </div>
    )
}
