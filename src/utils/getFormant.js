export const formatMonto = (monto, moneda) =>
    `${Number(monto ?? 0).toLocaleString('es-MX', { minimumFractionDigits: 2 })} ${moneda ?? ''}`;

export const formatFecha = (isoDate) => (isoDate ? isoDate.split('T')[0] : '');

export const formatFechaHora = (isoDate) =>
    isoDate ? isoDate.replace('T', ' ').slice(0, 16) : '—';