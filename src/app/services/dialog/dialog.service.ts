import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor() { }

  dialogEmitter = new EventEmitter<any>();

  public dialog(msg: string, type: string){
    this.dialogEmitter.emit({msg, type});
  }

}
