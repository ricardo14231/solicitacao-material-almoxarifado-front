import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { FilterService } from 'src/app/services/filter/filter.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(
    private filterService: FilterService, 
  ) { }

  @Input()
  productList: Product[] = [];
  private subscription = new Subscription();
  
  ngOnInit(): void {
    this.getProductList();
  }

  public getProductList(): void{
    this.subscription = this.filterService.productListEmitter.subscribe((res => {
        this.productList = res;
      }))
  } 

  public removeProduct(index){
    this.productList.splice(index, 1);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
