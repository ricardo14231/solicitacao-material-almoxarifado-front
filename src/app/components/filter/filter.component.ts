import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { FilterService } from 'src/app/services/filter.service';
import { FormControl } from '@angular/forms';
import { tap, map, filter, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Sector } from 'src/app/models/sector.model';
import { FavoriteService } from 'src/app/services/favorite/favorite.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { borderBottomLeftRadius } from 'html2canvas/dist/types/css/property-descriptors/border-radius';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  constructor(
    private filterService: FilterService,
    private teste: FavoriteService,
    private dialogService: DialogService,
  ) { }

  sectors: Sector [] = [];
  //nameSectorSelected: string = null;
  queryField = new FormControl();
  result: Observable<any>;
  options: Product [] = [];
  lastProductSelected: Product = null;
  productList: Product[] = [];

  amountProduct: number = null;

  //Ver se não tem como adicionar via FormControl
  valueInputProduct: string;

  @ViewChild('divProduct', {static: false}) divProduct: ElementRef;
  @ViewChild('divAmountProduct', {static: false}) divAmountProduct: ElementRef;


  ngOnInit(): void {
    this.initListSector();
    this.initSearchProduct();
    this.searchResult();
    
    this.teste.getFavorite(1).subscribe( t => {
      console.log(t)
     // this.productList.push(t)
    })

  }

  public focusFunction(event): void{
    console.log(event)
    if(event.type == 'focus'){
      if(event.target.name == 'inputProduct'){
        this.divProduct.nativeElement.style.boxShadow = "0px -2px 3px 2px #c5c5c5"; 
      }else{
        this.divAmountProduct.nativeElement.style.boxShadow = "0px 0px 3px 3px #c5c5c5";
      }
    }else{
      this.divProduct.nativeElement.style.boxShadow = "none";
      this.divAmountProduct.nativeElement.style.boxShadow = "none";
    }
  }

  private borderRadiusFucntion(active: boolean): void{
    if(active){
      this.divProduct.nativeElement.style.borderBottomLeftRadius = '0';
      this.divProduct.nativeElement.style.borderBottomRightRadius = '0';
    }else{
      this.divProduct.nativeElement.style.borderBottomLeftRadius = '4px';
      this.divProduct.nativeElement.style.borderBottomRightRadius = '4px';
    }
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
        switchMap(value => this.filterService.searchProduct(value))
      );

  }

  public searchResult(): void{
    this.result.subscribe((res: Product[]) => {
      this.options = res;
      console.log(res)
      if(this.options[0] == undefined){
        this.dialogService.dialog("Produto não cadastrado!", "alert");
      }
      console.log(this.options.length)
      if(this.options.length > 0){
        this.borderRadiusFucntion(true);
      }else{
        this.borderRadiusFucntion(false);
      }

    });
  }

  private clearListOfProduct(): void{
    this.options = [];
  }

  public productSelected(event, index): void{
    
    this.amountProduct = 1;

    this.lastProductSelected = this.options[index];

    this.clearListOfProduct();
    
    this.borderRadiusFucntion(false);
  }

  public addProduct(){
    
    //TO DO
    //VER SE DÁ PARA COLOCAR VIA FORMCONTROLE PARA ELIMINAR ESSA VARIÁVEL
    this.lastProductSelected.amount = this.amountProduct;
    
    //Verifica se o item selecionado já está na lista; Se tiver ele não é adicionado
    if(this.productAlreadySelected(this.lastProductSelected)){
      this.dialogService.dialog('Produto já adicionado', 'alert')
    }else{

      this.productList.push(this.lastProductSelected);
    
      //Compartilha a lista de produtos para os outros componentes via Service
      this.filterService.productList(this.productList);
  
      // PARA LIMPAR O INPUT DO FILTRO DE PRODUTO - MIDIFICAR PARA LIMPAR O CAMPO SEM REMOVER O ULTIMO PRODUTO SELECIONADO
      this.clearDataInput();

      this.borderRadiusFucntion(false);

    }
  }

  public clearDataInput(): void{
    this.amountProduct = null;
    this.lastProductSelected = null;
  }
  
  public selectedSector(value): void{
    this.filterService.nameSector(value);
  }

  public getFavoriteOrder(): void{
    let fade = document.getElementById('fade');
    fade.style.display = "flex"
  }

  private productAlreadySelected(product: Product): boolean{
     
    if(this.productList.find(element => element.id == product.id) == undefined) 
      return false;

    return true;
  }
}
