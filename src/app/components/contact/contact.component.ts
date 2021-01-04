import { Component, OnInit, ɵɵresolveBody } from '@angular/core';
declare var $:any
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(".slider").bxSlider({
      mode:'fade',
      captions:false,
      slideWidth: 800,
    })
  }

}
