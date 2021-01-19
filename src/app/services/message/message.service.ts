import { EventEmitter, Injectable } from '@angular/core';
import { Message } from 'src/app/models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  messageEmitter = new EventEmitter<Message>();

  public message(msg: string, type: string, code: number){
    this.messageEmitter.emit({message: msg, messageType: type, messageCode: code});
  }

  /*
    VER SE FICA MELHOR COLOCAR EM UM MAP (CHAVE VALOR) 
    
    
    Códigos das mensagens

    1 - Setor não selecionado
    2 - produto não cadastrado
    3 - produto não selecionado
    4 - produto já selecionados 
    5 - lista de produtos vazia - impressão
    6 - novas funcionalidades
  
  */

}
