import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { GeneratePdfService } from 'src/app/services/pdf/generate-pdf.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-view-pdf',
  templateUrl: './view-pdf.component.html',
  styleUrls: ['./view-pdf.component.css']
})
export class ViewPdfComponent implements OnInit {

  constructor(
    private generatePdfService: GeneratePdfService,
  ) { }

  @Input()
  productList: Product[] = [];
  @Input()
  sector: string = null;
  @ViewChild('containerView') containerView: ElementRef;
  public currentDate = new Date();
  public versionTable: string = null;
  
  ngOnInit(): void {
    this.setVersionTable();
    this.setCurrentDatePrintPDF();
  }

  private setCurrentDatePrintPDF(): void{
    this.generatePdfService.currentDateEmitter.subscribe((res: Date) => {
      this.currentDate = res;
    });
  }

  private setVersionTable(){
    
    if(this.currentDate.getMonth() < 6){
      this.versionTable = `${this.currentDate.getFullYear()}.1`;
    }else{
      this.versionTable = `${this.currentDate.getFullYear()}.2`;
    }
  }

}
