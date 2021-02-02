import { EventEmitter, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  constructor() { }

  currentPageEmitter = new EventEmitter<Object>();
  totalPageEmitter = new EventEmitter<number>();
  totalItemsPerPageEmitter = new EventEmitter<number>();

  public currentPage(page: number, perPage:number): void {
    this.currentPageEmitter.emit({page, perPage});
  }

  public totalPage(amountItems: number): void{
    this.totalPageEmitter.emit(amountItems);
  }

  public totalItemsPerPage(perPage: number): void{
    this.totalItemsPerPageEmitter.emit(perPage);
  }

}
