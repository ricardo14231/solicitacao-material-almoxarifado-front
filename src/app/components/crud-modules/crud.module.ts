import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';

import { MainSectorComponent } from './sector/main/main-sector.component';
import { MainProductComponent } from './product/main/main-product.component';
import { MainUserComponent } from './user/main/main-user.component';
import { PaginationComponent } from './pagination/pagination.component';


const crudComponent = [
   MainSectorComponent,
   MainProductComponent,
   MainUserComponent,
   PaginationComponent
]

@NgModule({
  declarations: [ 
    crudComponent
  ],
  imports: [
    CommonModule,
    BrowserModule
  ],
  providers: [],
  exports: [
    crudComponent
  ]
})
export class CrudModule { }
