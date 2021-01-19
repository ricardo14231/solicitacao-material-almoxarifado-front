import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewPdfComponent } from './components/view-pdf/view-pdf.component';
import { Product } from './models/product.model';
import { MessageService } from './services/message/message.service';
import { FilterService } from './services/filter.service';
import { GeneratePdfService } from './services/pdf/generate-pdf.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Sistema-Pedidos-Almoxarifado';

  constructor(
    private filterService: FilterService,
    private generatePDFService: GeneratePdfService,
    private messageService: MessageService,
  ) { }

  nameSector: string = '-1';
  productList: Product[] = [];
  @ViewChild(ViewPdfComponent) containerView: ViewPdfComponent;

  ngOnInit() {
    this.getNameSector();
    this.getProductList();
  }

  public generatePDF(): void{

    if(this.selectedSector() && this.selectedProduct()){
      this.generatePDFService.currentDataPrintPDF();
      //To-DO - colocar uma promisse
      //Para setar a data/hora da impressão
      setTimeout(()=> {
        this.generatePDFService.generatePDF(this.containerView.containerView.nativeElement, true);
        
      },200)
    }
  }
  
  public downloadPDF(): void{
    if(this.selectedSector() && this.selectedProduct())
      this.generatePDFService.generatePDF(this.containerView.containerView.nativeElement, false);
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
    this.filterService.nameSectorEmitter.subscribe((value => {
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
