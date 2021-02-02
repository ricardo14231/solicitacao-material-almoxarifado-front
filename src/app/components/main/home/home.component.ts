import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { FilterService } from 'src/app/services/filter/filter.service';
import { MessageService } from 'src/app/services/message/message.service';
import { GeneratePdfService } from 'src/app/services/pdf/generate-pdf.service';
import { SectorService } from 'src/app/services/serctor/sector.service';
import { ViewPdfComponent } from '../../view-pdf/view-pdf.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private generatePDFService: GeneratePdfService,
    private sectorService: SectorService,
    private messageService: MessageService,
    private filterService: FilterService,
  ) { }

  @ViewChild(ViewPdfComponent) containerPDF: ViewPdfComponent;
  nameSector: string = '-1';
  productList: Product[] = [];
  
  ngOnInit(): void {
    this.getNameSector();
    this.getProductList();
  }

  public printPDF(): void{

    if(this.selectedSector() && this.selectedProduct()){
      this.generatePDFService.currentDataPrintPDF();
      //To-DO - colocar uma promisse
      //Para setar a data/hora da impressão
      setTimeout(()=> {
        this.generatePDFService.generatePDF(this.containerPDF.containerViewPDF.nativeElement, true);        
      },200)
    }
  }
  
  public downloadPDF(): void{
    if(this.selectedSector() && this.selectedProduct())
      this.generatePDFService.generatePDF(this.containerPDF.containerViewPDF.nativeElement, false);
  }

  public setFavoriteOrder(): void{
    let newFunctionality: Boolean = false;
    //REMOVER QUANDO IMPREMENTAR A FUNCIONALIDADE
    if(newFunctionality){
      let fade = document.getElementById('fade');
      fade.style.display = "flex"
    }else{
      this.messageService.message('Funcionalidade em desenvolvimento!', 'danger', 6);
    }
    
  }

  private getNameSector(): void{
    this.sectorService.nameSectorEmitter.subscribe((value => {
      this.nameSector = value;
    }));
  }

  private getProductList(): void{
    this.filterService.productListEmitter.subscribe((value => {
      this.productList = value;
    }));
  }
  
  private selectedSector(): boolean{
    if(this.nameSector == '-1'){
      this.messageService.message('Selecione o setor!', 'danger', 1);
      return false;
    }
    return true;
  }

  private selectedProduct(): boolean{   
    if(this.productList.length == 0){
      this.messageService.message('Lista de produtos vazia!', 'danger', 5);
      return false;
    }
    return true;
  }



}
