import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { FilterService } from 'src/app/services/filter.service';
import { FormControl } from '@angular/forms';
import { tap, map, filter, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GeneratePdfService } from 'src/app/services/pdf/generate-pdf.service';
import { Sector } from 'src/app/models/sector.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  constructor(
    private filterService: FilterService,
    private generatePDFService: GeneratePdfService
  ) { }

  sectors: Sector [] = [];
  nameSectorSelected: string = null;
  queryField = new FormControl();
  result: Observable<any>;
  options: Product [] = [];
  lastProductSelected: Product = null;
  productList: Product[] = [];

  amountProduct: number = null;

  //Ver se não tem como adicionar via FormControl
  valueInputProduct: string;

  ngOnInit(): void {
    this.initListSector();
    this.initSearchProduct();
    this.searchResult();
  }

  public initListSector(): void{
    this.filterService.listSector().subscribe((res: Sector[]) => {
      this.sectors = res;
    });
  }

  public initSearchProduct(): void{

    this.result = this.queryField.valueChanges
      .pipe(
        map(value => value.trim()),
        filter(value => value.length > 3),
        debounceTime(500),
        distinctUntilChanged(),
        /* tap(value => console.log(value)),  */
        switchMap(value => this.filterService.searchProduct(value))
      );

  }

  public searchResult(): void{
    this.result.subscribe(res => {
      this.options = res;
    });
  }

  private clearListOfProduct(): void{
    this.options = [];
  }

  public productSelected(event, index): void{
    
    this.amountProduct = 1;

    this.lastProductSelected = this.options[index];

    this.clearListOfProduct();
  }

  public addProduct(){
    
    //VER SE DÁ PARA COLOCAR VIA FORMCONTROLE PARA ELIMINAR ESSA VARIÁVEL
    this.lastProductSelected.amount = this.amountProduct;
  
    this.productList.push(this.lastProductSelected);
    
    // PARA LIMPAR O INPUT DO FILTRO DE PRODUTO - MIDIFICAR PARA LIMPAR O CAMPO SEM REMOVER O ULTIMO PRODUTO SELECIONADO
    this.clearDataInput();
  }

  public clearDataInput(): void{

    this.amountProduct = null;
    this.lastProductSelected = null;
  }

  public generatePDF(): void{
    let doc = document.querySelector('.containerView');
      
    this.generatePDFService.generatePDF(doc);
  }

  public selectedSector(value): void{
    this.nameSectorSelected = value;
  }

}
