import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { GeneratePdfService } from 'src/app/services/pdf/generate-pdf.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input()
  productList: Product[] = [];

  constructor(
    private generatePDFService: GeneratePdfService
  ) { }

  ngOnInit(): void {
  }

  public sendProduct(): void{
    this.generatePDFService.listProduct(this.productList);
  }

  public removeProduct(index){
    this.productList.splice(index, 1);
  }

}
