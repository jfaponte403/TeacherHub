import * as jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'


export function generarPDF(data: { [key: string]: any }[], nombreArchivo: string, propertyName: string): void {
    const doc = new jsPDF.default();
    doc.text(`${nombreArchivo}`, doc.internal.pageSize.getWidth() / 2, 10);

    const datos = data.map((item) => [item[propertyName]]);

    autoTable(doc, {
        head: [[propertyName]],
        body: datos
    });

    doc.save(`${nombreArchivo}.pdf`);
    console.log(`Se ha generado el archivo PDF: ${nombreArchivo}.pdf`);
}
