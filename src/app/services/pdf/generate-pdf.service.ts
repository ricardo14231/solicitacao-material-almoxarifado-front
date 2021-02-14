import { EventEmitter, Injectable } from '@angular/core';

import { jsPDF } from 'jspdf';
import html2PDF from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class GeneratePdfService {

  constructor( ) { }

  public currentDateEmitter = new EventEmitter<Date>();

  //Envia a data da impressão para o templete da view do pdf.
  public currentDataPrintPDF(): void{
    this.currentDateEmitter.emit(new Date());    
  }


  public generatePDF(doc, print: boolean): void{
    html2PDF(doc, {
      onclone: function (clonedDoc) {  
        clonedDoc.getElementById('containerViewPDF').style.visibility = 'visible';
        },
        scale: 3, //Melhora a qualiadde da imagem gerada 
        backgroundColor: '#fff'
    }).then((canvas) => {
        canvas.toDataURL('image/png');
        let pdf = new jsPDF('l', 'pt', "a4");
        let width = pdf.internal.pageSize.width;    
        let height = pdf.internal.pageSize.height;
        pdf.addImage(canvas, 'JPEG', 0, 0, width, height);
    
        
        if(print){
          //Opção para abrir o PDf em um nova janela do navegador.
          let viewPrint = window.open(URL.createObjectURL(pdf.output("blob"))); 
          viewPrint.window.print();
         
        }else{
          let date = new Date();
          // Opção para baixar o PDF
          pdf.save(`pedido-material - ${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}.pdf`);  
        }
    });   
  } 

  
}
