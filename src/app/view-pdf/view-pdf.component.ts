import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-view-pdf',
  templateUrl: './view-pdf.component.html',
  styleUrls: ['./view-pdf.component.css']
})
export class ViewPdfComponent implements OnInit {

  constructor( ) { }

  @Input()
  productList: Product[] = [];
  @Input()
  sector: string = null;

  currentDate = new Date();
  private versionTable: string = null;
  
  ngOnInit(): void {
    this.setVersionTable();
  }

  
  public setVersionTable(){
    
    if(this.currentDate.getMonth() < 6){
      this.versionTable = `${this.currentDate.getFullYear()}.1`;
    }else{
      this.versionTable = `${this.currentDate.getFullYear()}.2`;
    }
  }

}
