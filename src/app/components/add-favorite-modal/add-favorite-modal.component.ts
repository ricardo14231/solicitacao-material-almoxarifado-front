import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-favorite-modal',
  templateUrl: './add-favorite-modal.component.html',
  styleUrls: ['./add-favorite-modal.component.css']
})
export class AddFavoriteModalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    
let close = document.getElementById('close');
let fade = document.getElementById('fade');
let cntModal = document.getElementById('ctnModal');



close.onclick = function() {fade.style.display = "none"}

fade.onclick = function() {fade.style.display = "none"}

cntModal.onclick = function(event) {event.stopPropagation()}


  }

}
