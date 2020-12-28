import { EventEmitter, Injectable } from '@angular/core';

import { jsPDF } from 'jspdf';
import html2PDF from 'html2canvas';
import { Product } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class GeneratePdfService {

  constructor( ) { }

  public emitterProducts = new EventEmitter<Product[]>();

  private currentDate = new Date();

  public listProduct(products: Product[]): void{
    this.emitterProducts.emit(products);
  }

  public generatePDF(doc): void{
  
    html2PDF(doc, {
      onclone: function (clonedDoc) {  
        clonedDoc.getElementById('containerView').style.visibility = 'visible';
        }
      }).then((canvas) => {
      let imgPDF = canvas.toDataURL('image/png');
      let pdf = new jsPDF('l', 'mm', [297, 210]);
      pdf.addImage(imgPDF, 'PNG', 0, 0, 297, 210);
  
      // Opção para baixar o PDF
      //pdf.save(`pedido-material - ${this.currentDate.getDate()}-${this.currentDate.getMonth()}-${this.currentDate.getFullYear()}.pdf`);  
      
      //Opção para abrir o PDf em um nova janela do navegador.
      window.open(URL.createObjectURL(pdf.output("blob")));
    }); 
    
  }  

}
