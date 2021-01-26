import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FilterService } from 'src/app/services/filter/filter.service';
import { GeneratePdfService } from 'src/app/services/pdf/generate-pdf.service';
import { SectorService } from 'src/app/services/serctor/sector.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-view-pdf',
  templateUrl: './view-pdf.component.html',
  styleUrls: ['./view-pdf.component.css']
})
export class ViewPdfComponent implements OnInit {

  constructor(
    private generatePdfService: GeneratePdfService,
    private sectorService: SectorService,
    private filterService: FilterService,
  ) { }

  @Input() productList: Product[] = [];
  @Input() sector: string = null;
  @ViewChild('containerViewPDF') containerViewPDF: ElementRef;
  public currentDate = new Date();
  public versionTable: string = null;
  
  ngOnInit(): void {
    this.setVersionTable();
    this.setProductList();
    this.setNameSector();
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

  private setProductList(): void{
    this.filterService.productListEmitter.subscribe((res: Product[]) => {
      this.productList = res;
    });
  }

  private setNameSector(): void{
    this.sectorService.nameSectorEmitter.subscribe((res: string) => {
      this.sector = res;
    });
  }

}
