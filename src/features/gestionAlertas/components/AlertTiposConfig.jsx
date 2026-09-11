import { Settings } from "lucide-react";
import AlertTypeToggle from "./AlertTypeToggle";
import { alertTypesConfig } from "../constants/mockData";
import { useState } from "react";
import { useEffect } from "react";

export default function AlertTiposConfig({ tipos, isLoading, isError, onGuardar, isSaving }) {
    const [seleccion, setSeleccion] = useState({});

    useEffect(() => {
        if (!tipos || tipos.length === 0) return;
        const inicial = {};
        tipos.forEach((tipo) => {
            inicial[tipo.codigo] = tipo.activo;
        });
        setSeleccion(inicial);
    }, [tipos]);

    const handleToggle = (codigo) => {
        setSeleccion((prev) => ({
            ...prev,
            [codigo]: !prev[codigo],
        }));
    };

    const handleGuardar = () => {
        const payload = {
            estados: Object.entries(seleccion).map(([codigo, activo]) => ({
                codigo,
                activo,
            })),
        };
        onGuardar?.(payload);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Configuración de Tipos de Alertas
                </h3>
                <p className="text-sm text-gray-600">
                    Configure qué tipos de alertas deben generarse automáticamente
                </p>
            </div>

            {isLoading && (
                <p className="text-sm text-gray-500 py-6 text-center">Cargando tipos de alerta...</p>
            )}

            {isError && (
                <p className="text-sm text-red-600 py-6 text-center">
                    Ocurrió un error al cargar los tipos de alerta.
                </p>
            )}

            {!isLoading && !isError && (
                <div className="space-y-4">
                    {tipos.length === 0 && (
                        <p className="text-sm text-gray-500">No hay tipos de alerta configurados.</p>
                    )}
                    {tipos.map((tipo) => (
                        <AlertTypeToggle
                            key={tipo.idTipoAlerta}
                            title={tipo.nombreTipoAlerta}
                            description={tipo.descripcionAlerta}
                            checked={seleccion[tipo.codigo] ?? tipo.activo}
                            onChange={() => handleToggle(tipo.codigo)}
                        />
                    ))}
                </div>
            )}

            <div className="mt-8 flex justify-start">
                <button
                    onClick={handleGuardar}
                    disabled={isLoading || isError || isSaving}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Settings className="w-4 h-4" />
                    {isSaving ? "Guardando..." : "Guardar Configuración"}
                </button>
            </div>
        </div>
    )
}
