import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sector } from 'src/app/models/sector.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  constructor(
    private http: HttpClient
  ) { }

  private readonly API = environment.API_APP;

  nameSectorEmitter = new EventEmitter<string>();
  
  public listSector(): Observable<Sector[]> {
    return this.http.get<Sector[]>(`${this.API}/listSector`);
  }

  public sectorPerPage(initPage: number, endPage: number): Observable<Sector[]> {
    /* console.log(initPage) */
    return this.http.get<Sector[]>(`${this.API}/sectorPerPage/${initPage}/${endPage}`);
  }

  public nameSector(nameSector: string): void{
    this.nameSectorEmitter.emit(nameSector);
  }
  

}
