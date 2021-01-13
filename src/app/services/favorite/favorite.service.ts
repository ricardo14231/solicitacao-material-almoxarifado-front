import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Favorite } from 'src/app/models/favorite';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(
    private http: HttpClient
  ) { }

  private readonly API = environment.API_APP;

  public getFavorite(id_sector: number): Observable<Favorite>{
    return this.http.get<Favorite>(`${this.API}/getFavorite/${id_sector}`);

    
  }

}
