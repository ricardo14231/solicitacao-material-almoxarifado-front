import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { Dialog } from 'src/app/models/dialog.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(
    private dialogService: DialogService,
  ) { }

  message: string;
  messageType: string = 'hidden';

  //TO-DO
  //ALTERAR - PEGAR O ELEM NO DOM E SETAR A CLASS
  cardMessage: string = 'hidden'

  ngOnInit(): void {
    this.dialogService.dialogEmitter.subscribe((res) => {
      this.message = res.msg;
      this.messageType = res.type;
      
      //TO-DO
      //Ver pq a string fica invertida quando recebemos templete string
      console.log(`cardMessage ${res.type}`)
      
      this.messageRemove();
    });

    
  }

  private messageRemove(): void{
    setTimeout(() => {
      this.messageType = 'hidden';
    }, 3000);
  }

}
