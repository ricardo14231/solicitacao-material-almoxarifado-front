import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { FilterService } from 'src/app/services/filter/filter.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input()
  productList: Product[] = [];

  constructor(
    private filterService: FilterService, 
  ) { }

  ngOnInit(): void {
    this.getProductList();
  }

  public getProductList(): void{
    this.filterService.productListEmitter.subscribe((res => {
      this.productList = res;
    }));
  } 

  public removeProduct(index){
    this.productList.splice(index, 1);
  }

}
