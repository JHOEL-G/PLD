import React from 'react'
import useColumnMapping from '../../features/configurarPlantilla/hooks/useColumnMapping';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Toolbar from '../../features/configurarPlantilla/components/Toolbar';

export default function ConfigurarPlantillaPage() {
    const [format, setFormat] = useState('excel');
    const navigate = useNavigate();
    const { columns, addColumn, removeColumn, updateColumn } = useColumnMapping();

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-in fade-in duration-500">

            <Toolbar
                onBack={() => navigate(-1)}
                onReload={() => window.location.reload()}
                onCancel={() => navigate(-1)}
                onSave={() => { }}
                onImportExcel={() => navigate('/importar/pasos')}
            />

            <div className="p-6 space-y-6">

                <div className="flex flex-wrap items-end gap-4">
                    <FormatSelector format={format} onChange={setFormat} />
                    <PlantillaInfo />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <ParametrosPanel columnsCount={columns.length} />
                    <ColumnMappingTable
                        columns={columns}
                        onAdd={addColumn}
                        onUpdate={updateColumn}
                        onRemove={removeColumn}
                    />
                </div>
            </div>
        </div>
    )
}
