import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { FilterService } from 'src/app/services/filter/filter.service';
import { FormControl } from '@angular/forms';
import { map, filter, debounceTime, switchMap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { Sector } from 'src/app/models/sector.model';
import { FavoriteService } from 'src/app/services/favorite/favorite.service';
import { MessageService } from 'src/app/services/message/message.service';
import { SectorService } from 'src/app/services/serctor/sector.service';
 

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  constructor(
    private filterService: FilterService,
    private sectorService: SectorService,
    private teste: FavoriteService,
    private messageService: MessageService,
  ) { }

  private subscription: Subscription[] = []
  sectors: Sector[];
  queryField = new FormControl();
  result: Observable<any>;
  options: Product [] = [];
  lastProductSelected: Product = null;
  productList: Product[] = [];
  productListed: boolean = true;
  fieldUF: string = "UF";
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

  private borderRadiusFunction(active: boolean): void{
    if(active){
      this.divProduct.nativeElement.style.borderBottomLeftRadius = '0';
      this.divProduct.nativeElement.style.borderBottomRightRadius = '0';
    }else{
      this.divProduct.nativeElement.style.borderBottomLeftRadius = '4px';
      this.divProduct.nativeElement.style.borderBottomRightRadius = '4px';
    }
  }

  public initListSector(): void{
    this.subscription.push(
      this.sectorService.listSector().subscribe((res: Sector[]) => {
        this.sectors = res;
      })
    )
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
    this.subscription.push(
      this.result.subscribe((res: Product[]) => {
        this.options = res;
        this.productListed = true;
      
        if(this.options[0] == undefined){
          this.messageService.message("Produto não cadastrado!", "alert", 2);
          this.productListed = false;
        }

        if(this.options.length > 0){
          this.borderRadiusFunction(true);
        }else{
          this.borderRadiusFunction(false);
        }
      })
    )
  }

  private insertproductListed(): void{
    this.lastProductSelected = {
      id: 0, 
      code: '00.00.00.00000000-0',
      amount: this.amountProduct,
      name: this.queryField.value, 
      uf: this.fieldUF.toUpperCase()
    }
  }

  private clearListOfProduct(): void{
    this.options = [];
  }

  public productSelected(event, index): void{
    
    this.amountProduct = 1;
    this.lastProductSelected = this.options[index];
    this.fieldUF = this.lastProductSelected.uf;

    this.clearListOfProduct();
    
    this.borderRadiusFunction(false);
  }

  public addProduct(): void{

    if(!this.productListed)
        this.insertproductListed();
    
    if(this.maxItemPerOrder() && this.lastProductSelectedIsNotNull() && this.productAlreadySelected(this.lastProductSelected)){
      this.productList.push(this.lastProductSelected);
    
      //Compartilha a lista de produtos para os outros componentes via Service
      this.filterService.productList(this.productList);

      // PARA LIMPAR O INPUT DO FILTRO DE PRODUTO - MIDIFICAR PARA LIMPAR O CAMPO SEM REMOVER O ULTIMO PRODUTO SELECIONADO
      this.clearDataInput();

      this.borderRadiusFunction(false); 
    }
  }

  private lastProductSelectedIsNotNull(): boolean{
    if(this.lastProductSelected != null){
      //VER SE DÁ PARA COLOCAR VIA FORMCONTROLE PARA ELIMINAR ESSA VARIÁVEL
      this.lastProductSelected.amount = (this.amountProduct !== null ? this.amountProduct : 1);
      return true;
    }  
    this.messageService.message('Selecione um produto!', 'alert', 3);
    return false;
  }
  //REMOVER QUANDO FOR POSSÍVEL GERAR ARQUIVOS  PDFs COM MÚLTIPLAS PÁGINAS
  private maxItemPerOrder(): Boolean {
    if(this.productList.length < 32){
      return true;
    }
    this.messageService.message('Limite de produtos por pedido atingido! Por favor, continue em um novo pedido.', 'danger', 7);
    return false;
  }

  public clearDataInput(): void{
    this.amountProduct = null;
    this.lastProductSelected = null;
    this.queryField.setValue('');
    this.fieldUF = "UF";
    this.productListed = true;
  }
  
  public selectedSector(value): void{
    this.sectorService.nameSector(value);
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
  
  //Verifica se o item selecionado já está na lista; Se tiver ele não é adicionado
  private productAlreadySelected(product: Product): boolean{
    if(this.productList.find(element => element.id == product.id) == undefined || product.id === 0){
      return true;
    } 
    this.messageService.message('Produto já adicionado!', 'alert', 4);
    return false;
  }

  ngOnDestroy(): void {
    this.subscription.forEach( sub => {
      sub.unsubscribe();
    })
  }
  
}
