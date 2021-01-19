import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { FilterService } from 'src/app/services/filter.service';
import { FormControl } from '@angular/forms';
import { map, filter, debounceTime, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Sector } from 'src/app/models/sector.model';
import { FavoriteService } from 'src/app/services/favorite/favorite.service';
import { MessageService } from 'src/app/services/message/message.service';
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
    private messageService: MessageService,
  ) { }

  sectors: string [];
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
  }

  public focusFunction(event): void{
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
      this.sectors = res.map((sector : Sector) => {
        return sector.name_sector.substring(14, sector.name_sector.length);
      });
    });
  }

  public initSearchProduct(): void{

    this.result = this.queryField.valueChanges
      .pipe(
        map(value => value.trim()),
        filter(value => this.productWordSize(value)),
        debounceTime(500), 
        switchMap(value => this.filterService.searchProduct(value))
      );
  }

  private productWordSize(value: string): boolean{
    if(value.length > 3){
      return true;
    }else{
      // Se o nome do produto for menos que 3 limpa o array o que removerá a DIV da tela.  
      this.clearListOfProduct();
      return false;
    }
  }

  public searchResult(): void{
    this.result.subscribe((res: Product[]) => {
      this.options = res;

      if(this.options[0] == undefined){
        this.messageService.message("Produto não cadastrado!", "alert", 2);
      }

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

  public addProduct(): void{
    
    //SEPARAR ESSA FUNÇÃO EM OUTRAS

    if(this.lastProductSelected != null){
      //TO DO
      //VER SE DÁ PARA COLOCAR VIA FORMCONTROLE PARA ELIMINAR ESSA VARIÁVEL
      this.lastProductSelected.amount = this.amountProduct;
      
      //Verifica se o item selecionado já está na lista; Se tiver ele não é adicionado
      if(this.productAlreadySelected(this.lastProductSelected)){
        this.messageService.message('Produto já adicionado!', 'alert', 4)
      }else{

        this.productList.push(this.lastProductSelected);
      
        //Compartilha a lista de produtos para os outros componentes via Service
        this.filterService.productList(this.productList);
    
        // PARA LIMPAR O INPUT DO FILTRO DE PRODUTO - MIDIFICAR PARA LIMPAR O CAMPO SEM REMOVER O ULTIMO PRODUTO SELECIONADO
        this.clearDataInput();

        this.borderRadiusFucntion(false);

      }
    }else{
      this.messageService.message('Selecione um produto!', 'alert', 3) 
    }
    
  }

  public clearDataInput(): void{
    this.amountProduct = null;
    this.lastProductSelected = null;
    this.queryField.setValue('');
  }
  
  public selectedSector(value): void{
    this.filterService.nameSector(value);
  }

  public getFavoriteOrder(): void{

    let newFunctionality: Boolean = false;
    //REMOVER QUANDO IMPREMENTAR A FUNCIONALIDADE
    if(newFunctionality){
      let fade = document.getElementById('fade');
      fade.style.display = "flex"
    }else{
      this.messageService.message('Funcionalidade em desenvolvimento!', 'danger', 6);
    }
    
  }

  private productAlreadySelected(product: Product): boolean{
     
    if(this.productList.find(element => element.id == product.id) == undefined) 
      return false;

    return true;
  }
  
}
