import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Sector } from 'src/app/models/sector.model';
import { PaginationService } from 'src/app/services/pagination/pagination.service';
import { SectorService } from 'src/app/services/serctor/sector.service';

@Component({
  selector: 'app-list-sector',
  templateUrl: './list-sector.component.html',
  styleUrls: ['./list-sector.component.css']
})
export class ListSectorComponent implements OnInit, AfterViewInit {

  constructor(
    private sectorService: SectorService,
    private paginationService: PaginationService,
  ) { }

  sectors: Sector[] = [];
  initItemPerPage: number;
  amountItemPerPage: number;


  ngOnInit(): void {
    this.paginationService.totalItemsPerPageEmitter.subscribe((perPage: number) => {
      //Consulta os itens da primeira página.
      this.sectorService.sectorPerPage(0, perPage).subscribe((res) => {
        this.sectors = res;
      });
    });

    this.initSector();
    
  }

  ngAfterViewInit(): void{

    this.sectorService.listSector().subscribe((res) => {
      //Envia a quantidade de páginas para a páginação.
      this.paginationService.totalPage(res.length);
    });   
  }

  private initSector(): void{
    this.paginationService.currentPageEmitter.subscribe((res) => {
      this.sectorService.sectorPerPage((res.page - 1) * res.perPage, res.perPage).subscribe((res) => {
        this.sectors = res;
      });
    })
  }

}
