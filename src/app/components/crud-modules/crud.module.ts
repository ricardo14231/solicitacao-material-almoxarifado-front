import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { MainSectorComponent } from './sector/main/main-sector.component';
import { MainProductComponent } from './product/main/main-product.component';
import { MainUserComponent } from './user/main/main-user.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ListSectorComponent } from './sector/list-sector/list-sector.component';
import { FormSectorComponent } from './sector/form-sector/form-sector.component';


const crudComponent = [
   MainSectorComponent,
   MainProductComponent,
   MainUserComponent,
   PaginationComponent,
   ListSectorComponent,
   FormSectorComponent,
]

@NgModule({
  declarations: [ 
    crudComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
  ],
  providers: [],
  exports: [
    crudComponent
  ]
})
export class CrudModule { }
