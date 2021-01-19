import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
  }

  public login(): void{
    let newFunctionality: Boolean = false;
    //REMOVER QUANDO IMPREMENTAR A FUNCIONALIDADE
    if(newFunctionality){
      let fade = document.getElementById('fade');
      fade.style.display = "flex"
    }else{
      this.messageService.message('Funcionalidade em desenvolvimento!', 'danger', 6);
    }
    
  }
}
