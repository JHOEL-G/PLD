import { useState } from "react";
import ClienteHeader from "../../features/clientePerfil/components/ClienteHeader";
import DatosGeneralesTab from "../../features/clientePerfil/components/DatosGeneralesTab";
import EBRTab from "../../features/clientePerfil/components/EBRTab";
import ExpedienteTab from "../../features/clientePerfil/components/ExpedienteTab";
import TabsNav from "../../features/clientePerfil/components/TabsNav";
import TransaccionalTab from "../../features/clientePerfil/components/TransaccionalTab";
import { clienteData, documentosInicial, factoresRiesgo, transaccionesInicial } from "../../features/clientePerfil/constants/data";

export default function PerfilClientePage() {
    const [activeTab, setActiveTab] = useState("generales");

    const [documentos] = useState(documentosInicial);
    const [transacciones, setTransacciones] = useState(transaccionesInicial);

    const handleAgregarTransaccion = () => {
        console.log("Agregar transacción");
    };

    return (
        <>
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-7xl mx-auto">
                    <ClienteHeader
                        cliente={clienteData}
                        onExportar={() => console.log("Exportar perfil")}
                        onEditar={() => console.log("Editar cliente")}
                    />

                    <TabsNav activeTab={activeTab} setActiveTab={setActiveTab} />

                    {activeTab === "generales" && <DatosGeneralesTab cliente={clienteData} />}
                    {activeTab === "expediente" && (
                        <ExpedienteTab
                            documentos={documentos}
                            onVerDocumento={(doc) => console.log("Ver documento", doc)}
                        />
                    )}
                    {activeTab === "transaccional" && (
                        <TransaccionalTab
                            transacciones={transacciones}
                            onAgregarTransaccion={handleAgregarTransaccion}
                        />
                    )}
                    {activeTab === "ebr" && (
                        <EBRTab nivelRiesgo={clienteData.nivelRiesgo} factoresRiesgo={factoresRiesgo} />
                    )}
                </div>
            </div>
        </>
    )
}
