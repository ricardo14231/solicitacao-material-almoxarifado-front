import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';
import { Sector } from '../models/sector.model';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(
    private http: HttpClient
  ) { }

  private readonly API = environment.API_APP;

  productListEmitter = new EventEmitter<any>();
  nameSectorEmitter = new EventEmitter<string>();

  public searchProduct(nameProduct: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.API}/searchProduct`, {
      params: {
        name: nameProduct
      }
    });
  }

  public listSector(): Observable<Sector[]> {
    return this.http.get<Sector[]>(`${this.API}/listSector`);
  }

  public productList(products: Product[]): void{
    this.productListEmitter.emit(products);
  }

  public nameSector(nameSector: string): void{
    this.nameSectorEmitter.emit(nameSector);
  }
  
} 
