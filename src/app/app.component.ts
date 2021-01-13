import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewPdfComponent } from './components/view-pdf/view-pdf.component';
import { Product } from './models/product.model';
import { DialogService } from './services/dialog/dialog.service';
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
    private dialogService: DialogService,
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
        console.log("teste1")
      },200)
      console.log("teste2")
    }
  }
  
  public downloadPDF(): void{
    if(this.selectedSector() && this.selectedProduct())
      this.generatePDFService.generatePDF(this.containerView.containerView.nativeElement, false);
  }

  public setFavoriteOrder(): void{

  }

  private getNameSector(): void{
    this.filterService.nameSectorEmitter.subscribe((value => {
      this.nameSector = value;
      console.log(this.nameSector)
    }));
  }

  private getProductList(): void{
    this.filterService.productListEmitter.subscribe((value => {
      this.productList = value;
      console.log(this.productList)
    }));
  }

  private selectedSector(): boolean{
    if(this.nameSector == '-1'){
      this.dialogService.dialog('Selecione o setor!', 'danger');
      return false;
    }
    return true;
  }

  private selectedProduct(): boolean{   
    if(this.productList.length == 0){
      this.dialogService.dialog('Lista de produtos vazia!', 'danger');
      return false;
    }
    return true;
  }

}
