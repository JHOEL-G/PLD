export const getResultadoTexto = (resultado) => {
    switch (resultado) {
        case "sin":
            return "NO encontrando coincidencias por lo que puede ser sujeto a evaluación y continuar con el proceso.";
        case "pep":
            return "ENCONTRANDO coincidencia en Lista PEP por lo que NO puede ser sujeto a evaluación y debe ser evaluado por el área de cumplimiento.";
        case "negra":
            return "ENCONTRANDO coincidencia en Listas Negras por lo que NO puede ser sujeto a evaluación.";
        case "propia":
            return "ENCONTRANDO coincidencia en Lista Propia por lo que debe ser evaluado por el área de cumplimiento.";
        default:
            return "NO encontrando coincidencias por lo que puede ser sujeto a evaluación y continuar con el proceso.";
    }
};

export const formatFechaLarga = (fecha) => {
    const meses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
    ];
    const date = new Date(fecha.replace(" ", "T"));
    const dia = date.getDate();
    const mes = meses[date.getMonth()];
    const anio = date.getFullYear();
    return `${dia} de ${mes} de ${anio}`;
};

export const buildFechaActual = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
        now.getDate()
    ).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(
        now.getMinutes()
    ).padStart(2, "0")}`;
};

export const downloadRecordAsPDF = async (elementRef, fileNameBase) => {
    const html2canvas = (await import("https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/+esm")).default;
    const { jsPDF } = await import("https://cdn.jsdelivr.net/npm/jspdf@2.5.1/+esm");

    const element = elementRef.current;
    const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 0;

    pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    pdf.save(`${fileNameBase.replace(/\s/g, "_")}.pdf`);
};