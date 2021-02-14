import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message/message.service';
import { Message } from 'src/app/models/message.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(
    private messageService: MessageService,
  ) { }

  dialogMessage: Message[] = [];
  private subscription = new Subscription()
  
  //TO-DO
  //ALTERAR - PEGAR O ELEM NO DOM E SETAR A CLASS - Atualizado - remover após ver a linha 29
  cardMessage: string = 'hidden'

  ngOnInit(): void {
    this.subscription = this.messageService.messageEmitter.subscribe((res: Message) => {
     
      if(this.showMessage(res)){
        this.dialogMessage.push(res);
        //TO-DO
        //Ver pq a string fica invertida quando recebemos templete string
        //console.log(`cardMessage ${res.type}`)
        this.messageRemove();
        
      }
        
    });    
  }

  private showMessage(res: Message): boolean{
    const result = this.dialogMessage.find((msg => {
      return msg.messageCode === res.messageCode;
    }));
    
    if(result != undefined)
      return false;
    
    return true;
  }

  private messageRemove(): void{
    setTimeout(() => {
      this.dialogMessage.shift();
    }, 5000);
  }

  public removeMessage(event): void{
    //Ver se precisa remover o setTimeout da mensagem removida
    this.dialogMessage.splice(event.target.id, 1);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
