export const formatFecha = (fechaISO) => {
    if (!fechaISO) return "-";
    const date = new Date(fechaISO);
    return date.toLocaleString("es-PE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

export const toISODateTime = (fechaSimple) => {
    if (!fechaSimple) return null;
    return new Date(`${fechaSimple}T00:00:00`).toISOString();
};