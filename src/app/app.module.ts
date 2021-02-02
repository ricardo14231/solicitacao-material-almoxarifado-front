import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CrudModule } from './components/crud-modules/crud.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './components/main/table/table.component';
import { FilterComponent } from './components/main/filter/filter.component';
import { ViewPdfComponent } from './components/view-pdf/view-pdf.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FavoriteModalComponent } from './components/favorite-modal/favorite-modal.component';
import { MessageComponent } from './components/message/message.component';
import { HomeComponent } from './components/main/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    FilterComponent,
    ViewPdfComponent,
    HeaderComponent,
    FooterComponent,
    FavoriteModalComponent,
    MessageComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CrudModule,
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
