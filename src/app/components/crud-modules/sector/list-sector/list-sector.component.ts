import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
  private subscription: Subscription[] = []

  ngOnInit(): void {
    this.subscription.push(
      this.paginationService.totalItemsPerPageEmitter.subscribe((perPage: number) => {
        //Consulta os itens da primeira página.
        this.subscription.push(
          this.sectorService.sectorPerPage(0, perPage).subscribe((res) => {
            this.sectors = res;
          })
        )
      })
    )

    this.initSector();
    
  }

  ngAfterViewInit(): void{
    this.subscription.push(
      this.sectorService.listSector().subscribe((res) => {
        //Envia a quantidade de páginas para a páginação.
        this.paginationService.totalPage(res.length);
      })
    )   
  }

  private initSector(): void{
    this.subscription.push(
      this.paginationService.currentPageEmitter.subscribe((res) => {
        this.subscription.push(
          this.sectorService.sectorPerPage((res.page - 1) * res.perPage, res.perPage).subscribe((res) => {
            this.sectors = res;
          })
        )
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.forEach( sub => {
      sub.unsubscribe();
    })
  }
}
