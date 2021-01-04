import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service'
import { Global } from '../../services/global.service'
import { Router , ActivatedRoute , Params } from '@angular/router'

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css'],
  providers: [ProjectService]
})
export class DetailComponent implements OnInit {
  public project:any
  public url:string
  public id:string
  public deleted:string
  public confirm:boolean 
  constructor(private _projectService:ProjectService,private _route:ActivatedRoute,private _router:Router) {
    this.url= Global.url
    this.confirm = false
  }
  ngOnInit(): void {
    this._route.params.subscribe((params:Params) => {
      this.id = params.id
    })
    this.getProject(this.id)
  } 
  deleteProject(){
    this._projectService.deleteProject(this.id).subscribe(
      (result) => {
        console.log("deleted: " + result['deleted']._id)
        this.deleted = "true"
      },
      (err) => {
        console.log(<any>err)
        this.deleted = "false"
      }
    )
  }
  getProject(id:string){
        this._projectService.getProject(id).subscribe(
      (result) => {
        this.project = result['got']
      },
      (err) => {
        console.log(<any>err)
      }
    )
  }
  confirmToggle(){
    this.confirm = !this.confirm
  }
}
