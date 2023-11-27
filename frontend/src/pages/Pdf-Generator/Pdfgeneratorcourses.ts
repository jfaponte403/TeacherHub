import * as jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import {Course} from "../../interfaces/course.ts";


export function generarPDF(course: Course[],nombreArchivo: string): void {

    const doc = new jsPDF.default();
    doc.text('Lista de materias', doc.internal.pageSize.getWidth() / 2, 10);

    const datos = course.map((course)=>[course.name]);

    autoTable(doc, {
        head: [['course']],
        body: datos
    })

    doc.save(`${nombreArchivo}.pdf`);
    console.log(`Se ha generado el archivo PDF: ${nombreArchivo}.pdf`);
}
