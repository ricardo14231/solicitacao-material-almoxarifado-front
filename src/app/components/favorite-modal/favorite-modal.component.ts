import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorite-modal',
  templateUrl: './favorite-modal.component.html',
  styleUrls: ['./favorite-modal.component.css']
})
export class FavoriteModalComponent implements OnInit {

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
