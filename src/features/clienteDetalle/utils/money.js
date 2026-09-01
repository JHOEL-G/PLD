export const money = (n) =>
    n === undefined || n === null || n === ""
        ? "NA"
        : `$${Number(n).toLocaleString("es-MX", { minimumFractionDigits: 2 })}`;