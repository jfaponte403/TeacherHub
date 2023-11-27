import * as jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import {Teacher} from "../../interfaces/teacher.ts";


export function generarPDF(profesores: Teacher[],nombreArchivo: string): void {

    const doc = new jsPDF.default();
    doc.text('Lista de Profesores', doc.internal.pageSize.getWidth() / 2, 10);

    const datos = profesores.map((persona)=>[persona.name]);

    autoTable(doc, {
        head: [['name', 'course']],
        body: datos
    })

    doc.save(`${nombreArchivo}.pdf`);
    console.log(`Se ha generado el archivo PDF: ${nombreArchivo}.pdf`);
}
