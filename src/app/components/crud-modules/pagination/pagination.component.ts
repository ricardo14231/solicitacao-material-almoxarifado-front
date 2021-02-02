import { AfterViewInit, Component, OnInit, QueryList, ViewChildren, Renderer2 } from '@angular/core';
import { PaginationService } from 'src/app/services/pagination/pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, AfterViewInit {

  constructor(
    private paginationService: PaginationService,
    private renderer: Renderer2,
  ) { }

  @ViewChildren('buttonPageView') buttonPageActive: QueryList<any>;
  @ViewChildren('li') teste: QueryList<any>;
  
  private perPage: number = 5;
  public currentPage: number = 1;
  public totalPage: number = 1;
  private minLeft: number = 1;
  private maxRight: number = 3;
  private amountButtonPagination: number = 3;
  public totalItems: number = 0;
  
  buttonsPageView: number [] = [1, 2, 3];

  ngOnInit(): void {    
    this.paginationService.totalPageEmitter.subscribe((res: number) => {
      this.totalItems = res;  
      this.totalPage = Math.ceil(res / this.perPage);
    });

    //Envia para outros componentes a quantidade de itens por página para gerar a primeira consulta. 
    this.paginationService.totalItemsPerPage(this.perPage);
  }

  ngAfterViewInit(){
    this.setClassActive();
  }
  
  public async previousPage(): Promise<any>{
    this.currentPage--;

    //Verifica se a página está em um intervalo válido para fazer a consulta.
    if(this.currentPage >= 1){
      this.paginationService.currentPage(this.currentPage, this.perPage);
    }
    //Evita que a página fique inferior a primeira. 
    if(this.currentPage < 1){
      this.currentPage = 1;
    }

    await this.setButtonsPageView();
    
    this.setClassActive();
    
  }

  public async nextPage(): Promise<any>{
    this.currentPage++;
   
    //Verifica se a página está em um intervalo válido para fazer a consulta.
    if(this.currentPage <= this.totalPage){
      this.paginationService.currentPage(this.currentPage, this.perPage);
    }  

    //Evita que a página fique superior a última. 
    if(this.currentPage > this.totalPage){
      this.currentPage = this.totalPage;
    }

    await this.setButtonsPageView();
    
    this.setClassActive();
    
  }


  private setButtonsPageView(): Promise<boolean>{
    
    return new Promise((resolve, reject) => {
      if(this.currentPage < this.minLeft && this.currentPage > 0){
        this.maxRight = this.currentPage;
        this.minLeft -= this.amountButtonPagination;
      
        this.buttonsPageView = [this.maxRight - 2, this.maxRight - 1, this.maxRight];
      }
      
      if(this.currentPage > this.maxRight  && this.currentPage <= this.totalPage){
        this.minLeft = this.currentPage;
        this.maxRight += this.amountButtonPagination;  

        this.buttonsPageView = [this.minLeft, this.minLeft + 1, this.minLeft + 2]
      }
      
      // VERIFICAR PARA TIRAR O setTimeout
      setTimeout(() => {
        resolve(true)
      }, 10); 
    
    })

     
  }

  private setClassActive(): void{
    
    this.teste.toArray().forEach((element) => {
      if(element.nativeElement.className == "page active"){
        this.renderer.removeClass(element.nativeElement, 'page');
        this.renderer.removeClass(element.nativeElement, 'active');
      }

      if(element.nativeElement.id == this.currentPage){
        element.nativeElement.className = 'page active'; 
      }
    });
  }

  public numberOfItemsdisplayed(): number{
    return ((this.totalPage !== 1 && this.currentPage !== this.totalPage) ? this.currentPage * this.perPage : this.totalItems);
  }
} 
