import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public title:string
  public subtitle:string
  public email_web:string
  public isWeb:boolean
  constructor() {
    this.title = "Juan Esteban Arango"
    this.subtitle = "Futuro Programador MultiEspecializado"
    this.email_web = "juaneste687@gmail.com"
    this.isWeb = this.email_web.indexOf("@") == -1
  }

  ngOnInit(): void {
  }

}
