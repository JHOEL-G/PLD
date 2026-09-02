import { useRef, useState } from 'react';
import { INITIAL_COLUMNS, PROP_OPTIONS } from '../constants/constants';

export default function useColumnMapping(initialColumns = INITIAL_COLUMNS) {
    const [columns, setColumns] = useState(initialColumns);
    const idCounter = useRef(initialColumns.length + 1);

    const addColumn = () => {
        const newId = String(idCounter.current++);
        const defaultProp = PROP_OPTIONS[0];
        setColumns(prev => [
            ...prev,
            {
                id: newId,
                num: prev.length + 1,
                prop: defaultProp.label,
                type: defaultProp.type,
            },
        ]);
    };

    const removeColumn = (id) => {
        setColumns(prev => prev.filter(col => col.id !== id));
    };

    const updateColumn = (id, field, value) => {
        setColumns(prev => prev.map(col => {
            if (col.id !== id) return col;
            if (field === 'prop') {
                const match = PROP_OPTIONS.find(o => o.label === value);
                return { ...col, prop: value, type: match?.type ?? col.type };
            }
            return { ...col, [field]: value };
        }));
    };

    return { columns, addColumn, removeColumn, updateColumn };
}